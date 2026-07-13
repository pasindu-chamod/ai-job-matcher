package com.jobmatcher.gateway.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String userId;
    private String jobId;
    private String status = "applied";
    private Integer matchScore;
    private LocalDateTime appliedAt = LocalDateTime.now();
}