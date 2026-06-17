package com.aim.controller;

import com.aim.model.Lead;
import com.aim.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/leads")
public class LeadController {

    @Autowired
    LeadRepository leadRepository;

    @PostMapping
    public ResponseEntity<Lead> createLead(@RequestBody Lead lead) {
        // Node.js code just takes name, email, message.
        // We can use a DTO or just the Entity if we trust input or sanitize it.
        // Using Entity directly for simplicity as per requirements to replicate quickly.
        // But we should ensure createdAt is set. Constructor sets it, but if JSON has it, it might overwrite.
        // Let's reset it to now() or ignore input's createdAt.
        lead.setCreatedAt(LocalDateTime.now());
        
        Lead savedLead = leadRepository.save(lead);
        return ResponseEntity.status(201).body(savedLead);
    }

    @GetMapping
    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }
}
