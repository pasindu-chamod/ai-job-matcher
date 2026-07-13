package com.jobmatcher.gateway.repository;

import com.jobmatcher.gateway.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, String> {
    List<Application> findByUserId(String userId);
}