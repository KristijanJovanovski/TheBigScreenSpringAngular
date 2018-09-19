package mk.chris.thebigscreen.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(mk.chris.thebigscreen.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
//            cm.createCache(mk.chris.thebigscreen.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.User.class.getName() + ".bookmarkedMovies", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.User.class.getName() + ".watchedMovies", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.User.class.getName() + ".ratedMovies", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Movie.class.getName(), jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Movie.class.getName() + ".bookmarkedMovies", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Movie.class.getName() + ".watchedMovies", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Movie.class.getName() + ".ratedMovies", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Movie.class.getName() + ".videos", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Movie.class.getName() + ".cast", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Movie.class.getName() + ".crew", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Movie.class.getName() + ".tmdbImages", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Movie.class.getName() + ".genres", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Movie.class.getName() + ".keywords", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.BookmarkedMovie.class.getName(), jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.WatchedMovie.class.getName(), jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.RatedMovie.class.getName(), jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Genre.class.getName(), jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Genre.class.getName() + ".movies", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.Video.class.getName(), jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.People.class.getName(), jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.People.class.getName() + ".cast", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.People.class.getName() + ".crew", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.People.class.getName() + ".tmdbImages", jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.MovieCast.class.getName(), jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.MovieCrew.class.getName(), jcacheConfiguration);
            cm.createCache(mk.chris.thebigscreen.domain.TmdbImage.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
