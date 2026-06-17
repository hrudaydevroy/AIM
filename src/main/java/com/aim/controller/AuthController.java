package com.aim.controller;

import com.aim.model.Student;
import com.aim.model.User;
import com.aim.payload.request.LoginRequest;
import com.aim.payload.request.SignupRequest;
import com.aim.payload.response.JwtResponse;
import com.aim.payload.response.MessageResponse;
import com.aim.repository.UserRepository;
import com.aim.repository.StudentRepository;
import com.aim.security.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.aim.model.enums.Role;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

        @Autowired
        AuthenticationManager authenticationManager;

        @Autowired
        UserRepository userRepository;

        @Autowired
        StudentRepository studentRepository; // 🔥 ADD THIS

        @Autowired
        PasswordEncoder encoder;

        @Autowired
        JwtUtils jwtUtils;

        // ================= SALES LOGIN =================
        @PostMapping("/login")
        public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

                Authentication authentication = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                loginRequest.getEmail(),
                                                loginRequest.getPassword()));

                SecurityContextHolder.getContext().setAuthentication(authentication);

                String jwt = jwtUtils.generateJwtToken(authentication);

                org.springframework.security.core.userdetails.User userDetails = (org.springframework.security.core.userdetails.User) authentication
                                .getPrincipal();

                List<String> roleList = userDetails.getAuthorities()
                                .stream()
                                .map(item -> item.getAuthority())
                                .collect(Collectors.toList());

                return ResponseEntity.ok(
                                new JwtResponse(jwt, null, userDetails.getUsername(), userDetails.getUsername(),
                                                roleList));
        }

        // ================= REGISTER SALES =================
        @PostMapping("/register")
        public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {

                if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                        return ResponseEntity.badRequest()
                                        .body(new MessageResponse("Error: Email already used"));
                }

                User user = new User(
                                signUpRequest.getName(),
                                signUpRequest.getEmail(),
                                encoder.encode(signUpRequest.getPassword()));

                Set<Role> roles = new HashSet<>();
                roles.add(Role.ROLE_SALES); // 🔥 SALES ROLE

                user.setRoles(roles);
                userRepository.save(user);

                Authentication authentication = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                signUpRequest.getEmail(),
                                                signUpRequest.getPassword()));

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = jwtUtils.generateJwtToken(authentication);

                org.springframework.security.core.userdetails.User userDetails = (org.springframework.security.core.userdetails.User) authentication
                                .getPrincipal();

                List<String> roleList = userDetails.getAuthorities()
                                .stream()
                                .map(item -> item.getAuthority())
                                .collect(Collectors.toList());

                return ResponseEntity.ok(
                                new JwtResponse(jwt, null, userDetails.getUsername(), userDetails.getUsername(),
                                                roleList));
        }

        // ================= 🎓 STUDENT LOGIN (🔥 NEW API) =================
        @PostMapping("/student-login")
        public ResponseEntity<?> studentLogin(@RequestBody Student req) {

                Student student = studentRepository
                                .findByUsername(req.getUsername())
                                .orElse(null);

                if (student == null) {
                        return ResponseEntity.badRequest().body("Student Not Found");
                }

                if (!student.getPassword().equals(req.getPassword())) {
                        return ResponseEntity.badRequest().body("Wrong Password");
                }

                // 🔥 JWT create using username
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                                student.getUsername(),
                                null,
                                new java.util.ArrayList<>());

                String jwt = jwtUtils.generateJwtToken(authentication);

                return ResponseEntity.ok(new JwtResponse(
                                jwt,
                                student.getId(),
                                student.getUsername(),
                                student.getUsername(),
                                java.util.List.of("ROLE_STUDENT")));
        }
}
