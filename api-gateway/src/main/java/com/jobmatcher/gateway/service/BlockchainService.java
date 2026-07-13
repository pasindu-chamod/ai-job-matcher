package com.jobmatcher.gateway.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BlockchainService {
    private final WebClient.Builder webClientBuilder;
    @Value("${python.blockchain.service.url}")
    private String blockchainUrl;

    public Map verifySkill(String userId, String skill) {
        return webClientBuilder.build().post()
                .uri(blockchainUrl + "/verify")
                .bodyValue(Map.of("userId", userId, "skill", skill))
                .retrieve().bodyToMono(Map.class).block();
    }

    public List<Map> getUserVerifications(String userId) {
        return webClientBuilder.build().get()
                .uri(blockchainUrl + "/verifications/" + userId)
                .retrieve().bodyToFlux(Map.class).collectList().block();
    }
}