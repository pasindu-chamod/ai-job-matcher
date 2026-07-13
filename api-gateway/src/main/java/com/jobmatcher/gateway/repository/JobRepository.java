package com.jobmatcher.gateway.repository;

import com.jobmatcher.gateway.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, String> {
    List<Job> findByIsActiveTrue();
}