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

import mk.chris.thebigscreen.domain.Video;
import mk.chris.thebigscreen.domain.*; // for static metamodels
import mk.chris.thebigscreen.repository.VideoRepository;
import mk.chris.thebigscreen.service.dto.VideoCriteria;

import mk.chris.thebigscreen.service.dto.VideoDTO;
import mk.chris.thebigscreen.service.mapper.VideoMapper;
import mk.chris.thebigscreen.domain.enumeration.VideoType;

/**
 * Service for executing complex queries for Video entities in the database.
 * The main input is a {@link VideoCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link VideoDTO} or a {@link Page} of {@link VideoDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class VideoQueryService extends QueryService<Video> {

    private final Logger log = LoggerFactory.getLogger(VideoQueryService.class);


    private final VideoRepository videoRepository;

    private final VideoMapper videoMapper;

    public VideoQueryService(VideoRepository videoRepository, VideoMapper videoMapper) {
        this.videoRepository = videoRepository;
        this.videoMapper = videoMapper;
    }

    /**
     * Return a {@link List} of {@link VideoDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<VideoDTO> findByCriteria(VideoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Video> specification = createSpecification(criteria);
        return videoMapper.toDto(videoRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link VideoDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<VideoDTO> findByCriteria(VideoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Video> specification = createSpecification(criteria);
        final Page<Video> result = videoRepository.findAll(specification, page);
        return result.map(videoMapper::toDto);
    }

    /**
     * Function to convert VideoCriteria to a {@link Specifications}
     */
    private Specifications<Video> createSpecification(VideoCriteria criteria) {
        Specifications<Video> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Video_.id));
            }
            if (criteria.getVideoKey() != null) {
                specification = specification.and(buildStringSpecification(criteria.getVideoKey(), Video_.videoKey));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), Video_.name));
            }
            if (criteria.getVideoSite() != null) {
                specification = specification.and(buildStringSpecification(criteria.getVideoSite(), Video_.videoSite));
            }
            if (criteria.getVideoSize() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getVideoSize(), Video_.videoSize));
            }
            if (criteria.getVideoType() != null) {
                specification = specification.and(buildSpecification(criteria.getVideoType(), Video_.videoType));
            }
            if (criteria.getMovieId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getMovieId(), Video_.movie, Movie_.id));
            }
        }
        return specification;
    }

}
