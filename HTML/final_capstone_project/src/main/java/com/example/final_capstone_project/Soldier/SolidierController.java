package com.example.final_capstone_project.Soldier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/soldiers")
@CrossOrigin(origins = "http://localhost:5173")
public class SolidierController {
    @Autowired
    private SoldierRepository soldierRepository;

    @Autowired
    private SoldierMapper soldierMapper; // inject the mapper

    @GetMapping  //get all soldiers from db
    public List<Soldier> getAllSoldiers() {
        return soldierRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Soldier> getSoldierById(@PathVariable Long id) {
        return soldierRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/photo")
    public ResponseEntity<String> uploadPhoto(
            @PathVariable Long id,
            @ModelAttribute UserPhotoDto photoDto) {

        try {
            // 1. Fetch the existing soldier from the database
            Optional<Soldier> soldierOptional = soldierRepository.findById(id);
            if (soldierOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Error: Soldier not found");
            }

            Soldier soldier = soldierOptional.get();

            // 2. Extract the file from the DTO
            // Note: Check the getter name in your UserPhotoDto (e.g. getFile() or getPhotoFile())
            MultipartFile file = photoDto.getFile();

            if (file != null && !file.isEmpty()) {
                // 3. Convert file to byte array and update the entity
                soldier.setPhoto(file.getBytes());
                soldierRepository.save(soldier);

                return ResponseEntity.ok("Photo uploaded and saved successfully");
            } else {
                return ResponseEntity.badRequest().body("Error: No file uploaded");
            }

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process photo file: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Soldier> createSoldier(@RequestBody Soldier soldier) {
        // This saves the soldier and returns the object (including the new ID)
        soldier.setSoldier_id(null);
        Soldier savedSoldier = soldierRepository.save(soldier);
        return ResponseEntity.ok(savedSoldier);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Soldier> updateSoldier(@PathVariable Long id, @RequestBody Soldier incomingSoldier) {
        return soldierRepository.findById(id)
                .map(existingSoldier -> {
                    // MapStruct copies non-null values from incoming to existing
                    soldierMapper.updateSoldierFromDto(incomingSoldier, existingSoldier);

                    // Save to database
                    Soldier updatedSoldier = soldierRepository.save(existingSoldier);
                    return ResponseEntity.ok(updatedSoldier);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSoldier(@PathVariable Long id) {
        if (soldierRepository.existsById(id)) {
            soldierRepository.deleteById(id);
            return ResponseEntity.ok().build(); // Returns HTTP 200 OK
        } else {
            return ResponseEntity.notFound().build(); // Returns HTTP 404 if not found
        }
    }

}
