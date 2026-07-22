package com.jobmatcher.gateway.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jobmatcher.gateway.model.Job;
import com.jobmatcher.gateway.repository.JobRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminJobController {

    private final JobRepository jobRepository;

    public AdminJobController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@Valid @RequestBody Job job) {
        job.setId(null);
        return ResponseEntity.ok(jobRepository.save(job));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable String id, @RequestBody Job job) {
        return jobRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(job.getTitle());
                    existing.setCompany(job.getCompany());
                    existing.setDescription(job.getDescription());
                    existing.setLocation(job.getLocation());
                    existing.setSalary(job.getSalary());
                    existing.setType(job.getType());
                    existing.setIsActive(job.getIsActive());
                    existing.setRequiredSkills(job.getRequiredSkills());
                    return ResponseEntity.ok(jobRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable String id) {
        if (!jobRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        jobRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}