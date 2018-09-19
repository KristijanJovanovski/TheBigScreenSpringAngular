package mk.chris.thebigscreen.service.impl;

import com.google.common.collect.Iterables;
import com.uwetrottmann.tmdb2.Tmdb;
import com.uwetrottmann.tmdb2.entities.AppendToResponse;
import com.uwetrottmann.tmdb2.entities.Videos;
import com.uwetrottmann.tmdb2.enumerations.AppendToResponseItem;
import com.uwetrottmann.tmdb2.services.MoviesService;
import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.domain.enumeration.ImageType;
import mk.chris.thebigscreen.domain.enumeration.Status;
import mk.chris.thebigscreen.domain.enumeration.VideoType;
import mk.chris.thebigscreen.repository.*;
import mk.chris.thebigscreen.service.ProxyService;
import mk.chris.thebigscreen.service.TmdbMovieService;
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
public class TmdbMovieServiceImpl implements TmdbMovieService {

    private final Logger log = LoggerFactory.getLogger(TmdbMovieServiceImpl.class);
    private final MovieCrewRepository movieCrewRepository;
    private final MovieCastRepository movieCastRepository;
    private final VideoRepository videoRepository;
    private final TmdbImageRepository tmdbImageRepository;
    private final GenreRepository genreRepository;
    private final MovieTempIds moviesTempIds;


    private Tmdb tmdb;

    private final MovieRepository movieRepository;

    private final PeopleRepository peopleRepository;

    private final ProxyService proxyService;

    private final TmdbPeopleService tmdbPeopleService;

    private String saveDir = "C:\\Users\\K2\\Downloads";

    private final String apiKey = "apiKey";

    public TmdbMovieServiceImpl(
        MovieRepository movieRepository,
        PeopleRepository peopleRepository,
        MovieCrewRepository movieCrewRepository,
        MovieCastRepository movieCastRepository,
        VideoRepository videoRepository,
        TmdbImageRepository tmdbImageRepository,
        GenreRepository genreRepository,
        TmdbPeopleService tmdbPeopleService,
        ProxyService proxyService,
        MovieTempIds moviesTempIds

    ) {
        this.movieRepository = movieRepository;
        this.peopleRepository = peopleRepository;
        this.movieCrewRepository = movieCrewRepository;
        this.movieCastRepository = movieCastRepository;
        this.videoRepository = videoRepository;
        this.tmdbImageRepository = tmdbImageRepository;
        this.genreRepository = genreRepository;
        this.moviesTempIds = moviesTempIds;

        this.tmdbPeopleService = tmdbPeopleService;
        this.tmdb = new Tmdb(apiKey);
        this.proxyService = proxyService;
    }

