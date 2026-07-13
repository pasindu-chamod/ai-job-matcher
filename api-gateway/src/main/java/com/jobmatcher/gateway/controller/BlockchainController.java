package com.jobmatcher.gateway.controller;

import com.jobmatcher.gateway.service.BlockchainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/blockchain")
@RequiredArgsConstructor
public class BlockchainController {
    private final BlockchainService service;

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody Map<String, String> req) {
        return ResponseEntity.ok(service.verifySkill(req.get("userId"), req.get("skill")));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getVerifications(@PathVariable String userId) {
        return ResponseEntity.ok(service.getUserVerifications(userId));
    }
}