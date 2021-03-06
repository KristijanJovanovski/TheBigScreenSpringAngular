package mk.chris.thebigscreen.repository;

import mk.chris.thebigscreen.domain.TmdbImage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TmdbImage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TmdbImageRepository extends JpaRepository<TmdbImage, Long>, JpaSpecificationExecutor<TmdbImage> {

}
