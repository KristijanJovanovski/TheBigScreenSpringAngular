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

import mk.chris.thebigscreen.domain.MovieCrew;
import mk.chris.thebigscreen.domain.*; // for static metamodels
import mk.chris.thebigscreen.repository.MovieCrewRepository;
import mk.chris.thebigscreen.service.dto.MovieCrewCriteria;

import mk.chris.thebigscreen.service.dto.MovieCrewDTO;
import mk.chris.thebigscreen.service.mapper.MovieCrewMapper;

/**
 * Service for executing complex queries for MovieCrew entities in the database.
 * The main input is a {@link MovieCrewCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link MovieCrewDTO} or a {@link Page} of {@link MovieCrewDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class MovieCrewQueryService extends QueryService<MovieCrew> {

    private final Logger log = LoggerFactory.getLogger(MovieCrewQueryService.class);


    private final MovieCrewRepository movieCrewRepository;

    private final MovieCrewMapper movieCrewMapper;

    public MovieCrewQueryService(MovieCrewRepository movieCrewRepository, MovieCrewMapper movieCrewMapper) {
        this.movieCrewRepository = movieCrewRepository;
        this.movieCrewMapper = movieCrewMapper;
    }

    /**
     * Return a {@link List} of {@link MovieCrewDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<MovieCrewDTO> findByCriteria(MovieCrewCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<MovieCrew> specification = createSpecification(criteria);
        return movieCrewMapper.toDto(movieCrewRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link MovieCrewDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<MovieCrewDTO> findByCriteria(MovieCrewCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<MovieCrew> specification = createSpecification(criteria);
        final Page<MovieCrew> result = movieCrewRepository.findAll(specification, page);
        return result.map(movieCrewMapper::toDto);
    }

    /**
     * Function to convert MovieCrewCriteria to a {@link Specifications}
     */
    private Specifications<MovieCrew> createSpecification(MovieCrewCriteria criteria) {
        Specifications<MovieCrew> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), MovieCrew_.id));
            }
            if (criteria.getJob() != null) {
                specification = specification.and(buildStringSpecification(criteria.getJob(), MovieCrew_.job));
            }
            if (criteria.getDepartment() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDepartment(), MovieCrew_.department));
            }
            if (criteria.getMovieId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getMovieId(), MovieCrew_.movie, Movie_.id));
            }
            if (criteria.getPeopleId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getPeopleId(), MovieCrew_.people, People_.id));
            }
        }
        return specification;
    }

}
