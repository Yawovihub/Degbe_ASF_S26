package com.example.final_capstone_project.counseling;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CounselingRepository extends JpaRepository<Counseling, Long> {

}
