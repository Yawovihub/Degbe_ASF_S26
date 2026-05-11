package com.example.final_capstone_project.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue
    private Long id;

}