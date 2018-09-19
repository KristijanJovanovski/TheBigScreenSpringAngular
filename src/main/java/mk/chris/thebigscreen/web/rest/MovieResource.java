package mk.chris.thebigscreen.web.rest;

import com.codahale.metrics.annotation.Timed;
import mk.chris.thebigscreen.security.AuthoritiesConstants;
import mk.chris.thebigscreen.service.MovieService;
import mk.chris.thebigscreen.service.responses.MovieResponse;
import mk.chris.thebigscreen.web.rest.errors.BadRequestAlertException;
import mk.chris.thebigscreen.web.rest.util.HeaderUtil;
import mk.chris.thebigscreen.web.rest.util.PaginationUtil;
import mk.chris.thebigscreen.service.dto.MovieDTO;
import mk.chris.thebigscreen.service.dto.MovieCriteria;
import mk.chris.thebigscreen.service.MovieQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Movie.
 */
@RestController
@RequestMapping("/api")
public class MovieResource {

    private final Logger log = LoggerFactory.getLogger(MovieResource.class);

    private static final String ENTITY_NAME = "movie";

    private final MovieService movieService;

    private final MovieQueryService movieQueryService;

    public MovieResource(MovieService movieService, MovieQueryService movieQueryService) {
        this.movieService = movieService;
        this.movieQueryService = movieQueryService;
    }

    /**
     * POST  /movies : Create a new movie.
     *
     * @param movieDTO the movieDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new movieDTO, or with status 400 (Bad Request) if the movie has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    @PostMapping("/movies")
    public ResponseEntity<MovieDTO> createMovie(@RequestBody MovieDTO movieDTO) throws URISyntaxException {
        log.debug("REST request to save Movie : {}", movieDTO);
        if (movieDTO.getId() != null) {
            throw new BadRequestAlertException("A new movie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MovieDTO result = movieService.save(movieDTO);
        return ResponseEntity.created(new URI("/api/movies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /movies : Updates an existing movie.
     *
     * @param movieDTO the movieDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated movieDTO,
     * or with status 400 (Bad Request) if the movieDTO is not valid,
     * or with status 500 (Internal Server Error) if the movieDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    @PutMapping("/movies")
    public ResponseEntity<MovieDTO> updateMovie(@RequestBody MovieDTO movieDTO) throws URISyntaxException {
        log.debug("REST request to update Movie : {}", movieDTO);
        if (movieDTO.getId() == null) {
            return createMovie(movieDTO);
        }
        MovieDTO result = movieService.save(movieDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, movieDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /movies : get all the movies.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of movies in body
     */
    @GetMapping("/movies")
    @Timed
    public ResponseEntity<Page<MovieResponse>> getAllMovies(MovieCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Movies by criteria: {}", criteria);
        Page<MovieResponse> page = movieQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/movies");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }

    /**
     * GET  /movies/:id : get the "id" movie.
     *
     * @param id the id of the movieDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the movieDTO, or with status 404 (Not Found)
     */
    @GetMapping("/movies/{id}")
    @Timed
    public ResponseEntity<MovieResponse> getMovie(@PathVariable Long id, @RequestParam(name = "append_to_response",required = false) List<String>append_to_response) {
        log.debug("REST request to get Movie : {}, also append to response {}", id, append_to_response);


        MovieResponse movieResponse = movieService.findOne(id, append_to_response);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(movieResponse));
    }

    /**
     * DELETE  /movies/:id : delete the "id" movie.
     *
     * @param id the id of the movieDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    @DeleteMapping("/movies/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        log.debug("REST request to delete Movie : {}", id);
        movieService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
