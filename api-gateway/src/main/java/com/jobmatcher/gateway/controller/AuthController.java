package com.jobmatcher.gateway.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.jobmatcher.gateway.dto.AuthResponse;
import com.jobmatcher.gateway.dto.LoginRequest;
import com.jobmatcher.gateway.dto.RegisterRequest;
import com.jobmatcher.gateway.dto.UserResponse;
import com.jobmatcher.gateway.model.User;
import com.jobmatcher.gateway.security.JwtUtil;
import com.jobmatcher.gateway.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User user = userService.register(request);
            String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole().name());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new AuthResponse(token, UserResponse.from(user)));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorBody(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            User user = userService.authenticate(request.getEmail(), request.getPassword());
            String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole().name());
            return ResponseEntity.ok(new AuthResponse(token, UserResponse.from(user)));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorBody(e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorBody(e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorBody("Not authenticated"));
        }
        String userId = authentication.getName();
        try {
            User user = userService.getById(userId);
            return ResponseEntity.ok(UserResponse.from(user));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorBody(e.getMessage()));
        }
    }

    private java.util.Map<String, String> errorBody(String message) {
        return java.util.Map.of("message", message);
    }
}