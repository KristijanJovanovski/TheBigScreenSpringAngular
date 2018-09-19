package mk.chris.thebigscreen.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import mk.chris.thebigscreen.domain.User;
import mk.chris.thebigscreen.security.AuthoritiesConstants;
import mk.chris.thebigscreen.service.BookmarkedMovieQueryService;
import mk.chris.thebigscreen.service.BookmarkedMovieService;
import mk.chris.thebigscreen.service.MovieService;
import mk.chris.thebigscreen.service.UserService;
import mk.chris.thebigscreen.service.dto.BookmarkedMovieCriteria;
import mk.chris.thebigscreen.service.dto.BookmarkedMovieDTO;
import mk.chris.thebigscreen.service.dto.MovieDTO;
import mk.chris.thebigscreen.service.requests.BookmarkedMovieRequest;
import mk.chris.thebigscreen.service.responses.MovieResponse;
import mk.chris.thebigscreen.web.rest.errors.BadRequestAlertException;
import mk.chris.thebigscreen.web.rest.util.HeaderUtil;
import mk.chris.thebigscreen.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BookmarkedMovie.
 */
@RestController
@RequestMapping("/api")
public class BookmarkedMovieResource {

    private final Logger log = LoggerFactory.getLogger(BookmarkedMovieResource.class);

    private static final String ENTITY_NAME = "bookmarkedMovie";

    private final BookmarkedMovieService bookmarkedMovieService;

    private final BookmarkedMovieQueryService bookmarkedMovieQueryService;

    private final UserService userService;

    private final MovieService movieService;

    public BookmarkedMovieResource(
        BookmarkedMovieService bookmarkedMovieService,
        BookmarkedMovieQueryService bookmarkedMovieQueryService,
        UserService userService,
        MovieService movieService) {

        this.bookmarkedMovieService = bookmarkedMovieService;
        this.bookmarkedMovieQueryService = bookmarkedMovieQueryService;
        this.userService = userService;
        this.movieService = movieService;
    }

    /**
     * POST  /bookmarked-movies : Create a new bookmarkedMovie.
     *
     * @param username the username of the User which id is in the bookmarkedMovieDTO
     * @param bookmarkedMovieRequest the bookmarkedMovieDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bookmarkedMovieDTO, or with status 400 (Bad Request) if the bookmarkedMovie has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @Timed
    @Secured(AuthoritiesConstants.USER)
    @PostMapping("users/{username}/bookmarked-movies")
    public ResponseEntity<MovieResponse> createBookmarkedMovie(@Valid @RequestBody BookmarkedMovieRequest bookmarkedMovieRequest, @PathVariable("username") String username) throws URISyntaxException {
        log.debug("REST request to save BookmarkedMovie : {}", bookmarkedMovieRequest);
//        _TODO:Fix this

        if (bookmarkedMovieRequest.getMovieId() == null) {
            throw new BadRequestAlertException("Provide valid movie ID", ENTITY_NAME, "id");
        }

        MovieDTO movieDTO = movieService.findOne(bookmarkedMovieRequest.getMovieId());
        if(movieDTO == null){
            throw new BadRequestAlertException("Provide valid movie ID", ENTITY_NAME, "id");
        }

        Optional<User> currentUser = userService.getUserWithAuthorities();

        if (!currentUser.isPresent()){
            throw new BadRequestAlertException("User not logged in", ENTITY_NAME, "unauthorized");
        }
        if(!currentUser.get().getLogin().equalsIgnoreCase(username)) {
            throw new BadRequestAlertException("User doesn't match current user", ENTITY_NAME, "user-mismatch");
        }

        if(bookmarkedMovieService.findOne(currentUser.get().getId(),bookmarkedMovieRequest.getMovieId()) != null){
            throw new BadRequestAlertException("Bookmarked movie already exists", ENTITY_NAME, "idexists");
        }

        BookmarkedMovieDTO bookmarkedMovieDTO = new BookmarkedMovieDTO();

        bookmarkedMovieDTO.setMovieId(bookmarkedMovieRequest.getMovieId());
        bookmarkedMovieDTO.setUserId(currentUser.get().getId());
        bookmarkedMovieDTO.setCreatedOn(bookmarkedMovieRequest.getCreatedOn() != null ?
            bookmarkedMovieRequest.getCreatedOn() : Instant.now());

        MovieResponse movieResponse = bookmarkedMovieService.save(bookmarkedMovieDTO);

        return ResponseEntity.created(new URI("/api/users/" + username + "/bookmarked-movies/" + movieResponse.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, movieResponse.getId().toString()))
            .body(movieResponse);
    }

    /**
     * GET  /bookmarked-movies : get all the bookmarkedMovies.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of bookmarkedMovies in body
     */
    @Timed
    @Secured(AuthoritiesConstants.USER)
    @GetMapping("users/{username}/bookmarked-movies")
    public ResponseEntity<Page<MovieResponse>> getAllBookmarkedMovies(
        BookmarkedMovieCriteria criteria,
        Pageable pageable,
        @PathVariable("username") String username) {

        log.debug("REST request to get BookmarkedMovies by criteria: {}", criteria);

        Optional<User> currentUser = userService.getUserWithAuthorities();

        if (!currentUser.isPresent()) {
            throw new BadRequestAlertException("User not logged in", ENTITY_NAME, "unauthorized");
        }

        if (!currentUser.get().getLogin().equalsIgnoreCase(username)
//            TODO: for user followers implement permissions first
//            && (!userByUsername.get().getBookmarkedMoviesVisibility().equals("PUBLIC")
//                && userByUsername.get().getBookmarkedMoviesVisibility().equals("PRIVATE")
//                || !userService.checkCurrentUserFollows(userByUsername.get()))

            ) {
            throw new BadRequestAlertException("User doesn't match current user", ENTITY_NAME, "user-mismatch");
//            throw new BadRequestAlertException("Current User doesn't have permissions to view "+username+"'s bookmarked movies",
//                ENTITY_NAME,"permission-denied");
        }



        Page<MovieResponse> page = bookmarkedMovieQueryService.findByCriteria(currentUser.get().getId(), criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "api/users/"+username+"/bookmarked-movies");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }

