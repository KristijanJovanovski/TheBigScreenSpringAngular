package mk.chris.thebigscreen.repository;

import mk.chris.thebigscreen.domain.RatedMovie;
import mk.chris.thebigscreen.domain.compositePKs.UserMoviePK;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RatedMovie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RatedMovieRepository extends JpaRepository<RatedMovie, UserMoviePK>, JpaSpecificationExecutor<RatedMovie> {

}
