package com.example.final_capstone_project.Soldier;

import com.example.final_capstone_project.counseling.Counseling;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;

import java.sql.Types;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "soldiers")

public class Soldier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String rank;

    // Soldier Info Fields
    private String phone;
    private String marital;
    private String housing;
    private String proficiency;


    private String email;
    private String unit;
    private Long soldier_id; //DODID
    private String role;
    private String mos;

    // MEDPROS & Weapon Readiness
    private Integer acft_score;
    private Integer weapon_score;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate acft_date;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate weapon_qual_date;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate vision_due;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate pha_due;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dental_due;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate immunization_due;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate hearing_due;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate hiv_due;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate profile_due;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate next_counseling_due;

    private String bio;
    private String blood_type;
    private boolean is_married;
    private boolean lives_on_post;

    // Chain of Command
    private String squad_leader;
    private String squad_leader_phone_number;
    private String psg;
    private String psg_phone_number;
    private String first_sgt;
    private String first_sgt_phone_number;

    @Lob
    @Column(name = "photo")
    @org.hibernate.annotations.JdbcTypeCode(java.sql.Types.BINARY)
    private byte[] photo; // For storing the profile image

    @OneToMany(mappedBy = "soldier", cascade = CascadeType.ALL,fetch = FetchType.EAGER ,orphanRemoval = true)
    @JsonManagedReference
    @OrderBy("counseling_date DESC") // Automatically sorts by newest first
    private List<Counseling> counselingHistory = new ArrayList<>();
}