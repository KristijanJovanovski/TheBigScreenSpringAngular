package mk.chris.thebigscreen.web.rest;

import com.codahale.metrics.annotation.Timed;
import mk.chris.thebigscreen.service.MovieCastService;
import mk.chris.thebigscreen.web.rest.errors.BadRequestAlertException;
import mk.chris.thebigscreen.web.rest.util.HeaderUtil;
import mk.chris.thebigscreen.web.rest.util.PaginationUtil;
import mk.chris.thebigscreen.service.dto.MovieCastDTO;
import mk.chris.thebigscreen.service.dto.MovieCastCriteria;
import mk.chris.thebigscreen.service.MovieCastQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MovieCast.
 */
@RestController
@RequestMapping("/api")
public class MovieCastResource {

    private final Logger log = LoggerFactory.getLogger(MovieCastResource.class);

    private static final String ENTITY_NAME = "movieCast";

    private final MovieCastService movieCastService;

    private final MovieCastQueryService movieCastQueryService;

    public MovieCastResource(MovieCastService movieCastService, MovieCastQueryService movieCastQueryService) {
        this.movieCastService = movieCastService;
        this.movieCastQueryService = movieCastQueryService;
    }

    /**
     * POST  /movie-casts : Create a new movieCast.
     *
     * @param movieCastDTO the movieCastDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new movieCastDTO, or with status 400 (Bad Request) if the movieCast has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/movie-casts")
    @Timed
    public ResponseEntity<MovieCastDTO> createMovieCast(@Valid @RequestBody MovieCastDTO movieCastDTO) throws URISyntaxException {
        log.debug("REST request to save MovieCast : {}", movieCastDTO);
        if (movieCastDTO.getId() != null) {
            throw new BadRequestAlertException("A new movieCast cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MovieCastDTO result = movieCastService.save(movieCastDTO);
        return ResponseEntity.created(new URI("/api/movie-casts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /movie-casts : Updates an existing movieCast.
     *
     * @param movieCastDTO the movieCastDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated movieCastDTO,
     * or with status 400 (Bad Request) if the movieCastDTO is not valid,
     * or with status 500 (Internal Server Error) if the movieCastDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/movie-casts")
    @Timed
    public ResponseEntity<MovieCastDTO> updateMovieCast(@Valid @RequestBody MovieCastDTO movieCastDTO) throws URISyntaxException {
        log.debug("REST request to update MovieCast : {}", movieCastDTO);
        if (movieCastDTO.getId() == null) {
            return createMovieCast(movieCastDTO);
        }
        MovieCastDTO result = movieCastService.save(movieCastDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, movieCastDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /movie-casts : get all the movieCasts.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of movieCasts in body
     */
    @GetMapping("/movie-casts")
    @Timed
    public ResponseEntity<List<MovieCastDTO>> getAllMovieCasts(MovieCastCriteria criteria, Pageable pageable) {
        log.debug("REST request to get MovieCasts by criteria: {}", criteria);
        Page<MovieCastDTO> page = movieCastQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/movie-casts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /movie-casts/:id : get the "id" movieCast.
     *
     * @param id the id of the movieCastDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the movieCastDTO, or with status 404 (Not Found)
     */
    @GetMapping("/movie-casts/{id}")
    @Timed
    public ResponseEntity<MovieCastDTO> getMovieCast(@PathVariable Long id) {
        log.debug("REST request to get MovieCast : {}", id);
        MovieCastDTO movieCastDTO = movieCastService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(movieCastDTO));
    }

    /**
     * DELETE  /movie-casts/:id : delete the "id" movieCast.
     *
     * @param id the id of the movieCastDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/movie-casts/{id}")
    @Timed
    public ResponseEntity<Void> deleteMovieCast(@PathVariable Long id) {
        log.debug("REST request to delete MovieCast : {}", id);
        movieCastService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
