package mk.chris.thebigscreen.web.rest;

import com.codahale.metrics.annotation.Timed;
import mk.chris.thebigscreen.service.TmdbImageService;
import mk.chris.thebigscreen.web.rest.errors.BadRequestAlertException;
import mk.chris.thebigscreen.web.rest.util.HeaderUtil;
import mk.chris.thebigscreen.web.rest.util.PaginationUtil;
import mk.chris.thebigscreen.service.dto.TmdbImageDTO;
import mk.chris.thebigscreen.service.dto.TmdbImageCriteria;
import mk.chris.thebigscreen.service.TmdbImageQueryService;
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
 * REST controller for managing TmdbImage.
 */
@RestController
@RequestMapping("/api")
public class TmdbImageResource {

    private final Logger log = LoggerFactory.getLogger(TmdbImageResource.class);

    private static final String ENTITY_NAME = "tmdbImage";

    private final TmdbImageService tmdbImageService;

    private final TmdbImageQueryService tmdbImageQueryService;

    public TmdbImageResource(TmdbImageService tmdbImageService, TmdbImageQueryService tmdbImageQueryService) {
        this.tmdbImageService = tmdbImageService;
        this.tmdbImageQueryService = tmdbImageQueryService;
    }

    /**
     * POST  /tmdb-images : Create a new tmdbImage.
     *
     * @param tmdbImageDTO the tmdbImageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tmdbImageDTO, or with status 400 (Bad Request) if the tmdbImage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tmdb-images")
    @Timed
    public ResponseEntity<TmdbImageDTO> createTmdbImage(@Valid @RequestBody TmdbImageDTO tmdbImageDTO) throws URISyntaxException {
        log.debug("REST request to save TmdbImage : {}", tmdbImageDTO);
        if (tmdbImageDTO.getId() != null) {
            throw new BadRequestAlertException("A new tmdbImage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TmdbImageDTO result = tmdbImageService.save(tmdbImageDTO);
        return ResponseEntity.created(new URI("/api/tmdb-images/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tmdb-images : Updates an existing tmdbImage.
     *
     * @param tmdbImageDTO the tmdbImageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tmdbImageDTO,
     * or with status 400 (Bad Request) if the tmdbImageDTO is not valid,
     * or with status 500 (Internal Server Error) if the tmdbImageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tmdb-images")
    @Timed
    public ResponseEntity<TmdbImageDTO> updateTmdbImage(@Valid @RequestBody TmdbImageDTO tmdbImageDTO) throws URISyntaxException {
        log.debug("REST request to update TmdbImage : {}", tmdbImageDTO);
        if (tmdbImageDTO.getId() == null) {
            return createTmdbImage(tmdbImageDTO);
        }
        TmdbImageDTO result = tmdbImageService.save(tmdbImageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tmdbImageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tmdb-images : get all the tmdbImages.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of tmdbImages in body
     */
    @GetMapping("/tmdb-images")
    @Timed
    public ResponseEntity<List<TmdbImageDTO>> getAllTmdbImages(TmdbImageCriteria criteria, Pageable pageable) {
        log.debug("REST request to get TmdbImages by criteria: {}", criteria);
        Page<TmdbImageDTO> page = tmdbImageQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tmdb-images");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tmdb-images/:id : get the "id" tmdbImage.
     *
     * @param id the id of the tmdbImageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tmdbImageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tmdb-images/{id}")
    @Timed
    public ResponseEntity<TmdbImageDTO> getTmdbImage(@PathVariable Long id) {
        log.debug("REST request to get TmdbImage : {}", id);
        TmdbImageDTO tmdbImageDTO = tmdbImageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tmdbImageDTO));
    }

    /**
     * DELETE  /tmdb-images/:id : delete the "id" tmdbImage.
     *
     * @param id the id of the tmdbImageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tmdb-images/{id}")
    @Timed
    public ResponseEntity<Void> deleteTmdbImage(@PathVariable Long id) {
        log.debug("REST request to delete TmdbImage : {}", id);
        tmdbImageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
