package com.jobmatcher.gateway.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "resumes")
public class Resume {

    @Id
    private String id;

    @PrePersist
    public void ensureId() {
        if (this.id == null || this.id.trim().isEmpty()) {
            this.id = java.util.UUID.randomUUID().toString();
        }
    }

    private String userId;
    private String fileName;
    private String fileUrl;

    @ElementCollection
    @CollectionTable(name = "resume_skills", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "skill")
    private List<String> skills = new ArrayList<>();

    private Integer experienceYears;
    private String education;

    @Column(columnDefinition = "TEXT")
    private String summary;

    private Integer atsScore;

    @ElementCollection
    @CollectionTable(name = "resume_strengths", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "strength")
    private List<String> strengths = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "resume_suggestions", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "suggestion")
    private List<String> suggestions = new ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public Integer getAtsScore() { return atsScore; }
    public void setAtsScore(Integer atsScore) { this.atsScore = atsScore; }

    public List<String> getStrengths() { return strengths; }
    public void setStrengths(List<String> strengths) { this.strengths = strengths; }

    public List<String> getSuggestions() { return suggestions; }
    public void setSuggestions(List<String> suggestions) { this.suggestions = suggestions; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}