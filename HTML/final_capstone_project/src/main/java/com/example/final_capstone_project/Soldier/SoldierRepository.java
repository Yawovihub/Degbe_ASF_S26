package com.example.final_capstone_project.Soldier;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface SoldierRepository extends JpaRepository<Soldier ,Long>{
}
