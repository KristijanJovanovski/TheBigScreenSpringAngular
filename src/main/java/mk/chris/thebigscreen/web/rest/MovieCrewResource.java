package mk.chris.thebigscreen.web.rest;

import com.codahale.metrics.annotation.Timed;
import mk.chris.thebigscreen.service.MovieCrewService;
import mk.chris.thebigscreen.web.rest.errors.BadRequestAlertException;
import mk.chris.thebigscreen.web.rest.util.HeaderUtil;
import mk.chris.thebigscreen.web.rest.util.PaginationUtil;
import mk.chris.thebigscreen.service.dto.MovieCrewDTO;
import mk.chris.thebigscreen.service.dto.MovieCrewCriteria;
import mk.chris.thebigscreen.service.MovieCrewQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MovieCrew.
 */
@RestController
@RequestMapping("/api")
public class MovieCrewResource {

    private final Logger log = LoggerFactory.getLogger(MovieCrewResource.class);

    private static final String ENTITY_NAME = "movieCrew";

    private final MovieCrewService movieCrewService;

    private final MovieCrewQueryService movieCrewQueryService;

    public MovieCrewResource(MovieCrewService movieCrewService, MovieCrewQueryService movieCrewQueryService) {
        this.movieCrewService = movieCrewService;
        this.movieCrewQueryService = movieCrewQueryService;
    }

    /**
     * POST  /movie-crews : Create a new movieCrew.
     *
     * @param movieCrewDTO the movieCrewDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new movieCrewDTO, or with status 400 (Bad Request) if the movieCrew has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/movie-crews")
    @Timed
    public ResponseEntity<MovieCrewDTO> createMovieCrew(@RequestBody MovieCrewDTO movieCrewDTO) throws URISyntaxException {
        log.debug("REST request to save MovieCrew : {}", movieCrewDTO);
        if (movieCrewDTO.getId() != null) {
            throw new BadRequestAlertException("A new movieCrew cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MovieCrewDTO result = movieCrewService.save(movieCrewDTO);
        return ResponseEntity.created(new URI("/api/movie-crews/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /movie-crews : Updates an existing movieCrew.
     *
     * @param movieCrewDTO the movieCrewDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated movieCrewDTO,
     * or with status 400 (Bad Request) if the movieCrewDTO is not valid,
     * or with status 500 (Internal Server Error) if the movieCrewDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/movie-crews")
    @Timed
    public ResponseEntity<MovieCrewDTO> updateMovieCrew(@RequestBody MovieCrewDTO movieCrewDTO) throws URISyntaxException {
        log.debug("REST request to update MovieCrew : {}", movieCrewDTO);
        if (movieCrewDTO.getId() == null) {
            return createMovieCrew(movieCrewDTO);
        }
        MovieCrewDTO result = movieCrewService.save(movieCrewDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, movieCrewDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /movie-crews : get all the movieCrews.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of movieCrews in body
     */
    @GetMapping("/movie-crews")
    @Timed
    public ResponseEntity<List<MovieCrewDTO>> getAllMovieCrews(MovieCrewCriteria criteria, Pageable pageable) {
        log.debug("REST request to get MovieCrews by criteria: {}", criteria);
        Page<MovieCrewDTO> page = movieCrewQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/movie-crews");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /movie-crews/:id : get the "id" movieCrew.
     *
     * @param id the id of the movieCrewDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the movieCrewDTO, or with status 404 (Not Found)
     */
    @GetMapping("/movie-crews/{id}")
    @Timed
    public ResponseEntity<MovieCrewDTO> getMovieCrew(@PathVariable Long id) {
        log.debug("REST request to get MovieCrew : {}", id);
        MovieCrewDTO movieCrewDTO = movieCrewService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(movieCrewDTO));
    }

    /**
     * DELETE  /movie-crews/:id : delete the "id" movieCrew.
     *
     * @param id the id of the movieCrewDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/movie-crews/{id}")
    @Timed
    public ResponseEntity<Void> deleteMovieCrew(@PathVariable Long id) {
        log.debug("REST request to delete MovieCrew : {}", id);
        movieCrewService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
