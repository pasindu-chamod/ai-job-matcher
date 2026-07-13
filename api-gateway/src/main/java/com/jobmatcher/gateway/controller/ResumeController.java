package com.jobmatcher.gateway.controller;

import com.jobmatcher.gateway.model.Resume;
import com.jobmatcher.gateway.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
public class ResumeController {
    private final ResumeService service;

    @PostMapping("/upload")
    public ResponseEntity<Resume> upload(@RequestParam("file") MultipartFile file,
                                          @RequestParam(value = "userId", defaultValue = "user123") String userId) {
        return ResponseEntity.ok(service.uploadAndAnalyze(file, userId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Resume> get(@PathVariable String userId) {
        Resume r = service.getByUserId(userId);
        return r != null ? ResponseEntity.ok(r) : ResponseEntity.notFound().build();
    }
}