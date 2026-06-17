package com.aim.config;

import com.aim.model.User;
import com.aim.model.enums.Role;
import com.aim.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("-------------------------------------------");
        System.out.println("   MONGODB CONNECTION VERIFICATION");
        System.out.println("-------------------------------------------");

        try {
            long userCount = userRepository.count();
            System.out.println("Current User Count: " + userCount);

            if (userCount == 0) {
                System.out.println("Creating Default Admin User...");
                User admin = new User("Admin", "admin@aim.com", encoder.encode("admin123"));
                admin.setRoles(Collections.singleton(Role.ROLE_ADMIN));
                userRepository.save(admin);
                System.out.println("Admin Created: admin@aim.com / admin123");

                System.out.println("Creating Default Sales User...");
                User sales = new User("Sales", "sales@aim.com", encoder.encode("sales123"));
                sales.setRoles(Collections.singleton(Role.ROLE_SALES));
                userRepository.save(sales);
                System.out.println("Sales Created: sales@aim.com / sales123");
            } else {
                System.out.println("Users already exist. Skipping initialization.");
            }
        } catch (Exception e) {
            System.err.println("ERROR CONNECTING TO MONGODB: " + e.getMessage());
            System.err.println("Please ensure MongoDB is running on localhost:27017");
        }
        System.out.println("-------------------------------------------");
    }
}
