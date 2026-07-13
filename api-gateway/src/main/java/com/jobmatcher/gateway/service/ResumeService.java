package com.jobmatcher.gateway.service;

import com.jobmatcher.gateway.model.Resume;
import com.jobmatcher.gateway.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class ResumeService {
    private final ResumeRepository repo;
    private final WebClient.Builder webClientBuilder;
    @Value("${python.resume.service.url}")
    private String resumeUrl;

    public Resume uploadAndAnalyze(MultipartFile file, String userId) {
        try {
            MultipartBodyBuilder builder = new MultipartBodyBuilder();
            builder.part("file", new ByteArrayResource(file.getBytes()) {
                @Override public String getFilename() { return file.getOriginalFilename(); }
            }).contentType(MediaType.APPLICATION_PDF);

            Map result = webClientBuilder.build().post()
                    .uri(resumeUrl + "/analyze")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(BodyInserters.fromMultipartData(builder.build()))
                    .retrieve().bodyToMono(Map.class).block();

            Resume resume = new Resume();
            resume.setUserId(userId);
            resume.setFileName(file.getOriginalFilename());
            resume.setSkills((List<String>) result.get("skills"));
            resume.setAtsScore((Integer) result.get("atsScore"));
            resume.setStrengths((List<String>) result.get("strengths"));
            resume.setSuggestions((List<String>) result.get("suggestions"));
            resume.setSummary((String) result.get("summary"));
            return repo.save(resume);
        } catch (Exception e) {
            throw new RuntimeException("Failed to analyze resume: " + e.getMessage());
        }
    }

    public Resume getByUserId(String userId) {
        return repo.findByUserId(userId).orElse(null);
    }
}