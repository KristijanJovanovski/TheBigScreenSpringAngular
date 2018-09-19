package mk.chris.thebigscreen.service;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import mk.chris.thebigscreen.domain.TmdbImage;
import mk.chris.thebigscreen.domain.*; // for static metamodels
import mk.chris.thebigscreen.repository.TmdbImageRepository;
import mk.chris.thebigscreen.service.dto.TmdbImageCriteria;

import mk.chris.thebigscreen.service.dto.TmdbImageDTO;
import mk.chris.thebigscreen.service.mapper.TmdbImageMapper;
import mk.chris.thebigscreen.domain.enumeration.ImageType;

/**
 * Service for executing complex queries for TmdbImage entities in the database.
 * The main input is a {@link TmdbImageCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TmdbImageDTO} or a {@link Page} of {@link TmdbImageDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TmdbImageQueryService extends QueryService<TmdbImage> {

    private final Logger log = LoggerFactory.getLogger(TmdbImageQueryService.class);


    private final TmdbImageRepository tmdbImageRepository;

    private final TmdbImageMapper tmdbImageMapper;

    public TmdbImageQueryService(TmdbImageRepository tmdbImageRepository, TmdbImageMapper tmdbImageMapper) {
        this.tmdbImageRepository = tmdbImageRepository;
        this.tmdbImageMapper = tmdbImageMapper;
    }

    /**
     * Return a {@link List} of {@link TmdbImageDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TmdbImageDTO> findByCriteria(TmdbImageCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<TmdbImage> specification = createSpecification(criteria);
        return tmdbImageMapper.toDto(tmdbImageRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link TmdbImageDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TmdbImageDTO> findByCriteria(TmdbImageCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<TmdbImage> specification = createSpecification(criteria);
        final Page<TmdbImage> result = tmdbImageRepository.findAll(specification, page);
        return result.map(tmdbImageMapper::toDto);
    }

    /**
     * Function to convert TmdbImageCriteria to a {@link Specifications}
     */
    private Specifications<TmdbImage> createSpecification(TmdbImageCriteria criteria) {
        Specifications<TmdbImage> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), TmdbImage_.id));
            }
            if (criteria.getAspectRatio() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAspectRatio(), TmdbImage_.aspectRatio));
            }
            if (criteria.getFilepath() != null) {
                specification = specification.and(buildStringSpecification(criteria.getFilepath(), TmdbImage_.filepath));
            }
            if (criteria.getHeight() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getHeight(), TmdbImage_.height));
            }
            if (criteria.getIso6391() != null) {
                specification = specification.and(buildStringSpecification(criteria.getIso6391(), TmdbImage_.iso6391));
            }
            if (criteria.getWidth() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getWidth(), TmdbImage_.width));
            }
            if (criteria.getImageType() != null) {
                specification = specification.and(buildSpecification(criteria.getImageType(), TmdbImage_.imageType));
            }
            if (criteria.getMovieId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getMovieId(), TmdbImage_.movie, Movie_.id));
            }
            if (criteria.getPeopleId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getPeopleId(), TmdbImage_.people, People_.id));
            }
        }
        return specification;
    }

}