    /**
     * GET  /users/:username/bookmarked-movies/:movie_id : get the "movie_id" bookmarkedMovie.
     *
     * @param username the username of the User which id is in the bookmarkedMovieDTO
     * @param movie_id the id of the bookmarkedMovieDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bookmarkedMovieDTO, or with status 404 (Not Found)
     */
    @Timed
    @Secured(AuthoritiesConstants.USER)
    @GetMapping("users/{username}/bookmarked-movies/{movie_id}")
    public ResponseEntity<MovieResponse> getBookmarkedMovie(@PathVariable Long movie_id, @PathVariable("username") String username) {
        log.debug("REST request to get BookmarkedMovie : {}", username, movie_id);


        if (movie_id == null) {
            throw new BadRequestAlertException("Provide valid movie ID", ENTITY_NAME, "id");
        }
        MovieDTO movieDTO = movieService.findOne(movie_id);
        if(movieDTO == null){
            throw new BadRequestAlertException("Provide valid movie ID", ENTITY_NAME, "id");
        }

        Optional<User> currentUser = userService.getUserWithAuthorities();

        if (!currentUser.isPresent()) {
            throw new BadRequestAlertException("User not logged in", ENTITY_NAME, "unauthorized");
        }

        if (!currentUser.get().getLogin().equalsIgnoreCase(username)
//            TODO: for user followers implement permissions first
//            && (!userByUsername.get().getBookmarkedMoviesVisibility().equals("PUBLIC")
//                && userByUsername.get().getBookmarkedMoviesVisibility().equals("PRIVATE")
//                || !userService.checkCurrentUserFollows(userByUsername.get()))

            ) {
            throw new BadRequestAlertException("User doesn't match current user", ENTITY_NAME, "user-mismatch");
//            throw new BadRequestAlertException("Current User doesn't have permissions to view "+username+"'s bookmarked movies",
//                ENTITY_NAME,"permission-denied");
        }

        MovieResponse movieResponse = bookmarkedMovieService.findOne(currentUser.get().getId(),movie_id);

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(movieResponse));
}

    /**
     * DELETE  /users/:username/bookmarked-movies/:movie_id : delete the "movie_id" bookmarkedMovie.
     *
     * @param username the username of the User which id is in the bookmarkedMovieDTO
     * @param movie_id the id of the bookmarkedMovieDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @Timed
    @Secured(AuthoritiesConstants.USER)
    @DeleteMapping("/users/{username}/bookmarked-movies/{movie_id}")
    public ResponseEntity<Void> deleteBookmarkedMovie(@PathVariable Long movie_id, @PathVariable("username") String username) {
        log.debug("REST request to delete BookmarkedMovie : {}", username, movie_id);

        if (movie_id == null) {
            throw new BadRequestAlertException("Provide valid movie ID", ENTITY_NAME, "id");
        }
        MovieDTO movieDTO = movieService.findOne(movie_id);
        if(movieDTO == null){
            throw new BadRequestAlertException("Provide valid movie ID", ENTITY_NAME, "id");
        }

        Optional<User> currentUser = userService.getUserWithAuthorities();

        if (!currentUser.isPresent()) {
            throw new BadRequestAlertException("User not logged in", ENTITY_NAME, "unauthorized");
        }

        if (!currentUser.get().getLogin().equalsIgnoreCase(username)) {
            throw new BadRequestAlertException("User doesn't match current user", ENTITY_NAME, "user-mismatch");
        }

        bookmarkedMovieService.delete(currentUser.get().getId(), movie_id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, movie_id.toString())).build();
    }
}
