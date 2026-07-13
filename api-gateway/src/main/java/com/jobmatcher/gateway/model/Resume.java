package com.jobmatcher.gateway.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "resumes")
@Data
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String userId;
    private String fileName;
    private String fileUrl;
    private Integer experienceYears;
    private String education;
    @Column(columnDefinition = "TEXT")
    private String summary;
    private Integer atsScore;
    @ElementCollection
    @CollectionTable(name = "resume_skills", joinColumns = @JoinColumn(name = "resume_id"))
    private List<String> skills;
    @ElementCollection
    @CollectionTable(name = "resume_strengths", joinColumns = @JoinColumn(name = "resume_id"))
    private List<String> strengths;
    @ElementCollection
    @CollectionTable(name = "resume_suggestions", joinColumns = @JoinColumn(name = "resume_id"))
    private List<String> suggestions;
    private LocalDateTime createdAt = LocalDateTime.now();
}