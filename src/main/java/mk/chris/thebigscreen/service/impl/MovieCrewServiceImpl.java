package mk.chris.thebigscreen.service.impl;

import mk.chris.thebigscreen.service.MovieCrewService;
import mk.chris.thebigscreen.domain.MovieCrew;
import mk.chris.thebigscreen.repository.MovieCrewRepository;
import mk.chris.thebigscreen.service.dto.MovieCrewDTO;
import mk.chris.thebigscreen.service.mapper.MovieCrewMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing MovieCrew.
 */
@Service
@Transactional
public class MovieCrewServiceImpl implements MovieCrewService {

    private final Logger log = LoggerFactory.getLogger(MovieCrewServiceImpl.class);

    private final MovieCrewRepository movieCrewRepository;

    private final MovieCrewMapper movieCrewMapper;

    public MovieCrewServiceImpl(MovieCrewRepository movieCrewRepository, MovieCrewMapper movieCrewMapper) {
        this.movieCrewRepository = movieCrewRepository;
        this.movieCrewMapper = movieCrewMapper;
    }

    /**
     * Save a movieCrew.
     *
     * @param movieCrewDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MovieCrewDTO save(MovieCrewDTO movieCrewDTO) {
        log.debug("Request to save MovieCrew : {}", movieCrewDTO);
        MovieCrew movieCrew = movieCrewMapper.toEntity(movieCrewDTO);
        movieCrew = movieCrewRepository.save(movieCrew);
        return movieCrewMapper.toDto(movieCrew);
    }

    /**
     * Get all the movieCrews.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MovieCrewDTO> findAll(Pageable pageable) {
        log.debug("Request to get all MovieCrews");
        return movieCrewRepository.findAll(pageable)
            .map(movieCrewMapper::toDto);
    }

    /**
     * Get one movieCrew by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MovieCrewDTO findOne(Long id) {
        log.debug("Request to get MovieCrew : {}", id);
        MovieCrew movieCrew = movieCrewRepository.findOne(id);
        return movieCrewMapper.toDto(movieCrew);
    }

    /**
     * Delete the movieCrew by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MovieCrew : {}", id);
        movieCrewRepository.delete(id);
    }
}
