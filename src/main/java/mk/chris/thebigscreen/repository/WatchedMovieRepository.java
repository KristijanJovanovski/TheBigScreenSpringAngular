package mk.chris.thebigscreen.repository;

import mk.chris.thebigscreen.domain.WatchedMovie;
import mk.chris.thebigscreen.domain.compositePKs.UserMoviePK;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the WatchedMovie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WatchedMovieRepository extends JpaRepository<WatchedMovie, UserMoviePK>, JpaSpecificationExecutor<WatchedMovie> {

}
