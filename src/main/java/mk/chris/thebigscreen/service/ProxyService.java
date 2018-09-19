package mk.chris.thebigscreen.service;

import org.springframework.scheduling.annotation.Async;

import java.net.Proxy;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

public interface ProxyService {

    LinkedHashSet<Proxy> getTestedValidProxies();

    LinkedHashSet<Proxy> getScrapedProxies(String url);
}