    @Override
    public ScrapingResponse downloadMoviesInfo(TreeSet<Integer> ids, int numBatches, boolean ignoreAlreadySaved){
        Instant startTime = Instant.now();

        log.debug("Request to download {} movies info.", ids.size());
        log.debug("Started downloading movies info at: {}", startTime);
        LinkedHashSet<Integer> idsNotSaved;
        if(!ignoreAlreadySaved) {
            idsNotSaved = moviesTempIds.getIdsNotSaved(new ArrayList<>(ids));
            log.debug("Ids in db: {}", ids.size() - idsNotSaved.size());
        }else{
            idsNotSaved = new LinkedHashSet<>(ids);
        }
        log.debug("Ids to be downloaded: {}", idsNotSaved.size());

        ScrapingResponse scrapingResponse = new ScrapingResponse();
        scrapingResponse.setType(ScrapeType.Movies);
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


            ArrayList<Tmdb> clients = new ArrayList<>(getClients());
            ConcurrentLinkedQueue<Integer> concurrentLinkedQueue = new ConcurrentLinkedQueue<>(partition);
            LinkedHashSet<TmdbProxy> proxiesPerBatchUsed = new LinkedHashSet<>();
            List<com.uwetrottmann.tmdb2.entities.Movie> moviesToSave = Collections.synchronizedList(new ArrayList<>());
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
                                MoviesService service = client.moviesService();
                                Map<Integer, CompletableFuture<Integer>> futures = new HashMap<>();
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
                                    service
                                        .summary(id, new AppendToResponse(
                                            AppendToResponseItem.RELEASE_DATES,
                                            AppendToResponseItem.CREDITS,
                                            AppendToResponseItem.VIDEOS,
                                            AppendToResponseItem.ALTERNATIVE_TITLES,
                                            AppendToResponseItem.SIMILAR,
                                            AppendToResponseItem.CHANGES,
                                            AppendToResponseItem.TRANSLATIONS,
                                            AppendToResponseItem.IMAGES,
                                            AppendToResponseItem.RECOMMENDATIONS,
                                            AppendToResponseItem.REVIEWS,
                                            AppendToResponseItem.KEYWORDS
                                        ))
                                        .enqueue(new Callback<com.uwetrottmann.tmdb2.entities.Movie>() {
                                            @Override
                                            public void onResponse(Call<com.uwetrottmann.tmdb2.entities.Movie> call, Response<com.uwetrottmann.tmdb2.entities.Movie> response) {
                                                if (response.isSuccessful()) {
                                                    com.uwetrottmann.tmdb2.entities.Movie tmdbMovie = response.body();
                                                    log.debug("X-RateLimit-Remaining: {} for {}", response.headers().get("X-RateLimit-Remaining"), client.getProxy());
                                                    Long reset = Long.valueOf(response.headers().get("X-RateLimit-Reset"));
                                                    sleepTime.set(reset);
                                                    if (tmdbMovie != null) {
                                                        //                                        Movies movies = tmdbMoviesToMoviesMapper(tmdbPerson, new Movies());
                                                        //                                        moviesRepository.save(movies);
                                                        moviesToSave.add(tmdbMovie);
                                                        //                                        log.debug("Saved in database movies info with id: {}", movies.getId());
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
                                            public void onFailure(Call<com.uwetrottmann.tmdb2.entities.Movie> call, Throwable t) {
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
                                CompletableFuture.allOf(futures.values().toArray(new CompletableFuture[futures.size()])).join();

                                TmdbProxy p = new TmdbProxy();
                                p.setProxy(client.getProxy());
                                p.setTotalRequestsMade(counterRequestsPerProxy.get());
                                p.setIdsSavedCount(counterPerProxy.get());
                                proxiesPerBatchUsed.add(p);

                                //                    CompletableFuture<Tmdb> future = new CompletableFuture<>();
                                return CompletableFuture.completedFuture(client);
                                //                    return future;
                            }).toArray(CompletableFuture[]::new)).get()).join();
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }

            LinkedHashSet<Integer> peopleIds = moviesToSave
                .stream()
                .map(movie -> {
                    LinkedHashSet<Integer> credits =
                    movie.credits.cast
                        .stream()
                        .map(castMember -> castMember.id)
                        .collect(Collectors.toCollection(LinkedHashSet::new));
                    credits.addAll(
                        movie.credits.crew
                            .stream()
                            .map(crewMember -> crewMember.id)
                            .collect(Collectors.toCollection(LinkedHashSet::new))
                    );
                    return credits;
                })
                .flatMap(Collection::stream)
                .collect(Collectors.toCollection(LinkedHashSet::new));

            try {
                log.debug("Sleeping between batches for 10 s");
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }


            ConcurrentHashMap<Integer, People> people = tmdbPeopleService.getPeopleByIds(peopleIds);



            List<Movie> movies = moviesToSave
                .stream()
                .map(tmdbMovie -> {
                    Movie movie = this.tmdbMovieToMovieMapper(tmdbMovie);

                    LinkedHashSet<MovieCast> movieCastSet = tmdbMovie.credits.cast.stream()
                        .map(castMember -> {
                            MovieCast cast = new MovieCast();
                            cast.setMovieRole(castMember.character);
                            cast.setCastOrder(castMember.order);
                            cast.setMovie(movie);

                            People p = people.get(castMember.id);
                            if (p != null) {
                                cast.setPeople(p);
                                p.addCast(cast);
                                return cast;
                            }
                            return null;
                        })
                        .filter(Objects::nonNull)
                        .collect(Collectors.toCollection(LinkedHashSet::new));

                    movie.setCast(movieCastSet);
//                    movieCastRepository.save(movieCastSet);

                    LinkedHashSet<MovieCrew> movieCrewSet = tmdbMovie.credits.crew.stream()
                        .map(crewMember -> {
                            MovieCrew crew = new MovieCrew();
                            crew.setDepartment(crewMember.department);
                            crew.setJob(crewMember.job);
                            crew.setMovie(movie);

                            People p = people.get(crewMember.id);
                            if (p != null) {
                                crew.setPeople(p);
                                p.addCrew(crew);
                                return crew;
                            }
                            return null;
                        })
                        .filter(Objects::nonNull)
                        .collect(Collectors.toCollection(LinkedHashSet::new));
                    movie.setCrew(movieCrewSet);

//                    movieCrewRepository.save(movieCrewSet);

                    return movie;
                })
                .collect(Collectors.toList());

//            for (List<Movie> moviesPartition :Iterables.partition(movies,100)) {
               movieRepository.save(movies);
//            }
//            for (List<People> peoplePartition :Iterables.partition(people.values(),100)) {
//                peopleRepository.save(peoplePartition);
//            }
            LinkedHashSet<MovieCast> movieCast = movies.stream()
                .flatMap(m -> m.getCast().stream())
                .collect(Collectors.toCollection(LinkedHashSet::new));
            movieCastRepository.save(movieCast);

            LinkedHashSet<MovieCrew> movieCrew = movies.stream()
                .flatMap(m -> m.getCrew().stream())
                .collect(Collectors.toCollection(LinkedHashSet::new));
            movieCrewRepository.save(movieCrew);

            LinkedHashSet<TmdbImage> images = movies.stream()
                .flatMap(m -> m.getTmdbImages().stream())
                .collect(Collectors.toCollection(LinkedHashSet::new));
            tmdbImageRepository.save(images);

            LinkedHashSet<Video> videos = movies.stream()
                .flatMap(m -> m.getVideos().stream())
                .collect(Collectors.toCollection(LinkedHashSet::new));
            videoRepository.save(videos);

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
            log.debug("Downloaded {} movies", counterSavedPerBatch.get());
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

        log.debug("Downloaded {} movies", counterSaved.get());
        log.debug("Finished downloading movies info at: {}", endTime);
        log.debug("Total time downloading movies info: {} milli.", endTime.toEpochMilli() - startTime.toEpochMilli());

        return scrapingResponse;

    }

    private ArrayList<Tmdb> getClients() {
        LinkedHashSet<Proxy> proxies = proxyService.getTestedValidProxies();

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
    public void updateMoviePopularity(TreeSet<Map.Entry<Integer, Float>> idsAndPopularitySet) {
        Instant startUpdateMoviesInfoTime = Instant.now();
        log.debug("Request to update {} movies popularity.", idsAndPopularitySet.size());
        log.debug("Started updating movies popularity at: {}", startUpdateMoviesInfoTime);
        AtomicInteger totalUpdated = new AtomicInteger(0);
        for (List<Map.Entry<Integer, Float>> partition : Iterables.partition(idsAndPopularitySet, Math.floorDiv(idsAndPopularitySet.size(), 30000))) {

            ConcurrentHashMap<Integer, Float> concurrentHashMap = new ConcurrentHashMap<>(partition.size());
            LinkedHashSet<Movie> moviesInDb = moviesTempIds.getMoviesByIds(partition.parallelStream().map(Map.Entry::getKey).collect(Collectors.toList()));
            List<Movie> moviesToSave = new ArrayList<>();
            ForkJoinPool customThreadPool = new ForkJoinPool(10);
            try {
                customThreadPool.submit(
                    () -> partition.parallelStream()
                        .map(movie -> concurrentHashMap.put(movie.getKey(), movie.getValue()))
                        .count()
                ).get();
                moviesToSave = customThreadPool.submit(
                    () -> moviesInDb.parallelStream()
                        .map(movies -> {
                            movies.setPopularity(concurrentHashMap.get(movies.getId().intValue()));
                            totalUpdated.incrementAndGet();
                            return movies;
                        })
                        .collect(Collectors.toList())
                ).get();
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
            movieRepository.save(moviesToSave);

        }
        TreeSet<Integer> downloadMoviesInfoSet = new TreeSet<>(Integer::compare);

        Instant endUpdateMoviesInfoTime = Instant.now();
        log.debug("Updated {} movies", totalUpdated.get());
        log.debug("Finished updating movies popularity at: {}", endUpdateMoviesInfoTime);
        log.debug("Total time updating movies popularity: {} milli.", endUpdateMoviesInfoTime.toEpochMilli() - startUpdateMoviesInfoTime.toEpochMilli());


        LinkedHashSet<Integer> toDownload = moviesTempIds.getIdsNotSaved(idsAndPopularitySet.parallelStream().map(Map.Entry::getKey).collect(Collectors.toList()));
        downloadMoviesInfoSet.addAll(toDownload);
        log.debug("Movie not found in database: {}", downloadMoviesInfoSet.size());

        ScrapingResponse scrapingResponse = downloadMoviesInfo(downloadMoviesInfoSet, downloadMoviesInfoSet.size() > 500000 ? 50 : 20, true);
        // TODO: if all works fine create UpdateResponse and attach scrapingResponse
        log.debug("Scraping Response {}", scrapingResponse);

    }

    @Override
    public String getSaveDir() {
        return saveDir;
    }


    private Movie tmdbMovieToMovieMapper(com.uwetrottmann.tmdb2.entities.Movie tmdbMovie) {
        Movie movie = new Movie();
        movie.setId(tmdbMovie.id.longValue());
        movie.setPopularity(tmdbMovie.popularity.floatValue());
        movie.setBackdropPath(tmdbMovie.backdrop_path);
        movie.setBudget(tmdbMovie.budget.longValue());
        movie.setImdbId(tmdbMovie.imdb_id);
        movie.setOriginalLanguage(tmdbMovie.original_language);
        movie.setOriginalTitle(tmdbMovie.original_title);
        movie.setOverview(tmdbMovie.overview);
        movie.setPosterPath(tmdbMovie.poster_path);

        Date releaseDate = tmdbMovie.release_date;
        movie.setReleaseDate(releaseDate != null? new java.sql.Date(tmdbMovie.release_date.getTime()).toLocalDate() : null);
        movie.setRevenue(tmdbMovie.revenue.longValue());
        movie.setRuntime(tmdbMovie.runtime);

        Status status = getStatus(tmdbMovie);
        movie.setStatus(status);

        movie.setTitle(tmdbMovie.title);
        movie.setVoteAverage(tmdbMovie.vote_average.floatValue());
        movie.setVoteCount(tmdbMovie.vote_count.longValue());


        Set<Genre> genres = tmdbGenreToGenreMapper(tmdbMovie, movie);
        movie.setGenres(genres);
        // ?
//        genreRepository.save(genres);

        Set<TmdbImage> images = tmdbImageToImageMapper(tmdbMovie, movie);
        movie.setTmdbImages(images);

        Set<Video> videos = tmdbVideoToVideoMapper(tmdbMovie, movie);
        movie.setVideos(videos);

//        Set<MovieCast> cast = tmdbCastToCastMapper(tmdbMovie, movie);
//        movie.setCast(cast);
//
//        Set<MovieCrew> crew = tmdbCrewToCrewMapper(tmdbMovie, movie);
//        movie.setCrew(crew);

        return movie;
    }

    private Status getStatus(com.uwetrottmann.tmdb2.entities.Movie tmdbMovie) {
        Status status = null;
        if (tmdbMovie.status != null) {
            switch (tmdbMovie.status.toString()) {
                case "Released":
                    status = Status.Released;
                    break;
                case "Rumored":
                    status = Status.Rumored;
                    break;
                case "Planned":
                    status = Status.Planned;
                    break;
                case "In Production":
                    status = Status.In_Production;
                    break;
                case "Post Production":
                    status = Status.Post_Production;
                    break;
                case "Canceled":
                    status = Status.Canceled;
                    break;
            }
        }
        return status;
    }


    private Set<Video> tmdbVideoToVideoMapper(com.uwetrottmann.tmdb2.entities.Movie tmdbMovie, Movie movie) {
        Set<Video> videos = tmdbMovie.videos.results.stream()
            .map(tmdbVideo -> {
                    Video video = new Video();
                    video.setVideoKey(tmdbVideo.key);
                    video.setName(tmdbVideo.name);
                    video.setVideoSite(tmdbVideo.site);
                    video.setVideoSize(tmdbVideo.size);

                    VideoType videoType = getVideoType(tmdbVideo);

                    video.setVideoType(videoType);

                    video.setMovie(movie);
                    return video;
                }
            )
            .collect(Collectors.toSet());

        return videos;
    }


    private VideoType getVideoType(Videos.Video tmdbVideo) {
        VideoType videoType = null;
        if (tmdbVideo.type != null) {
            switch (tmdbVideo.type.toString()) {
                case "Trailer":
                    videoType = VideoType.Trailer;
                    break;
                case "Teaser":
                    videoType = VideoType.Teaser;
                    break;
                case "Featurette":
                    videoType = VideoType.Featurette;
                    break;
                case "Clip":
                    videoType = VideoType.Clip;
                    break;
                case "Opening Credits":
                    videoType = VideoType.Opening_Credits;
                    break;
            }
        }
        return videoType;
    }


    private Set<TmdbImage> tmdbImageToImageMapper(com.uwetrottmann.tmdb2.entities.Movie tmdbMovie, Movie movie) {
        Set<TmdbImage> images = tmdbMovie.images.backdrops.stream()
            .map(img -> {
                    TmdbImage image = new TmdbImage();
                    image.setAspectRatio(img.aspect_ratio.floatValue());
                    image.setFilepath(img.file_path);
                    image.setHeight(img.height);
                    image.setWidth(img.width);
                    image.setIso6391(img.iso_639_1);
                    image.setImageType(ImageType.Backdrop);
                    image.setMovie(movie);
                    return image;
                }
            )
            .collect(Collectors.toSet());

        images.addAll(tmdbMovie.images.posters.stream()
            .map(img -> {
                    TmdbImage image = new TmdbImage();
                    image.setAspectRatio(img.aspect_ratio.floatValue());
                    image.setFilepath(img.file_path);
                    image.setHeight(img.height);
                    image.setWidth(img.width);
                    image.setIso6391(img.iso_639_1);
                    image.setImageType(ImageType.Poster);
                    image.setMovie(movie);
                    return image;
                }
            )
            .collect(Collectors.toSet())
        );
        return images;
    }


    private Set<Genre> tmdbGenreToGenreMapper(com.uwetrottmann.tmdb2.entities.Movie tmdbMovie, Movie movie) {
        return tmdbMovie.genres.stream()
            .map(tmdbGenre -> {
                    Genre genre = new Genre();
                    genre.setId(tmdbGenre.id.longValue());
                    genre.setName(tmdbGenre.name);
                    genre.addMovies(movie);
                    return genre;
                }
            )
            .collect(Collectors.toSet());
    }

}
