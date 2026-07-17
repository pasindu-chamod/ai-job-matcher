package com.jobmatcher.gateway.controller;

import com.jobmatcher.gateway.service.BlockchainService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/blockchain")
@CrossOrigin(origins = "http://localhost:3000")
public class BlockchainController {

    private final BlockchainService blockchainService;

    public BlockchainController(BlockchainService blockchainService) {
        this.blockchainService = blockchainService;
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifySkill(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(blockchainService.verifySkill(
                request.get("userId"), request.get("skill")
        ));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getUserVerifications(@PathVariable String userId) {
        return ResponseEntity.ok(blockchainService.getUserVerifications(userId));
    }
}