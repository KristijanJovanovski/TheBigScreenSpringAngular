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

import mk.chris.thebigscreen.domain.Genre;
import mk.chris.thebigscreen.domain.*; // for static metamodels
import mk.chris.thebigscreen.repository.GenreRepository;
import mk.chris.thebigscreen.service.dto.GenreCriteria;

import mk.chris.thebigscreen.service.dto.GenreDTO;
import mk.chris.thebigscreen.service.mapper.GenreMapper;

/**
 * Service for executing complex queries for Genre entities in the database.
 * The main input is a {@link GenreCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link GenreDTO} or a {@link Page} of {@link GenreDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class GenreQueryService extends QueryService<Genre> {

    private final Logger log = LoggerFactory.getLogger(GenreQueryService.class);


    private final GenreRepository genreRepository;

    private final GenreMapper genreMapper;

    public GenreQueryService(GenreRepository genreRepository, GenreMapper genreMapper) {
        this.genreRepository = genreRepository;
        this.genreMapper = genreMapper;
    }

    /**
     * Return a {@link List} of {@link GenreDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<GenreDTO> findByCriteria(GenreCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Genre> specification = createSpecification(criteria);
        return genreMapper.toDto(genreRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link GenreDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<GenreDTO> findByCriteria(GenreCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Genre> specification = createSpecification(criteria);
        final Page<Genre> result = genreRepository.findAll(specification, page);
        return result.map(genreMapper::toDto);
    }

    /**
     * Function to convert GenreCriteria to a {@link Specifications}
     */
    private Specifications<Genre> createSpecification(GenreCriteria criteria) {
        Specifications<Genre> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Genre_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), Genre_.name));
            }
            if (criteria.getMoviesId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getMoviesId(), Genre_.movies, Movie_.id));
            }
        }
        return specification;
    }

}
