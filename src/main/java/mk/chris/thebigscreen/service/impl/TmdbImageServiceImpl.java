package mk.chris.thebigscreen.service.impl;

import mk.chris.thebigscreen.service.TmdbImageService;
import mk.chris.thebigscreen.domain.TmdbImage;
import mk.chris.thebigscreen.repository.TmdbImageRepository;
import mk.chris.thebigscreen.service.dto.TmdbImageDTO;
import mk.chris.thebigscreen.service.mapper.TmdbImageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing TmdbImage.
 */
@Service
@Transactional
public class TmdbImageServiceImpl implements TmdbImageService {

    private final Logger log = LoggerFactory.getLogger(TmdbImageServiceImpl.class);

    private final TmdbImageRepository tmdbImageRepository;

    private final TmdbImageMapper tmdbImageMapper;

    public TmdbImageServiceImpl(TmdbImageRepository tmdbImageRepository, TmdbImageMapper tmdbImageMapper) {
        this.tmdbImageRepository = tmdbImageRepository;
        this.tmdbImageMapper = tmdbImageMapper;
    }

    /**
     * Save a tmdbImage.
     *
     * @param tmdbImageDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TmdbImageDTO save(TmdbImageDTO tmdbImageDTO) {
        log.debug("Request to save TmdbImage : {}", tmdbImageDTO);
        TmdbImage tmdbImage = tmdbImageMapper.toEntity(tmdbImageDTO);
        tmdbImage = tmdbImageRepository.save(tmdbImage);
        return tmdbImageMapper.toDto(tmdbImage);
    }

    /**
     * Get all the tmdbImages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TmdbImageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TmdbImages");
        return tmdbImageRepository.findAll(pageable)
            .map(tmdbImageMapper::toDto);
    }

    /**
     * Get one tmdbImage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TmdbImageDTO findOne(Long id) {
        log.debug("Request to get TmdbImage : {}", id);
        TmdbImage tmdbImage = tmdbImageRepository.findOne(id);
        return tmdbImageMapper.toDto(tmdbImage);
    }

    /**
     * Delete the tmdbImage by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TmdbImage : {}", id);
        tmdbImageRepository.delete(id);
    }
}
