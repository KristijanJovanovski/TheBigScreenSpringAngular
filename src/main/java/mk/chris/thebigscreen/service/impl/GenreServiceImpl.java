package mk.chris.thebigscreen.service.impl;

import mk.chris.thebigscreen.service.GenreService;
import mk.chris.thebigscreen.domain.Genre;
import mk.chris.thebigscreen.repository.GenreRepository;
import mk.chris.thebigscreen.service.dto.GenreDTO;
import mk.chris.thebigscreen.service.mapper.GenreMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Genre.
 */
@Service
@Transactional
public class GenreServiceImpl implements GenreService {

    private final Logger log = LoggerFactory.getLogger(GenreServiceImpl.class);

    private final GenreRepository genreRepository;

    private final GenreMapper genreMapper;

    public GenreServiceImpl(GenreRepository genreRepository, GenreMapper genreMapper) {
        this.genreRepository = genreRepository;
        this.genreMapper = genreMapper;
    }

    /**
     * Save a genre.
     *
     * @param genreDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GenreDTO save(GenreDTO genreDTO) {
        log.debug("Request to save Genre : {}", genreDTO);
        Genre genre = genreMapper.toEntity(genreDTO);
        genre = genreRepository.save(genre);
        return genreMapper.toDto(genre);
    }

    /**
     * Get all the genres.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<GenreDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Genres");
        return genreRepository.findAll(pageable)
            .map(genreMapper::toDto);
    }

    /**
     * Get one genre by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public GenreDTO findOne(Long id) {
        log.debug("Request to get Genre : {}", id);
        Genre genre = genreRepository.findOne(id);
        return genreMapper.toDto(genre);
    }

    /**
     * Delete the genre by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Genre : {}", id);
        genreRepository.delete(id);
    }
}
