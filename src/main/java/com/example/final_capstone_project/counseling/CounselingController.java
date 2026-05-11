package com.example.final_capstone_project.counseling;

import com.example.final_capstone_project.Soldier.SoldierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/soldiers")
@CrossOrigin(origins = "http://localhost:3000")
public class CounselingController {

    @Autowired
    private SoldierRepository soldierRepository;

    @Autowired
    private CounselingRepository counselingRepository;

    @PostMapping("/{soldierId}/counseling")
    public ResponseEntity<?> addCounseling(@PathVariable Long soldierId, @RequestBody Counseling counseling) {
        return soldierRepository.findById(soldierId).map(soldier -> {
            // 1. Link the counseling record to the soldier
            counseling.setSoldier(soldier);

            // 2. Save the record
            Counseling savedCounseling = counselingRepository.save(counseling);

            return ResponseEntity.ok(savedCounseling);
        }).orElse(ResponseEntity.notFound().build());
    }
}