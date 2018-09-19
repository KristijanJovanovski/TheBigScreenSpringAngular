package mk.chris.thebigscreen.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import mk.chris.thebigscreen.domain.User;
import mk.chris.thebigscreen.security.AuthoritiesConstants;
import mk.chris.thebigscreen.service.MovieService;
import mk.chris.thebigscreen.service.WatchedMovieQueryService;
import mk.chris.thebigscreen.service.WatchedMovieService;
import mk.chris.thebigscreen.service.UserService;
import mk.chris.thebigscreen.service.dto.MovieDTO;
import mk.chris.thebigscreen.service.dto.WatchedMovieCriteria;
import mk.chris.thebigscreen.service.dto.WatchedMovieDTO;
import mk.chris.thebigscreen.service.requests.WatchedMovieRequest;
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
 * REST controller for managing WatchedMovie.
 */
@RestController
@RequestMapping("/api")
public class WatchedMovieResource {

    private final Logger log = LoggerFactory.getLogger(WatchedMovieResource.class);

    private static final String ENTITY_NAME = "watchedMovieResource";

    private final WatchedMovieService watchedMovieService;

    private final WatchedMovieQueryService watchedMovieQueryService;

    private final UserService userService;

    private final MovieService movieService;

    public WatchedMovieResource(
        WatchedMovieService watchedMovieService,
        WatchedMovieQueryService watchedMovieQueryService,
        UserService userService,
        MovieService movieService) {

        this.watchedMovieService = watchedMovieService;
        this.watchedMovieQueryService = watchedMovieQueryService;
        this.userService = userService;
        this.movieService = movieService;
    }

    /**
     * POST  /watched-movies : Create a new watchedMovie.
     *
     * @param username the username of the User which id is in the watchedMovieDTO
     * @param watchedMovieRequest the watchedMovieDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new watchedMovieDTO, or with status 400 (Bad Request) if the watchedMovie has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @Timed
    @Secured(AuthoritiesConstants.USER)
    @PostMapping("users/{username}/watched-movies")
    public ResponseEntity<MovieResponse> createWatchedMovie(@Valid @RequestBody WatchedMovieRequest watchedMovieRequest, @PathVariable("username") String username) throws URISyntaxException {
        log.debug("REST request to save WatchedMovie : {}", watchedMovieRequest);

        if (watchedMovieRequest.getMovieId() == null) {
            throw new BadRequestAlertException("Provide valid movie ID", ENTITY_NAME, "id");
        }

        MovieDTO movieDTO = movieService.findOne(watchedMovieRequest.getMovieId());
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

        if(watchedMovieService.findOne(currentUser.get().getId(),watchedMovieRequest.getMovieId()) != null){
            throw new BadRequestAlertException("Watched movie already exists", ENTITY_NAME, "idexists");
        }

        WatchedMovieDTO watchedMovieDTO = new WatchedMovieDTO();

        watchedMovieDTO.setMovieId(watchedMovieRequest.getMovieId());
        watchedMovieDTO.setUserId(currentUser.get().getId());
        watchedMovieDTO.setCreatedOn(watchedMovieRequest.getCreatedOn() != null ?
            watchedMovieRequest.getCreatedOn() : Instant.now());

        MovieResponse movieResponse = watchedMovieService.save(watchedMovieDTO);

        return ResponseEntity.created(new URI("/api/users/" + username + "/watched-movies/" + movieResponse.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, movieResponse.getId().toString()))
            .body(movieResponse);
    }


    /**
     * GET  /watched-movies : get all the watchedMovies.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of watchedMovies in body
     */
    @Timed
    @Secured(AuthoritiesConstants.USER)
    @GetMapping("users/{username}/watched-movies")
    public ResponseEntity<Page<MovieResponse>> getAllWatchedMovies(
        WatchedMovieCriteria criteria,
        Pageable pageable,
        @PathVariable("username") String username) {

        log.debug("REST request to get WatchedMovies by criteria: {}", criteria);

        Optional<User> currentUser = userService.getUserWithAuthorities();

        if (!currentUser.isPresent()) {
            throw new BadRequestAlertException("User not logged in", ENTITY_NAME, "unauthorized");
        }

        if (!currentUser.get().getLogin().equalsIgnoreCase(username)
//            TODO: for user followers implement permissions first
//            && (!userByUsername.get().getWatchedMoviesVisibility().equals("PUBLIC")
//                && userByUsername.get().getWatchedMoviesVisibility().equals("PRIVATE")
//                || !userService.checkCurrentUserFollows(userByUsername.get()))

            ) {
            throw new BadRequestAlertException("User doesn't match current user", ENTITY_NAME, "user-mismatch");
//            throw new BadRequestAlertException("Current User doesn't have permissions to view "+username+"'s watched movies",
//                ENTITY_NAME,"permission-denied");
        }



        Page<MovieResponse> page = watchedMovieQueryService.findByCriteria(currentUser.get().getId(), criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "api/users/"+username+"/watched-movies");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }

    /**
     * GET  /users/:username/watched-movies/:movie_id : get the "movie_id" watchedMovie.
     *
     * @param username the username of the User which id is in the watchedMovieDTO
     * @param movie_id the id of the watchedMovieDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the watchedMovieDTO, or with status 404 (Not Found)
     */
    @Timed
    @Secured(AuthoritiesConstants.USER)
    @GetMapping("users/{username}/watched-movies/{movie_id}")
    public ResponseEntity<MovieResponse> getWatchedMovie(@PathVariable Long movie_id, @PathVariable("username") String username) {
        log.debug("REST request to get WatchedMovie : {}", username, movie_id);


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
//            && (!userByUsername.get().getWatchedMoviesVisibility().equals("PUBLIC")
//                && userByUsername.get().getWatchedMoviesVisibility().equals("PRIVATE")
//                || !userService.checkCurrentUserFollows(userByUsername.get()))

            ) {
            throw new BadRequestAlertException("User doesn't match current user", ENTITY_NAME, "user-mismatch");
//            throw new BadRequestAlertException("Current User doesn't have permissions to view "+username+"'s watched movies",
//                ENTITY_NAME,"permission-denied");
        }

        MovieResponse movieResponse = watchedMovieService.findOne(currentUser.get().getId(),movie_id);

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(movieResponse));
    }

    /**
     * DELETE  /users/:username/watched-movies/:movie_id : delete the "movie_id" watchedMovie.
     *
     * @param username the username of the User which id is in the watchedMovieDTO
     * @param movie_id the id of the watchedMovieDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @Timed
    @Secured(AuthoritiesConstants.USER)
    @DeleteMapping("/users/{username}/watched-movies/{movie_id}")
    public ResponseEntity<Void> deleteWatchedMovie(@PathVariable Long movie_id, @PathVariable("username") String username) {
        log.debug("REST request to delete WatchedMovie : {}", username, movie_id);

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

        watchedMovieService.delete(currentUser.get().getId(), movie_id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, movie_id.toString())).build();
    }
}
