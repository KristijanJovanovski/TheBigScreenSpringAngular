package mk.chris.thebigscreen.service.mapper;

import mk.chris.thebigscreen.domain.*;
import mk.chris.thebigscreen.service.dto.PeopleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity People and its DTO PeopleDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PeopleMapper extends EntityMapper<PeopleDTO, People> {


    @Mapping(target = "cast", ignore = true)
    @Mapping(target = "crew", ignore = true)
    @Mapping(target = "tmdbImages", ignore = true)
    People toEntity(PeopleDTO peopleDTO);

    default People fromId(Long id) {
        if (id == null) {
            return null;
        }
        People people = new People();
        people.setId(id);
        return people;
    }
}
