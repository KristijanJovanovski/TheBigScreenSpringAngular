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

import mk.chris.thebigscreen.domain.People;
import mk.chris.thebigscreen.domain.*; // for static metamodels
import mk.chris.thebigscreen.repository.PeopleRepository;
import mk.chris.thebigscreen.service.dto.PeopleCriteria;

import mk.chris.thebigscreen.service.dto.PeopleDTO;
import mk.chris.thebigscreen.service.mapper.PeopleMapper;
import mk.chris.thebigscreen.domain.enumeration.Gender;

/**
 * Service for executing complex queries for People entities in the database.
 * The main input is a {@link PeopleCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link PeopleDTO} or a {@link Page} of {@link PeopleDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class PeopleQueryService extends QueryService<People> {

    private final Logger log = LoggerFactory.getLogger(PeopleQueryService.class);


    private final PeopleRepository peopleRepository;

    private final PeopleMapper peopleMapper;

    public PeopleQueryService(PeopleRepository peopleRepository, PeopleMapper peopleMapper) {
        this.peopleRepository = peopleRepository;
        this.peopleMapper = peopleMapper;
    }

    /**
     * Return a {@link List} of {@link PeopleDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<PeopleDTO> findByCriteria(PeopleCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<People> specification = createSpecification(criteria);
        return peopleMapper.toDto(peopleRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link PeopleDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<PeopleDTO> findByCriteria(PeopleCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<People> specification = createSpecification(criteria);
        final Page<People> result = peopleRepository.findAll(specification, page);
        return result.map(peopleMapper::toDto);
    }

    /**
     * Function to convert PeopleCriteria to a {@link Specifications}
     */
    private Specifications<People> createSpecification(PeopleCriteria criteria) {
        Specifications<People> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), People_.id));
            }
            if (criteria.getImdbId() != null) {
                specification = specification.and(buildStringSpecification(criteria.getImdbId(), People_.imdbId));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), People_.name));
            }
            if (criteria.getGender() != null) {
                specification = specification.and(buildSpecification(criteria.getGender(), People_.gender));
            }
            if (criteria.getBiography() != null) {
                specification = specification.and(buildStringSpecification(criteria.getBiography(), People_.biography));
            }
            if (criteria.getPopularity() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPopularity(), People_.popularity));
            }
            if (criteria.getAdult() != null) {
                specification = specification.and(buildSpecification(criteria.getAdult(), People_.adult));
            }
            if (criteria.getBirthday() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBirthday(), People_.birthday));
            }
            if (criteria.getPlaceOfBirth() != null) {
                specification = specification.and(buildStringSpecification(criteria.getPlaceOfBirth(), People_.placeOfBirth));
            }
            if (criteria.getProfilePath() != null) {
                specification = specification.and(buildStringSpecification(criteria.getProfilePath(), People_.profilePath));
            }
            if (criteria.getDeathday() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDeathday(), People_.deathday));
            }
            if (criteria.getCastId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getCastId(), People_.cast, MovieCast_.id));
            }
            if (criteria.getCrewId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getCrewId(), People_.crew, MovieCrew_.id));
            }
            if (criteria.getTmdbImagesId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getTmdbImagesId(), People_.tmdbImages, TmdbImage_.id));
            }
        }
        return specification;
    }

}
