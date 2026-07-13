package com.jobmatcher.gateway.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "jobs")
@Data
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String title;
    private String company;
    @Column(columnDefinition = "TEXT")
    private String description;
    @ElementCollection
    @CollectionTable(name = "job_required_skills", joinColumns = @JoinColumn(name = "job_id"))
    private List<String> requiredSkills;
    private String location;
    private String salary;
    private String type;
    private Boolean isActive = true;
    private LocalDateTime postedAt = LocalDateTime.now();
}