package com.example.final_capstone_project.counseling;

import com.example.final_capstone_project.Soldier.Soldier;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "counselings")
public class Counseling {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    @JsonProperty("counseling_date")
    private LocalDate counseling_date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "soldier_id")
    @JsonBackReference // Prevents infinite loops in JSON serialization
    private Soldier soldier;
}
