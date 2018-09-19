package mk.chris.thebigscreen.repository;

import mk.chris.thebigscreen.domain.MovieCrew;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MovieCrew entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovieCrewRepository extends JpaRepository<MovieCrew, Long>, JpaSpecificationExecutor<MovieCrew> {

}
