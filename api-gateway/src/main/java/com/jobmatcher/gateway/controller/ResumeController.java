package com.jobmatcher.gateway.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jobmatcher.gateway.model.Resume;
import com.jobmatcher.gateway.service.ResumeService;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "userId", defaultValue = "user123") String userId) {
        try {
            Resume resume = resumeService.uploadAndAnalyze(file, userId);
            return ResponseEntity.ok(resume);
        } catch (Exception e) {
            String msg = e.getMessage() != null ? e.getMessage() : "Resume analysis failed.";
            return ResponseEntity.status(500).body(Map.of("message", msg));
        }
    }
}