package com.jobmatcher.gateway.service;

import com.jobmatcher.gateway.model.Job;
import com.jobmatcher.gateway.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository repo;
    public List<Job> getAll() { return repo.findByIsActiveTrue(); }
    public Job getById(String id) { return repo.findById(id).orElse(null); }
}