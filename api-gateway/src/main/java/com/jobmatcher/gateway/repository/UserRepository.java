package com.jobmatcher.gateway.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobmatcher.gateway.model.User;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}