package mk.chris.thebigscreen.service.impl;

import mk.chris.thebigscreen.service.MovieCastService;
import mk.chris.thebigscreen.domain.MovieCast;
import mk.chris.thebigscreen.repository.MovieCastRepository;
import mk.chris.thebigscreen.service.dto.MovieCastDTO;
import mk.chris.thebigscreen.service.mapper.MovieCastMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing MovieCast.
 */
@Service
@Transactional
public class MovieCastServiceImpl implements MovieCastService {

    private final Logger log = LoggerFactory.getLogger(MovieCastServiceImpl.class);

    private final MovieCastRepository movieCastRepository;

    private final MovieCastMapper movieCastMapper;

    public MovieCastServiceImpl(MovieCastRepository movieCastRepository, MovieCastMapper movieCastMapper) {
        this.movieCastRepository = movieCastRepository;
        this.movieCastMapper = movieCastMapper;
    }

    /**
     * Save a movieCast.
     *
     * @param movieCastDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MovieCastDTO save(MovieCastDTO movieCastDTO) {
        log.debug("Request to save MovieCast : {}", movieCastDTO);
        MovieCast movieCast = movieCastMapper.toEntity(movieCastDTO);
        movieCast = movieCastRepository.save(movieCast);
        return movieCastMapper.toDto(movieCast);
    }

    /**
     * Get all the movieCasts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MovieCastDTO> findAll(Pageable pageable) {
        log.debug("Request to get all MovieCasts");
        return movieCastRepository.findAll(pageable)
            .map(movieCastMapper::toDto);
    }

    /**
     * Get one movieCast by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MovieCastDTO findOne(Long id) {
        log.debug("Request to get MovieCast : {}", id);
        MovieCast movieCast = movieCastRepository.findOne(id);
        return movieCastMapper.toDto(movieCast);
    }

    /**
     * Delete the movieCast by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MovieCast : {}", id);
        movieCastRepository.delete(id);
    }
}
