package mk.chris.thebigscreen.repository;

import mk.chris.thebigscreen.domain.BookmarkedMovie;
import mk.chris.thebigscreen.domain.compositePKs.UserMoviePK;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BookmarkedMovie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookmarkedMovieRepository extends JpaRepository<BookmarkedMovie, UserMoviePK>, JpaSpecificationExecutor<BookmarkedMovie> {

}
