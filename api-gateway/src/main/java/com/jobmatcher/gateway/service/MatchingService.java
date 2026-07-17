package com.jobmatcher.gateway.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class MatchingService {

    private final WebClient.Builder webClientBuilder;

    @Value("${python.matching.service.url}")
    private String matchingUrl;

    public MatchingService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    public List<Map<String, Object>> getMatches(String userId) {
        return webClientBuilder.build().get()
                .uri(matchingUrl + "/matches/" + userId)
                .retrieve()
                .bodyToFlux(new ParameterizedTypeReference<Map<String, Object>>() {})
                .collectList()
                .block();
    }
}