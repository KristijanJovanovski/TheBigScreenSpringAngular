package mk.chris.thebigscreen.service.util;

import java.net.Proxy;
import java.time.Instant;

public class TmdbProxy {

    private Proxy proxy;

    private int totalRequestsMade;

    private int idsSavedCount;

    public Proxy getProxy() {
        return proxy;
    }

    public void setProxy(Proxy proxy) {
        this.proxy = proxy;
    }

    public int getTotalRequestsMade() {
        return totalRequestsMade;
    }

    public void setTotalRequestsMade(int totalRequestsMade) {
        this.totalRequestsMade = totalRequestsMade;
    }

    public int getIdsSavedCount() {
        return idsSavedCount;
    }

    public void setIdsSavedCount(int idsSavedCount) {
        this.idsSavedCount = idsSavedCount;
    }

}
