package com.jobmatcher.gateway.dto;

import java.time.LocalDateTime;

import com.jobmatcher.gateway.model.User;

public class UserResponse {

    private String id;
    private String fullName;
    private String email;
    private String role;
    private Boolean active;
    private LocalDateTime createdAt;

    public static UserResponse from(User user) {
        UserResponse dto = new UserResponse();
        dto.id = user.getId();
        dto.fullName = user.getFullName();
        dto.email = user.getEmail();
        dto.role = user.getRole().name();
        dto.active = user.getActive();
        dto.createdAt = user.getCreatedAt();
        return dto;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}