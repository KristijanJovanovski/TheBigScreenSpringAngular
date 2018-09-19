package mk.chris.thebigscreen.service.impl;

import mk.chris.thebigscreen.service.PeopleService;
import mk.chris.thebigscreen.domain.People;
import mk.chris.thebigscreen.repository.PeopleRepository;
import mk.chris.thebigscreen.service.dto.PeopleDTO;
import mk.chris.thebigscreen.service.mapper.PeopleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing People.
 */
@Service
@Transactional
public class PeopleServiceImpl implements PeopleService {

    private final Logger log = LoggerFactory.getLogger(PeopleServiceImpl.class);

    private final PeopleRepository peopleRepository;

    private final PeopleMapper peopleMapper;

    public PeopleServiceImpl(PeopleRepository peopleRepository, PeopleMapper peopleMapper) {
        this.peopleRepository = peopleRepository;
        this.peopleMapper = peopleMapper;
    }

    /**
     * Save a people.
     *
     * @param peopleDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PeopleDTO save(PeopleDTO peopleDTO) {
        log.debug("Request to save People : {}", peopleDTO);
        People people = peopleMapper.toEntity(peopleDTO);
        people = peopleRepository.save(people);
        return peopleMapper.toDto(people);
    }

    /**
     * Get all the people.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PeopleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all People");
        return peopleRepository.findAll(pageable)
            .map(peopleMapper::toDto);
    }

    /**
     * Get one people by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PeopleDTO findOne(Long id) {
        log.debug("Request to get People : {}", id);
        People people = peopleRepository.findOne(id);
        return peopleMapper.toDto(people);
    }

    /**
     * Delete the people by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete People : {}", id);
        peopleRepository.delete(id);
    }
}
