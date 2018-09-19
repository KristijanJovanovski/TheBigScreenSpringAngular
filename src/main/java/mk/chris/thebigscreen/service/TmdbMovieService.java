package mk.chris.thebigscreen.service;

import mk.chris.thebigscreen.service.responses.ScrapingResponse;
import mk.chris.thebigscreen.service.util.TmdbProxy;

import java.util.Map;
import java.util.Queue;
import java.util.TreeSet;

public interface TmdbMovieService {

    ScrapingResponse downloadMoviesInfo(TreeSet<Integer> ids, int batchSize, boolean ignoreAlreadySaved);

    void updateMoviePopularity(TreeSet<Map.Entry<Integer, Float>> idsAndPopularitySet);

    String getSaveDir();
}
