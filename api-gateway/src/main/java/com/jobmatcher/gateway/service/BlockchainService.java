package com.jobmatcher.gateway.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class BlockchainService {

    private final WebClient.Builder webClientBuilder;
    private final String blockchainServiceUrl;

    public BlockchainService(WebClient.Builder webClientBuilder,
                             @Value("${python.blockchain.service.url}") String blockchainServiceUrl) {
        this.webClientBuilder = webClientBuilder;
        this.blockchainServiceUrl = blockchainServiceUrl;
    }

    public Map<String, Object> verifySkill(String userId, String skill) {
        return webClientBuilder.build()
                .post()
                .uri(blockchainServiceUrl + "/verify")
                .bodyValue(Map.of("userId", userId, "skill", skill))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .block();
    }

    public List<Map<String, Object>> getUserVerifications(String userId) {
        return webClientBuilder.build()
                .get()
                .uri(blockchainServiceUrl + "/verifications/" + userId)
                .retrieve()
                .bodyToFlux(new ParameterizedTypeReference<Map<String, Object>>() {})
                .collectList()
                .block();
    }
}