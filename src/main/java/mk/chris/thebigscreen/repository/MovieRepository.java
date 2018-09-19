package mk.chris.thebigscreen.repository;

import mk.chris.thebigscreen.domain.Movie;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Movie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovieRepository extends JpaRepository<Movie, Long>, JpaSpecificationExecutor<Movie> {

    @Query("select distinct movies from Movie movies left join fetch movies.genres")
    List<Movie> findAllWithEagerRelationships();

//    @Query("select movies from Movie movies left join fetch movies.genres left join fetch movies.keywords where movies.id =:id")
//    Movie findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select movies from Movie movies " +
        "left join fetch movies.genres " +
        "left join fetch movies.videos " +
        "left join fetch movies.tmdbImages " +
        "left join fetch movies.cast " +
        "left join fetch movies.crew " +
        "where movies.id =:id")
    Movie findOneWithEagerRelationships(@Param("id") Long id);
}
