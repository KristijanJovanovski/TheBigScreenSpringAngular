package mk.chris.thebigscreen.service;

import mk.chris.thebigscreen.domain.People;
import mk.chris.thebigscreen.service.responses.ScrapingResponse;
import mk.chris.thebigscreen.service.util.TmdbProxy;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

public interface TmdbPeopleService {

    ScrapingResponse downloadPeopleInfo(TreeSet<Integer> ids, int numBatches, boolean ignoreAlreadySaved);

    void updatePeoplePopularity(TreeSet<Map.Entry<Integer, Float>> idsAndPopularitySet);

    String getSaveDir();

    ConcurrentHashMap<Integer,People> getPeopleByIds(LinkedHashSet<Integer> peopleIds);
}
