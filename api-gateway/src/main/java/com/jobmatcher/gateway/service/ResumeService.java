package com.jobmatcher.gateway.service;

import com.jobmatcher.gateway.model.Resume;
import com.jobmatcher.gateway.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class ResumeService {

    private final ResumeRepository repo;
    private final WebClient.Builder webClientBuilder;

    @Value("${python.resume.service.url}")
    private String resumeUrl;

    public ResumeService(ResumeRepository repo, WebClient.Builder webClientBuilder) {
        this.repo = repo;
        this.webClientBuilder = webClientBuilder;
    }

    @SuppressWarnings("unchecked")
    public Resume uploadAndAnalyze(MultipartFile file, String userId) {
        try {
            MultipartBodyBuilder builder = new MultipartBodyBuilder();
            
            MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
            if (file.getContentType() != null && !file.getContentType().isEmpty()) {
                try {
                    mediaType = MediaType.parseMediaType(file.getContentType());
                } catch (Exception ignored) {}
            }

            builder.part("file", new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            }).contentType(mediaType);

            if (userId != null && !userId.trim().isEmpty()) {
                builder.part("userId", userId);
            }

            Map<String, Object> result = webClientBuilder.build().post()
                    .uri(resumeUrl + "/analyze")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(BodyInserters.fromMultipartData(builder.build()))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (result == null) {
                throw new RuntimeException("Python resume microservice returned empty result.");
            }

            Resume resume = new Resume();
            resume.setUserId(userId);
            resume.setFileName(file.getOriginalFilename());
            resume.setSkills((List<String>) result.get("skills"));
            
            Number ats = (Number) result.get("atsScore");
            resume.setAtsScore(ats != null ? ats.intValue() : 50);
            
            resume.setStrengths((List<String>) result.get("strengths"));
            resume.setSuggestions((List<String>) result.get("suggestions"));
            resume.setSummary((String) result.get("summary"));
            
            Number exp = (Number) result.get("experienceYears");
            resume.setExperienceYears(exp != null ? exp.intValue() : 0);

            return repo.save(resume);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Resume analysis failed: " + e.getMessage(), e);
        }
    }

    public Resume getByUserId(String userId) {
        return repo.findByUserId(userId).orElse(null);
    }
}