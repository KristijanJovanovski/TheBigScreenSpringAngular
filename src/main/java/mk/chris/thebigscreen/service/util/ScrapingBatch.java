package mk.chris.thebigscreen.service.util;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.Set;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ScrapingBatch {
    private Instant startTime;
    private Instant endTime;
    private long totalTime;

    private int idsSavedCount;
    private int totalIds;
    private Set<TmdbProxy> proxiesUsed;

    public Instant getStartTime() {
        return startTime;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public Instant getEndTime() {
        return endTime;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public int getIdsSavedCount() {
        return idsSavedCount;
    }

    public void setIdsSavedCount(int idsSavedCount) {
        this.idsSavedCount = idsSavedCount;
    }

    public int getTotalIds() {
        return totalIds;
    }

    public void setTotalIds(int totalIds) {
        this.totalIds = totalIds;
    }

    public Set<TmdbProxy> getProxiesUsed() {
        return proxiesUsed;
    }

    public void setProxiesUsed(Set<TmdbProxy> proxiesUsed) {
        this.proxiesUsed = proxiesUsed;
    }

    public long getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(long totalTime) {
        this.totalTime = totalTime;
    }
}
