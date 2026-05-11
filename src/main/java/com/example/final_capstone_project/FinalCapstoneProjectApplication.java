package com.example.final_capstone_project;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.security.autoconfigure.SecurityAutoConfiguration;
//import org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude = { //SecurityAutoConfiguration.class,
						//UserDetailsServiceAutoConfiguration.class
})
public class FinalCapstoneProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalCapstoneProjectApplication.class, args);
	}

}
