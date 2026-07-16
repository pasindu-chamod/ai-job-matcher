package com.jobmatcher.gateway.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jobmatcher.gateway.model.Job;
import com.jobmatcher.gateway.repository.JobRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(String id) {
        return jobRepository.findById(id).orElse(null);
    }
}