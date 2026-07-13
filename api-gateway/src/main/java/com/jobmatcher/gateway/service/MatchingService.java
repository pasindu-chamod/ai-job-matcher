package com.jobmatcher.gateway.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MatchingService {
    private final WebClient.Builder webClientBuilder;
    @Value("${python.matching.service.url}")
    private String matchingUrl;

    public List<Map> getMatches(String userId) {
        return webClientBuilder.build().get()
                .uri(matchingUrl + "/matches/" + userId)
                .retrieve().bodyToFlux(Map.class).collectList().block();
    }
}