package com.example.final_capstone_project.Soldier;

import org.mapstruct.*;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface SoldierMapper {

    void updateSoldierFromDto(Soldier dto, @MappingTarget Soldier entity);
}
