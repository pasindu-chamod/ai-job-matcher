package com.jobmatcher.gateway.repository;

import com.jobmatcher.gateway.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, String> {
    Optional<Resume> findByUserId(String userId);
}