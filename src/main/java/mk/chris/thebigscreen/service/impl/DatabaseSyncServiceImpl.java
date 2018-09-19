package mk.chris.thebigscreen.service.impl;

import com.google.common.collect.Lists;
import mk.chris.thebigscreen.domain.People;
import mk.chris.thebigscreen.repository.PeopleTempIds;
import mk.chris.thebigscreen.service.DatabaseSyncService;
import mk.chris.thebigscreen.service.ProxyService;
import mk.chris.thebigscreen.service.TmdbMovieService;
import mk.chris.thebigscreen.service.TmdbPeopleService;
import mk.chris.thebigscreen.service.responses.ScrapingResponse;
import mk.chris.thebigscreen.service.util.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneOffset;
import java.util.*;

import static mk.chris.thebigscreen.service.util.FileUtils.getIdsAndPopularityFromFile;


@Service
public class DatabaseSyncServiceImpl implements DatabaseSyncService {

    private final Logger log = LoggerFactory.getLogger(DatabaseSyncServiceImpl.class);

    private final String moviesFileUrl = "http://files.tmdb.org/p/exports/movie_ids_MM_DD_YYYY.json.gz";

    private final String peopleFileUrl = "http://files.tmdb.org/p/exports/person_ids_MM_DD_YYYY.json.gz";

    private final TmdbMovieService tmdbMovieService;

    private final TmdbPeopleService tmdbPeopleService;

    private final ProxyService proxyService;

    public DatabaseSyncServiceImpl(
        TmdbMovieService tmdbMovieService,
        TmdbPeopleService tmdbPeopleService,
        ProxyService proxyService

    ) {
        this.tmdbMovieService = tmdbMovieService;
        this.tmdbPeopleService = tmdbPeopleService;
        this.proxyService = proxyService;

    }

    @Override
    public void seedDatabase(){
        Instant startSeedTime = Instant.now();
        log.debug("Seeding the database. Started at: {}", startSeedTime);

        LocalDate date;
        int nowHour = LocalTime.now(ZoneOffset.UTC).getHour();
        if(nowHour < 10){
            date = LocalDate.now(ZoneOffset.UTC).minusDays(1);
        }else {
            date = LocalDate.now(ZoneOffset.UTC);
        }
        String todayPeopleFileUrl = FileUtils.getFileName(peopleFileUrl, date);
        String todayMoviesFileUrl = FileUtils.getFileName(moviesFileUrl, date);


        String peopleGzip = FileUtils.downloadFile(tmdbPeopleService.getSaveDir(), todayPeopleFileUrl);
        String moviesGzip = FileUtils.downloadFile(tmdbMovieService.getSaveDir(), todayMoviesFileUrl);


        String peopleFile = FileUtils.decompressFile(peopleGzip);
        String moviesFile =  FileUtils.decompressFile(moviesGzip);

//        TreeSet<Integer> peopleIds = FileUtils.getIdsFromFile(peopleFile);
        TreeSet<Integer> moviesIds = FileUtils.getIdsFromFile(moviesFile);

//        PeopleScrapingResponse response = tmdbPeopleService.downloadPeopleInfo(peopleIds, 50);
//        test for 10k in a batch
//        ScrapingResponse peopleScrapingResponse = tmdbPeopleService.downloadPeopleInfo(peopleIds, 1, false);

//        try {
//            log.debug("Thread sleeping for: {} seconds, (to refresh the proxies) time: {}", 10, Instant.now());
//            Thread.sleep(10 * 1000);
//        } catch (InterruptedException e) {
//            log.debug("Exception caught: {}, message: {}", e.getClass(),e.getMessage());
//            e.printStackTrace();
//        }
//        log.debug("Thread continuing, time: {}", Instant.now());
        ScrapingResponse movieScrapingResponse= tmdbMovieService.downloadMoviesInfo(moviesIds, 3, false);

        Instant endSeedDatabase = Instant.now();
        log.debug("Seeding the database. Ended at: {}", endSeedDatabase);
        log.debug("Seeding the database. Total time: {} milli", endSeedDatabase.toEpochMilli()-startSeedTime.toEpochMilli());

    }


