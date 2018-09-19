package mk.chris.thebigscreen.service.impl;

import mk.chris.thebigscreen.service.ProxyService;
import okhttp3.OkHttpClient;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.scalars.ScalarsConverterFactory;
import retrofit2.http.GET;
import retrofit2.http.Url;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class ProxyServiceImpl implements ProxyService {

    private final Logger log = LoggerFactory.getLogger(ProxyServiceImpl.class);
    final String api_key = 'api_key'
    final String icanhazipUrl ="http://icanhazip.com";
    final String icanhazproxyUrl ="http://icanhazproxy.com";

    final String tmdbUrl = "https://api.themoviedb.org/3/movie/550" +
        "?api_key="++"&language=en-US";

    final String freeProxyListUrl = "https://free-proxy-list.net/";

    final String usProxyUrl = "https://www.us-proxy.org/";

    final String sslProxiesUrl = "https://www.sslproxies.org/";




    public ProxyServiceImpl() {
    }

    public LinkedHashSet<Proxy> getTestedValidProxies() {

        LinkedHashSet<Proxy> scrapedProxies = getScrapedProxies(freeProxyListUrl);
        scrapedProxies.addAll(getScrapedProxies(usProxyUrl));
        scrapedProxies.addAll(getScrapedProxies(sslProxiesUrl));
        log.debug("Total scraped proxies: {}", scrapedProxies.size());
        List<Map.Entry<Proxy,List<CompletableFuture<Proxy>>>> setOfListsOfFutures = scrapedProxies
            .parallelStream()
            .map(proxy -> {

                    Retrofit retrofit1 = new Retrofit.Builder()
                        .baseUrl(icanhazipUrl)
                        .addConverterFactory(ScalarsConverterFactory.create())
                        .client(
                            new OkHttpClient
                                .Builder()
                                .connectTimeout(2000, TimeUnit.MILLISECONDS)
                                .readTimeout(2000, TimeUnit.MILLISECONDS)
                                .writeTimeout(2000, TimeUnit.MILLISECONDS)
                                .proxy(proxy)
                                .build()
                        ).build();
                    TestProxies service = retrofit1.create(TestProxies.class);

                    CompletableFuture<Proxy> ipCompletableFuture = new CompletableFuture<>();

                    CompletableFuture<Proxy> tmdbCompletableFuture = new CompletableFuture<>();

                    List<CompletableFuture<Proxy>> futureList =
                        Arrays.asList(ipCompletableFuture, tmdbCompletableFuture);


                    Callback ipCallback = new Callback<String>() {

                        @Override
                        public void onResponse(Call<String> call, Response<String> response) {
                            if(response.isSuccessful()){
                                log.debug(proxy.address().toString().split(":")[0].replaceAll("/", ""));
                                if(response.body().length() < 100){
                                    log.debug(response.body());
                                    if (proxy.address().toString().split(":")[0].replaceAll("/", "").trim()
                                        .equals(response.body().replaceAll("\n", "").trim())) {
    //                                proxies.add(proxy);
                                        futureList.get(0).complete(proxy);
                                    }else{
                                        futureList.get(0).complete(null);
                                    }
                                }else{
                                    log.debug("returns html content :/");
                                    futureList.get(0).complete(null);
                                }
                            }else {
                                futureList.get(0).complete(null);
                            }
                        }

                        @Override
                        public void onFailure(Call<String> call, Throwable t) {
                            futureList.get(0).complete(null);
                        }
                    };

                    Callback tmdbCallback = new Callback<String>() {

                        @Override
                        public void onResponse(Call<String> call, Response<String> response) {
                            if(response.isSuccessful()) {
                                int remaining = Integer.parseInt(response.headers().get("X-RateLimit-Remaining"));
                                log.debug("X-RateLimit-Remaining: {} for {}", remaining,proxy);
                                if(remaining == 39){
                                    futureList.get(1).complete(proxy);
                                }else {
                                    futureList.get(1).complete(null);
                                }
                            }else{
                                futureList.get(1).complete(null);
                            }
                        }

                        @Override
                        public void onFailure(Call<String> call, Throwable t) {
                            futureList.get(1).complete(null);
                        }
                    };


                    service.myGet(icanhazipUrl).enqueue(ipCallback);
                    service.myGet(tmdbUrl).enqueue(tmdbCallback);

                return new AbstractMap.SimpleEntry<>(proxy, futureList);
                })
            .collect(Collectors.toList());

        LinkedHashSet<Proxy> validProxies = setOfListsOfFutures
            .parallelStream()
            .map(Map.Entry::getValue)
            .map(list -> {
                long count = list.stream()
                    .map(future -> {
                        try {
                            return future.get();
                        } catch (InterruptedException | ExecutionException e) {
                            e.printStackTrace();
                        }
                        return null;
                    })
                    .filter(Objects::nonNull)
                    .count();
//                TODO: while icanhazip is down
//                if (count < 2) {
                if (count < 1) {
                    return null;
                } else {
                    try {
                        return list.get(1).get();
                    } catch (InterruptedException | ExecutionException e) {
                        e.printStackTrace();
                    }
                    return null;
                }
            })
            .filter(Objects::nonNull)
            .collect(Collectors.toCollection(LinkedHashSet::new));

        log.debug("Valid proxies: {}",validProxies.size());

        return validProxies;
    }

    public LinkedHashSet<Proxy> getScrapedProxies(String url) {
        Instant startScrapingTime = Instant.now();
        log.debug("Started scraping proxies at {}", startScrapingTime);
        LinkedHashSet<Proxy> proxySet = new LinkedHashSet<>();

            try {
                Document doc = Jsoup.connect(url).userAgent("Mozilla").get();
                Element table = doc.getElementById("proxylisttable");
                for (Element items : table.select("tbody tr")) {
                    Elements tds = items.select("td");
//                    if(tds.get(4).text().equals("elite proxy")) {
                        proxySet.add(makeProxy(tds.get(0).text(), Integer.valueOf(tds.get(1).text())));
//                    }
                }

            } catch (IOException e) {
                e.printStackTrace();
            }
        Instant endScrapingTime = Instant.now();
        log.debug("Scraped {} of proxies", proxySet.size());
        log.debug("Finished scraping proxies at {}", endScrapingTime);
        log.debug("Total time scraping proxies: {} milli", endScrapingTime.toEpochMilli() - startScrapingTime.toEpochMilli());

        return proxySet;
    }

    private Proxy makeProxy(String ip, int port){
        InetSocketAddress socketAddress = new InetSocketAddress(ip,port);
        return new Proxy(Proxy.Type.HTTP,socketAddress);
    }

    interface TestProxies{
        @GET()
        Call<String> myGet(@Url String url);
    }
}
