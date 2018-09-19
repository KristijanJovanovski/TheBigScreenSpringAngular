package mk.chris.thebigscreen.service.impl;

import mk.chris.thebigscreen.service.VideoService;
import mk.chris.thebigscreen.domain.Video;
import mk.chris.thebigscreen.repository.VideoRepository;
import mk.chris.thebigscreen.service.dto.VideoDTO;
import mk.chris.thebigscreen.service.mapper.VideoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Video.
 */
@Service
@Transactional
public class VideoServiceImpl implements VideoService {

    private final Logger log = LoggerFactory.getLogger(VideoServiceImpl.class);

    private final VideoRepository videoRepository;

    private final VideoMapper videoMapper;

    public VideoServiceImpl(VideoRepository videoRepository, VideoMapper videoMapper) {
        this.videoRepository = videoRepository;
        this.videoMapper = videoMapper;
    }

    /**
     * Save a video.
     *
     * @param videoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public VideoDTO save(VideoDTO videoDTO) {
        log.debug("Request to save Video : {}", videoDTO);
        Video video = videoMapper.toEntity(videoDTO);
        video = videoRepository.save(video);
        return videoMapper.toDto(video);
    }

    /**
     * Get all the videos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<VideoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Videos");
        return videoRepository.findAll(pageable)
            .map(videoMapper::toDto);
    }

    /**
     * Get one video by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public VideoDTO findOne(Long id) {
        log.debug("Request to get Video : {}", id);
        Video video = videoRepository.findOne(id);
        return videoMapper.toDto(video);
    }

    /**
     * Delete the video by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Video : {}", id);
        videoRepository.delete(id);
    }
}