    @Override
    @Scheduled(cron = "0 0 13 * * ?", zone="UTC")
    public void updateDatabase(){

        Instant startUpdateTime = Instant.now();
        log.debug("Updating the database. Started at: {}", startUpdateTime);

        LocalDate date;
        int nowHour = LocalTime.now(ZoneOffset.UTC).getHour();
        if(nowHour < 12){
            date = LocalDate.now(ZoneOffset.UTC).minusDays(1);
        }else {
            date = LocalDate.now(ZoneOffset.UTC);
        }

        String todayPeopleFileUrl = FileUtils.getFileName(peopleFileUrl, date);
        String todayMoviesFileUrl = FileUtils.getFileName(moviesFileUrl, date);


        String peopleGzip = FileUtils.downloadFile(tmdbPeopleService.getSaveDir(), todayPeopleFileUrl);
        String moviesGzip = FileUtils.downloadFile(tmdbMovieService.getSaveDir(), todayMoviesFileUrl);

        String peopleFile = FileUtils.decompressFile(peopleGzip);
        String moviesFile =  FileUtils.decompressFile(moviesGzip);


        TreeSet<Map.Entry<Integer,Float>> peopleIdsAndPopularitySet = getIdsAndPopularityFromFile(peopleFile);
        TreeSet<Map.Entry<Integer,Float>> moviesIdsAndPopularitySet = getIdsAndPopularityFromFile(moviesFile);

        String yesterdayPeopleFileUrl = FileUtils.getFileName(peopleFileUrl, date.minusDays(1));
        String yesterdayMoviesFileUrl = FileUtils.getFileName(moviesFileUrl, date.minusDays(1));

        String yesterdayPeopleFilePath = tmdbPeopleService.getSaveDir() + File.separator +
            yesterdayPeopleFileUrl.substring(yesterdayPeopleFileUrl.lastIndexOf("/") + 1,
                yesterdayPeopleFileUrl.length());
        File yesterdayPeopleFile = new File(yesterdayPeopleFilePath);

        String yesterdayMoviesFilePath = tmdbPeopleService.getSaveDir() + File.separator +
            yesterdayMoviesFileUrl.substring(yesterdayMoviesFileUrl.lastIndexOf("/") + 1,
                yesterdayMoviesFileUrl.length());
        File yesterdayMoviesFile = new File(yesterdayMoviesFilePath);

        if(!yesterdayPeopleFile.exists()){
            String yesterdayPeopleGzip = FileUtils.downloadFile(tmdbPeopleService.getSaveDir(), yesterdayPeopleFileUrl);
            yesterdayPeopleFilePath = FileUtils.decompressFile(yesterdayPeopleGzip);
        }

        if(!yesterdayMoviesFile.exists()){
            String yesterdayMovieGzip = FileUtils.downloadFile(tmdbPeopleService.getSaveDir(), yesterdayPeopleFileUrl);
            yesterdayPeopleFilePath = FileUtils.decompressFile(yesterdayMovieGzip);
        }

        TreeSet<Map.Entry<Integer,Float>> yesterdayPeopleIdsAndPopularitySet = getIdsAndPopularityFromFile(yesterdayPeopleFilePath);
        TreeSet<Map.Entry<Integer,Float>> yesterdayMoviesIdsAndPopularitySet = getIdsAndPopularityFromFile(yesterdayMoviesFilePath);

        peopleIdsAndPopularitySet.removeAll(yesterdayPeopleIdsAndPopularitySet);
        moviesIdsAndPopularitySet.removeAll(yesterdayMoviesIdsAndPopularitySet);


        tmdbPeopleService.updatePeoplePopularity(peopleIdsAndPopularitySet);
        tmdbMovieService.updateMoviePopularity(moviesIdsAndPopularitySet);

        Instant endUpdateTime = Instant.now();
        log.debug("Updating the database. Ended at: {}", endUpdateTime);
        log.debug("Updating the database. Total time: {} milli", endUpdateTime.toEpochMilli() - startUpdateTime.toEpochMilli());

    }
}
