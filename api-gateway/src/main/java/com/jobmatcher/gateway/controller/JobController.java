package com.jobmatcher.gateway.controller;

import com.jobmatcher.gateway.model.Job;
import com.jobmatcher.gateway.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable String id) {
        Job job = jobService.getJobById(id);
        return job != null ? ResponseEntity.ok(job) : ResponseEntity.notFound().build();
    }
}