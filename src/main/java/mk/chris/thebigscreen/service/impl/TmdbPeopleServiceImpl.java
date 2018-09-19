package mk.chris.thebigscreen.service.impl;


import com.google.common.collect.Iterables;
import com.uwetrottmann.tmdb2.Tmdb;
import com.uwetrottmann.tmdb2.entities.AppendToResponse;
import com.uwetrottmann.tmdb2.entities.Person;
import com.uwetrottmann.tmdb2.enumerations.AppendToResponseItem;
import com.uwetrottmann.tmdb2.services.PeopleService;
import mk.chris.thebigscreen.domain.People;
import mk.chris.thebigscreen.domain.TmdbImage;
import mk.chris.thebigscreen.domain.enumeration.Gender;
import mk.chris.thebigscreen.domain.enumeration.ImageType;
import mk.chris.thebigscreen.repository.PeopleRepository;
import mk.chris.thebigscreen.repository.PeopleTempIds;
import mk.chris.thebigscreen.repository.TmdbImageRepository;
import mk.chris.thebigscreen.service.ProxyService;
import mk.chris.thebigscreen.service.TmdbPeopleService;
import mk.chris.thebigscreen.service.enums.ScrapeType;
import mk.chris.thebigscreen.service.responses.ScrapingResponse;
import mk.chris.thebigscreen.service.util.ScrapingBatch;
import mk.chris.thebigscreen.service.util.TmdbProxy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import java.net.Proxy;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class TmdbPeopleServiceImpl implements TmdbPeopleService {

    private final Logger log = LoggerFactory.getLogger(TmdbPeopleServiceImpl.class);

    private Tmdb tmdb;

    private final PeopleRepository peopleRepository;
    private final TmdbImageRepository tmdbImageRepository;

    private final ProxyService proxyService;
    private final PeopleTempIds peopleTempIds;

    private String saveDir = "C:\\Users\\K2\\Downloads";

    private final String apiKey = "apiKey";

    public TmdbPeopleServiceImpl(
        PeopleRepository peopleRepository,
        TmdbImageRepository tmdbImageRepository,
        PeopleTempIds peopleTempIds,

        ProxyService proxyService
    ) {
        this.peopleRepository = peopleRepository;
        this.tmdbImageRepository = tmdbImageRepository;
        this.proxyService = proxyService;
        tmdb  = new Tmdb(apiKey);
        this.peopleTempIds = peopleTempIds;

    }

    @Override
    public ScrapingResponse downloadPeopleInfo(TreeSet<Integer> ids, int numBatches, boolean ignoreAlreadySaved){
        Instant startTime = Instant.now();
        log.debug("Request to download {} people info.", ids.size());
        log.debug("Started downloading people info at: {}", startTime);
        LinkedHashSet<Integer> idsNotSaved;
        if(!ignoreAlreadySaved) {
            idsNotSaved = peopleTempIds.getIdsNotSaved(new ArrayList<>(ids));
            log.debug("Ids in db: {}", ids.size() - idsNotSaved.size());
        }else{
            idsNotSaved = new LinkedHashSet<>(ids);
        }
        log.debug("Ids to be downloaded: {}", idsNotSaved.size());





        ScrapingResponse scrapingResponse = new ScrapingResponse();
        scrapingResponse.setType(ScrapeType.People);
        scrapingResponse.setStartTime(startTime);
        scrapingResponse.setTotalIds(ids.size());

        AtomicInteger counterSaved = new AtomicInteger(0);
        List<Integer> errorList = Collections.synchronizedList(new ArrayList<>());
        LinkedHashSet<TmdbProxy> proxiesUsed = new LinkedHashSet<>();
        LinkedHashSet<ScrapingBatch> batches = new LinkedHashSet<>();
        int batchCounter = 0;

        for(List<Integer> partition : Iterables.partition(idsNotSaved, Math.floorDiv(idsNotSaved.size(), numBatches))) {
            Instant batchStartTime = Instant.now();

            log.debug("Started downloading batch {} at: {}", ++batchCounter, batchStartTime);
            log.debug("Batch size: {}", partition.size());


            ArrayList<Tmdb> clients = getClients();
            ConcurrentLinkedQueue<Integer> concurrentLinkedQueue = new ConcurrentLinkedQueue<>(partition);
            LinkedHashSet<TmdbProxy> proxiesPerBatchUsed = new LinkedHashSet<>();
            List<Person> peopleToSave = Collections.synchronizedList(new ArrayList<>());
            AtomicInteger counterSavedPerBatch = new AtomicInteger(0);

            ForkJoinPool customThreadPool = new ForkJoinPool(clients.size());

            try {
                CompletableFuture.allOf(
                    customThreadPool.submit( () ->
                    clients.parallelStream()
                    .map(client -> {
                        AtomicInteger counterPerProxy = new AtomicInteger(0);
                        AtomicInteger counterRequestsPerProxy = new AtomicInteger(0);
                        AtomicInteger counterPerProxyBatch = new AtomicInteger(0);
                        AtomicLong sleepTime = new AtomicLong(0);
                        AtomicBoolean kill = new AtomicBoolean(false);
                        Integer id;
                        PeopleService service = client.personService();
                        Map<Integer, CompletableFuture<Integer>> futures = new HashMap<>();
                        makeCalls(counterSaved, errorList, concurrentLinkedQueue, peopleToSave, counterSavedPerBatch, client, counterPerProxy, counterRequestsPerProxy, counterPerProxyBatch, sleepTime, kill, service, futures);
                        CompletableFuture.allOf(futures.values().toArray(new CompletableFuture[futures.size()])).join();

                        TmdbProxy p = new TmdbProxy();
                        p.setProxy(client.getProxy());
                        p.setTotalRequestsMade(counterRequestsPerProxy.get());
                        p.setIdsSavedCount(counterPerProxy.get());
                        proxiesPerBatchUsed.add(p);

                        return CompletableFuture.completedFuture(client);
                    }).toArray(CompletableFuture[]::new)).get()).join();
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
            try {
                log.debug("Sleeping between batches for 10 s");
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            List<People> people = peopleToSave
                .stream()
                .map(person -> this.tmdbPeopleToPeopleMapper(person, new People()))
                .collect(Collectors.toList());

            peopleRepository.save(people);

            LinkedHashSet<TmdbImage> images = people.stream()
                .flatMap(person -> person.getTmdbImages().stream())
                .collect(Collectors.toCollection(LinkedHashSet::new));
            tmdbImageRepository.save(images);

            Instant batchEndTime = Instant.now();

            errorList.addAll(concurrentLinkedQueue);

            ScrapingBatch batch = new ScrapingBatch();
            batch.setStartTime(batchStartTime);
            batch.setEndTime(batchEndTime);
            batch.setTotalIds(partition.size());
            batch.setIdsSavedCount(counterSavedPerBatch.get());
            batch.setProxiesUsed(proxiesPerBatchUsed);
            batch.setTotalTime( batchEndTime.toEpochMilli() - batchStartTime.toEpochMilli());

            proxiesUsed.addAll(proxiesPerBatchUsed);

            batches.add(batch);
            log.debug("Downloaded {} people", counterSavedPerBatch.get());
            log.debug("Finished downloading batch {} at: {}", batchCounter, batchEndTime);
            log.debug("Total time downloading batch: {} milli.", batchEndTime.toEpochMilli() - batchStartTime.toEpochMilli());

        }

        LinkedHashSet<Integer> errorSet = new LinkedHashSet<>(errorList);
        Instant endTime = Instant.now();

        scrapingResponse.setIdsSavedCount(counterSaved.get());
        scrapingResponse.setIdsNotSaved(errorSet);
        scrapingResponse.setProxiesUsed(proxiesUsed);
        scrapingResponse.setBatches(batches);
        scrapingResponse.setIdsNotSavedCount(errorSet.size());
        scrapingResponse.setEndTime(endTime);
        scrapingResponse.setTotalTime(endTime.toEpochMilli() - startTime.toEpochMilli());

        log.debug("Downloaded {} people", counterSaved.get());
        log.debug("Finished downloading people info at: {}", endTime);
        log.debug("Total time downloading people info: {} milli.", endTime.toEpochMilli() - startTime.toEpochMilli());
        return scrapingResponse;
    }

    private LinkedHashSet<People> downloadAndSave(LinkedHashSet<Integer> ids){
        Instant startTime = Instant.now();

        LinkedHashSet<People> downloadedPeople = new LinkedHashSet<>();

        log.debug("Request to download {} people info.", ids.size());
        log.debug("Started downloading people info at: {}", startTime);


        AtomicInteger counterSaved = new AtomicInteger(0);
        List<Integer> errorList = Collections.synchronizedList(new ArrayList<>());
        LinkedHashSet<TmdbProxy> proxiesUsed = new LinkedHashSet<>();
        LinkedHashSet<ScrapingBatch> batches = new LinkedHashSet<>();
        int batchCounter = 0;

        for(List<Integer> partition : Iterables.partition(ids, 30000)) {
            Instant batchStartTime = Instant.now();

            log.debug("Started downloading batch {} at: {}", ++batchCounter, batchStartTime);
            log.debug("Batch size: {}", partition.size());


            ArrayList<Tmdb> clients = getClients();
            ConcurrentLinkedQueue<Integer> concurrentLinkedQueue = new ConcurrentLinkedQueue<>(partition);
            List<Person> peopleToSave = Collections.synchronizedList(new ArrayList<>());
            AtomicInteger counterSavedPerBatch = new AtomicInteger(0);

            ForkJoinPool customThreadPool = new ForkJoinPool(clients.size());

            try {
                CompletableFuture.allOf(
                    customThreadPool.submit( () ->
                        clients.parallelStream()
                            .map(client -> {
                                AtomicInteger counterPerProxy = new AtomicInteger(0);
                                AtomicInteger counterRequestsPerProxy = new AtomicInteger(0);
                                AtomicInteger counterPerProxyBatch = new AtomicInteger(0);
                                AtomicLong sleepTime = new AtomicLong(0);
                                AtomicBoolean kill = new AtomicBoolean(false);
                                Integer id;
                                PeopleService service = client.personService();
                                Map<Integer, CompletableFuture<Integer>> futures = new HashMap<>();
                                makeCalls(counterSaved, errorList, concurrentLinkedQueue, peopleToSave, counterSavedPerBatch,
                                    client, counterPerProxy, counterRequestsPerProxy, counterPerProxyBatch, sleepTime, kill, service, futures);
                                CompletableFuture.allOf(futures.values().toArray(new CompletableFuture[futures.size()])).join();
                                return CompletableFuture.completedFuture(client);
                            }).toArray(CompletableFuture[]::new)).get()).join();
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
            try {
                log.debug("Sleeping between batches for 10 s");
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            List<People> people = peopleToSave
                .stream()
                .map(person -> this.tmdbPeopleToPeopleMapper(person, new People()))
                .collect(Collectors.toList());

            peopleRepository.save(people);

//            LinkedHashSet<MovieCast> movieCast = people.stream()
//                .flatMap(person -> person.getCast().stream())
//                .collect(Collectors.toCollection(LinkedHashSet::new));
//            movieCastRepository.save(movieCast);
//            LinkedHashSet<MovieCrew> movieCrew = people.stream()
//                .flatMap(person -> person.getCrew().stream())
//                .collect(Collectors.toCollection(LinkedHashSet::new));
//            movieCrewRepository.save(movieCrew);

            LinkedHashSet<TmdbImage> images = people.stream()
                .flatMap(person -> person.getTmdbImages().stream())
                .collect(Collectors.toCollection(LinkedHashSet::new));
            tmdbImageRepository.save(images);

            Instant batchEndTime = Instant.now();

            errorList.addAll(concurrentLinkedQueue);
            downloadedPeople.addAll(people);


            log.debug("Downloaded {} people", counterSavedPerBatch.get());
            log.debug("Finished downloading batch {} at: {}", batchCounter, batchEndTime);
            log.debug("Total time downloading batch: {} milli.", batchEndTime.toEpochMilli() - batchStartTime.toEpochMilli());

        }

        LinkedHashSet<Integer> errorSet = new LinkedHashSet<>(errorList);
        Instant endTime = Instant.now();


        log.debug("Downloaded {} people", counterSaved.get());
        log.debug("Finished downloading people info at: {}", endTime);
        log.debug("Total time downloading people info: {} milli.", endTime.toEpochMilli() - startTime.toEpochMilli());
        return downloadedPeople;
    }

    private void makeCalls(AtomicInteger counterSaved, List<Integer> errorList, ConcurrentLinkedQueue<Integer> concurrentLinkedQueue, List<Person> peopleToSave, AtomicInteger counterSavedPerBatch, Tmdb client, AtomicInteger counterPerProxy, AtomicInteger counterRequestsPerProxy, AtomicInteger counterPerProxyBatch, AtomicLong sleepTime, AtomicBoolean kill, PeopleService service, Map<Integer, CompletableFuture<Integer>> futures) {
        Integer id;
        while ((id = concurrentLinkedQueue.poll()) != null) {
            Integer finalId = id;
            futures.put(finalId, new CompletableFuture<>());
            if (counterPerProxyBatch.get() > 35) {
                try {
                    //                                long duration = sleepTime.get() - Instant.now().getEpochSecond();
                    //                                Thread.sleep((long)(duration < 0 ? 0.5 : duration) * 1000);
                    Thread.sleep(12000);
                } catch (InterruptedException | IllegalArgumentException e) {
                    e.printStackTrace();
                }
                counterPerProxyBatch.set(0);
            }
            counterPerProxyBatch.incrementAndGet();
            counterRequestsPerProxy.incrementAndGet();
            sleepTime.set(Instant.now().getEpochSecond()+10);
            service.summary(id, new AppendToResponse(
                AppendToResponseItem.IMAGES
            ))
                .enqueue(new Callback<Person>() {
                    @Override
                    public void onResponse(Call<Person> call, Response<Person> response) {
                        if (response.isSuccessful()) {
                            Person tmdbPerson = response.body();
                            log.debug("X-RateLimit-Remaining: {} for {}", response.headers().get("X-RateLimit-Remaining"), client.getProxy());
                            Long reset = Long.valueOf(response.headers().get("X-RateLimit-Reset"));
                            sleepTime.set(reset);
                            if (tmdbPerson != null) {
                                peopleToSave.add(tmdbPerson);
                                //                                        log.debug("Saved in database people info with id: {}", people.getId());
                                log.debug("Downloaded by proxy {}, {}", client.getProxy().address().toString(), counterPerProxy.incrementAndGet());
                                log.debug("Total saved: {}", counterSaved.incrementAndGet());
                                log.debug("Total saved per batch: {}", counterSavedPerBatch.incrementAndGet());
                                futures.get(finalId).complete(finalId);
                            } else {
                                futures.get(finalId).complete(null);
                            }
                        } else {
                            log.debug("{}", response.errorBody());
                            errorList.add(finalId);
                            futures.get(finalId).complete(null);
                        }
                    }
                    @Override
                    public void onFailure(Call<Person> call, Throwable t) {
                        //                                t.printStackTrace();
                        log.debug("From {}, thrown EXCEPTION with message: {}", client.getProxy().address(), t.getMessage());
                        errorList.add(finalId);
                        futures.get(finalId).complete(null);
                        kill.set(true);
                    }
                });
            if (kill.get()) {
                break;
            }
        }
    }

    private ArrayList<Tmdb> getClients() {
        LinkedHashSet<Proxy > proxies = proxyService.getTestedValidProxies();

        return proxies
                .stream()
                .map(proxy->{
                    Tmdb tmp = new Tmdb(apiKey);
                    tmp.setProxy(proxy);
                    return tmp;
                })
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @Override
    public ConcurrentHashMap<Integer, People> getPeopleByIds(LinkedHashSet<Integer> peopleIds) {

        LinkedHashSet<People> people = peopleTempIds.getPeopleByIds(new ArrayList<>(peopleIds));
        log.debug("People from db size: {}",people.size());

         LinkedHashSet<Integer> getIds = (LinkedHashSet<Integer>) peopleIds.clone();

         getIds.removeAll(
              people.parallelStream()
                  .map(person -> Math.toIntExact(person.getId()))
                  .collect(Collectors.toCollection(LinkedHashSet::new))
              );

        log.debug("People to download size: {}", getIds.size());
          LinkedHashSet<People> downloaded = downloadAndSave(getIds);
          downloaded.addAll(people);
        log.debug("People requested size: {}, People returned size: {}",peopleIds.size(), downloaded.size());
        ConcurrentHashMap<Integer,People> hashMap = new ConcurrentHashMap<>(downloaded.size());
        ForkJoinPool customThreadPool = new ForkJoinPool(10);
        try {
            customThreadPool.submit(
                () -> downloaded.parallelStream()
                          .map(person -> hashMap.put(person.getId().intValue(), person))
                          .count()
            ).get();
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        return hashMap;
    }

    @Override
    public void updatePeoplePopularity(TreeSet<Map.Entry<Integer, Float>> idsAndPopularitySet){
        Instant startUpdatePeopleInfoTime = Instant.now();
        log.debug("Request to update {} people popularity.", idsAndPopularitySet.size());
        log.debug("Started updating people popularity at: {}", startUpdatePeopleInfoTime);
        AtomicInteger totalUpdated = new AtomicInteger(0);
        for(List<Map.Entry<Integer, Float>> partition : Iterables.partition(idsAndPopularitySet, Math.floorDiv(idsAndPopularitySet.size(), 30000))) {

            ConcurrentHashMap<Integer,Float> concurrentHashMap = new ConcurrentHashMap<>(partition.size());
            LinkedHashSet<People> peopleInDb = peopleTempIds.getPeopleByIds(partition.parallelStream().map(Map.Entry::getKey).collect(Collectors.toList()));
            List<People> peopleToSave = new ArrayList<>();
            ForkJoinPool customThreadPool = new ForkJoinPool(10);
            try {
                customThreadPool.submit(
                    () -> partition.parallelStream()
                        .map(person -> concurrentHashMap.put(person.getKey(), person.getValue()))
                        .count()
                ).get();
                peopleToSave = customThreadPool.submit(
                    () -> peopleInDb.parallelStream()
                        .map(people -> {
                            people.setPopularity(concurrentHashMap.get(people.getId().intValue()));
                            totalUpdated.incrementAndGet();
                            return people;
                        })
                        .collect(Collectors.toList())
                ).get();
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
            peopleRepository.save(peopleToSave);

        }
        TreeSet<Integer> downloadPeopleInfoSet = new TreeSet<>(Integer::compare);
//
//        for(Map.Entry<Integer, Float> popularityEntry : idsAndPopularitySet){
//            People people = peopleRepository.findOne(popularityEntry.getKey().longValue());
//            if(people!=null){
//                people.setPopularity(popularityEntry.getValue());
//                peopleRepository.save(people);
//                log.debug("Updated in database people popularity with id: {}", people.getId());
//                totalUpdated++;
//            }else {
//                downloadPeopleInfoSet.add(popularityEntry.getKey());
//            }
//        }
        Instant endUpdatePeopleInfoTime = Instant.now();
        log.debug("Updated {} people", totalUpdated.get());
        log.debug("Finished updating people popularity at: {}", endUpdatePeopleInfoTime);
        log.debug("Total time updating people popularity: {} milli.", endUpdatePeopleInfoTime.toEpochMilli() - startUpdatePeopleInfoTime.toEpochMilli());




        LinkedHashSet<Integer> toDownload = peopleTempIds.getIdsNotSaved(idsAndPopularitySet.parallelStream().map(Map.Entry::getKey).collect(Collectors.toList()));
        downloadPeopleInfoSet.addAll(toDownload);
        log.debug("People not found in database: {}", downloadPeopleInfoSet.size());

        ScrapingResponse scrapingResponse = downloadPeopleInfo(downloadPeopleInfoSet, downloadPeopleInfoSet.size() > 500000 ? 50 : 20,true);
        log.debug("Scraping Response {}", scrapingResponse);
        // TODO: if all works fine create UpdateResponse and attach scrapingResponse
    }

    @Override
    public String getSaveDir() {
        return saveDir;
    }


    private People tmdbPeopleToPeopleMapper(Person person, People people) {
        people.setId(person.id.longValue());
        people.setAdult(person.adult);
        people.setBiography(person.biography);
        people.setBirthday(person.birthday != null ? new java.sql.Date(person.birthday.getTime()).toLocalDate() : null);
        people.setDeathday(person.deathday != null ? new java.sql.Date(person.deathday.getTime()).toLocalDate() : null);
        people.setGender(person.gender==0 ?
            Gender.None : person.gender==1 ?
            Gender.Female : Gender.Male);
        people.setPlaceOfBirth(person.place_of_birth);
        people.setName(person.name);
        people.setImdbId(person.imdb_id);
        people.setPopularity(person.popularity.floatValue());
        people.setProfilePath(person.profile_path);
        Set<TmdbImage> tmdbImages = tmdbImagesToImageMapper(person, people);
        people.setTmdbImages(tmdbImages);
        return people;
    }


    private Set<TmdbImage> tmdbImagesToImageMapper(com.uwetrottmann.tmdb2.entities.Person tmdbPerson, People person) {
        return tmdbPerson.images.profiles.stream()
            .map(img -> {
                    TmdbImage image = new TmdbImage();
                    image.setAspectRatio(img.aspect_ratio.floatValue());
                    image.setFilepath(img.file_path);
                    image.setHeight(img.height);
                    image.setWidth(img.width);
                    image.setIso6391(img.iso_639_1);
                    image.setImageType(ImageType.Profile);
                    image.setPeople(person);
                    return image;
                }
            )
            .collect(Collectors.toSet());
    }
}
