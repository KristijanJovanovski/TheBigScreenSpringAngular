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

import mk.chris.thebigscreen.domain.MovieCast;
import mk.chris.thebigscreen.domain.*; // for static metamodels
import mk.chris.thebigscreen.repository.MovieCastRepository;
import mk.chris.thebigscreen.service.dto.MovieCastCriteria;

import mk.chris.thebigscreen.service.dto.MovieCastDTO;
import mk.chris.thebigscreen.service.mapper.MovieCastMapper;

/**
 * Service for executing complex queries for MovieCast entities in the database.
 * The main input is a {@link MovieCastCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link MovieCastDTO} or a {@link Page} of {@link MovieCastDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class MovieCastQueryService extends QueryService<MovieCast> {

    private final Logger log = LoggerFactory.getLogger(MovieCastQueryService.class);


    private final MovieCastRepository movieCastRepository;

    private final MovieCastMapper movieCastMapper;

    public MovieCastQueryService(MovieCastRepository movieCastRepository, MovieCastMapper movieCastMapper) {
        this.movieCastRepository = movieCastRepository;
        this.movieCastMapper = movieCastMapper;
    }

    /**
     * Return a {@link List} of {@link MovieCastDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<MovieCastDTO> findByCriteria(MovieCastCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<MovieCast> specification = createSpecification(criteria);
        return movieCastMapper.toDto(movieCastRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link MovieCastDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<MovieCastDTO> findByCriteria(MovieCastCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<MovieCast> specification = createSpecification(criteria);
        final Page<MovieCast> result = movieCastRepository.findAll(specification, page);
        return result.map(movieCastMapper::toDto);
    }

    /**
     * Function to convert MovieCastCriteria to a {@link Specifications}
     */
    private Specifications<MovieCast> createSpecification(MovieCastCriteria criteria) {
        Specifications<MovieCast> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), MovieCast_.id));
            }
            if (criteria.getMovieRole() != null) {
                specification = specification.and(buildStringSpecification(criteria.getMovieRole(), MovieCast_.movieRole));
            }
            if (criteria.getCastOrder() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCastOrder(), MovieCast_.castOrder));
            }
            if (criteria.getMovieId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getMovieId(), MovieCast_.movie, Movie_.id));
            }
            if (criteria.getPeopleId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getPeopleId(), MovieCast_.people, People_.id));
            }
        }
        return specification;
    }

}
