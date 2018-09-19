package mk.chris.thebigscreen.repository;

import mk.chris.thebigscreen.domain.MovieCast;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MovieCast entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovieCastRepository extends JpaRepository<MovieCast, Long>, JpaSpecificationExecutor<MovieCast> {

}
