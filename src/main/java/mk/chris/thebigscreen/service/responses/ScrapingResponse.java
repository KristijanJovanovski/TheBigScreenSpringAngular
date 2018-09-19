package mk.chris.thebigscreen.service.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import mk.chris.thebigscreen.service.enums.ScrapeType;
import mk.chris.thebigscreen.service.util.ScrapingBatch;
import mk.chris.thebigscreen.service.util.TmdbProxy;

import java.time.Instant;
import java.util.Set;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ScrapingResponse {
    private ScrapeType type;
    private Instant startTime;
    private Instant endTime;
    private long totalTime;
    private int idsNotSavedCount;
    private int idsSavedCount;
    private int totalIds;
    private Set<Integer> idsNotSaved;
    private Set<TmdbProxy> proxiesUsed;
    private Set<ScrapingBatch> batches;

    public ScrapeType getType() {
        return type;
    }

    public void setType(ScrapeType type) {
        this.type = type;
    }

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

    public Set<Integer> getIdsNotSaved() {
        return idsNotSaved;
    }

    public void setIdsNotSaved(Set<Integer> idsNotSaved) {
        this.idsNotSaved = idsNotSaved;
    }

    public int getIdsNotSavedCount() {
        return idsNotSavedCount;
    }

    public void setIdsNotSavedCount(int idsNotSavedCount) {
        this.idsNotSavedCount = idsNotSavedCount;
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

    public Set<ScrapingBatch> getBatches() {
        return batches;
    }

    public void setBatches(Set<ScrapingBatch> batches) {
        this.batches = batches;
    }

    public long getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(long totalTime) {
        this.totalTime = totalTime;
    }
}
