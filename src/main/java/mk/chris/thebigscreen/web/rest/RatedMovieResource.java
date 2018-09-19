package mk.chris.thebigscreen.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import mk.chris.thebigscreen.domain.User;
import mk.chris.thebigscreen.security.AuthoritiesConstants;
import mk.chris.thebigscreen.service.MovieService;
import mk.chris.thebigscreen.service.RatedMovieQueryService;
import mk.chris.thebigscreen.service.RatedMovieService;
import mk.chris.thebigscreen.service.UserService;
import mk.chris.thebigscreen.service.dto.MovieDTO;
import mk.chris.thebigscreen.service.dto.RatedMovieCriteria;
import mk.chris.thebigscreen.service.dto.RatedMovieDTO;
import mk.chris.thebigscreen.service.requests.RatedMovieRequest;
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
 * REST controller for managing RatedMovie.
 */
@RestController
@RequestMapping("/api")
public class RatedMovieResource {

    private final Logger log = LoggerFactory.getLogger(RatedMovieResource.class);

    private static final String ENTITY_NAME = "ratedMovieResource";

    private final RatedMovieService ratedMovieService;

    private final RatedMovieQueryService ratedMovieQueryService;

    private final UserService userService;

    private final MovieService movieService;

    public RatedMovieResource(
        RatedMovieService ratedMovieService,
        RatedMovieQueryService ratedMovieQueryService,
        UserService userService,
        MovieService movieService) {

        this.ratedMovieService = ratedMovieService;
        this.ratedMovieQueryService = ratedMovieQueryService;
        this.userService = userService;
        this.movieService = movieService;
    }

    /**
     * POST  /rated-movies : Create a new ratedMovie.
     *
     * @param username the username of the User which id is in the ratedMovieDTO
     * @param ratedMovieRequest the ratedMovieDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ratedMovieDTO, or with status 400 (Bad Request) if the ratedMovie has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @Timed
    @Secured(AuthoritiesConstants.USER)
    @PostMapping("users/{username}/rated-movies")
    public ResponseEntity<MovieResponse> createRatedMovie(@Valid @RequestBody RatedMovieRequest ratedMovieRequest, @PathVariable("username") String username) throws URISyntaxException {
        log.debug("REST request to save RatedMovie : {}", ratedMovieRequest);
//        _TODO:Fix this

        if (ratedMovieRequest.getMovieId() == null) {
            throw new BadRequestAlertException("Provide valid movie ID", ENTITY_NAME, "id");
        }

        MovieDTO movieDTO = movieService.findOne(ratedMovieRequest.getMovieId());
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

        if(ratedMovieService.findOne(currentUser.get().getId(),ratedMovieRequest.getMovieId()) != null){
            throw new BadRequestAlertException("Rated movie already exists", ENTITY_NAME, "idexists");
        }

        RatedMovieDTO ratedMovieDTO = new RatedMovieDTO();

        ratedMovieDTO.setMovieId(ratedMovieRequest.getMovieId());
        ratedMovieDTO.setUserId(currentUser.get().getId());
        ratedMovieDTO.setCreatedOn(ratedMovieRequest.getCreatedOn() != null ?
            ratedMovieRequest.getCreatedOn() : Instant.now());
        ratedMovieDTO.setRate(ratedMovieRequest.getRate());

        MovieResponse movieResponse = ratedMovieService.save(ratedMovieDTO);

        return ResponseEntity.created(new URI("/api/users/" + username + "/rated-movies/" + movieResponse.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, movieResponse.getId().toString()))
            .body(movieResponse);
    }

    /**
     * GET  /rated-movies : get all the ratedMovies.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of ratedMovies in body
     */
    @Timed
    @Secured(AuthoritiesConstants.USER)
    @GetMapping("users/{username}/rated-movies")
    public ResponseEntity<Page<MovieResponse>> getAllRatedMovies(
        RatedMovieCriteria criteria,
        Pageable pageable,
        @PathVariable("username") String username) {

        log.debug("REST request to get RatedMovies by criteria: {}", criteria);

        Optional<User> currentUser = userService.getUserWithAuthorities();
        Optional<User> userByUsername = userService.getUserWithAuthoritiesByUsername(username);

        if (!userByUsername.isPresent()) {
            throw new BadRequestAlertException("Username doesn't exist", ENTITY_NAME, "unknown-username");
        }

        if (currentUser.isPresent()
            && !currentUser.get().equals(userByUsername.get())
//            TODO: for user followers implement permissions first
//            && (!userByUsername.get().getRatedMoviesVisibility().equals("PUBLIC")
//                && userByUsername.get().getRatedMoviesVisibility().equals("PRIVATE")
//                || !userService.checkCurrentUserFollows(userByUsername.get()))

            ) {
            throw new BadRequestAlertException("User doesn't match current user", ENTITY_NAME, "user-mismatch");
//            throw new BadRequestAlertException("Current User doesn't have permissions to view "+username+"'s rated movies",
//                ENTITY_NAME,"permission-denied");
        }



        Page<MovieResponse> page = ratedMovieQueryService.findByCriteria(userByUsername.get().getId(), criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "api/users/"+username+"/rated-movies");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }

    /**
     * GET  /users/:username/rated-movies/:movie_id : get the "movie_id" ratedMovie.
     *
     * @param username the username of the User which id is in the ratedMovieDTO
     * @param movie_id the id of the ratedMovieDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ratedMovieDTO, or with status 404 (Not Found)
     */
    @Timed
    @Secured(AuthoritiesConstants.USER)
    @GetMapping("users/{username}/rated-movies/{movie_id}")
    public ResponseEntity<MovieResponse> getRatedMovie(@PathVariable Long movie_id, @PathVariable("username") String username) {
        log.debug("REST request to get RatedMovie : {}", username, movie_id);


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
//            && (!userByUsername.get().getRatedMoviesVisibility().equals("PUBLIC")
//                && userByUsername.get().getRatedMoviesVisibility().equals("PRIVATE")
//                || !userService.checkCurrentUserFollows(userByUsername.get()))

            ) {
            throw new BadRequestAlertException("User doesn't match current user", ENTITY_NAME, "user-mismatch");
//            throw new BadRequestAlertException("Current User doesn't have permissions to view "+username+"'s rated movies",
//                ENTITY_NAME,"permission-denied");
        }

        MovieResponse movieResponse = ratedMovieService.findOne(currentUser.get().getId(),movie_id);

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(movieResponse));
    }

    /**
     * DELETE  /users/:username/rated-movies/:movie_id : delete the "movie_id" ratedMovie.
     *
     * @param username the username of the User which id is in the ratedMovieDTO
     * @param movie_id the id of the ratedMovieDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @Timed
    @Secured(AuthoritiesConstants.USER)
    @DeleteMapping("/users/{username}/rated-movies/{movie_id}")
    public ResponseEntity<Void> deleteRatedMovie(@PathVariable Long movie_id, @PathVariable("username") String username) {
        log.debug("REST request to delete RatedMovie : {}", username, movie_id);

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

        ratedMovieService.delete(currentUser.get().getId(), movie_id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, movie_id.toString())).build();
    }
}
