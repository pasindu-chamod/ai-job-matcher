from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import math

app = FastAPI(title="Matching Service")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

JOBS = [
    {
        "id": "j1",
        "title": "Senior Full Stack AI Engineer",
        "company": "TechCorp Innovation Lab",
        "description": "Architect and build scalable web applications integrated with OpenAI & LLM APIs. Python, React, Docker, Cloud.",
        "requiredSkills": ["Python", "React", "Java", "Spring", "SQL", "Docker"],
        "location": "San Francisco, CA (Hybrid)",
        "salary": "$140,000 - $185,000",
        "type": "Full-time"
    },
    {
        "id": "j2",
        "title": "Lead Frontend Architect",
        "company": "StartupXYZ Tech",
        "description": "Create high-performance user interfaces with React 18, TypeScript, TailwindCSS, and state management.",
        "requiredSkills": ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"],
        "location": "Remote",
        "salary": "$110,000 - $150,000",
        "type": "Full-time"
    },
    {
        "id": "j3",
        "title": "Machine Learning & NLP Specialist",
        "company": "AI Innovations Global",
        "description": "Train transformer models, develop recommendation engines, and implement TF-IDF / vector search pipelines.",
        "requiredSkills": ["Python", "TensorFlow", "PyTorch", "Machine Learning", "SQL", "NLP"],
        "location": "New York, NY",
        "salary": "$150,000 - $195,000",
        "type": "Full-time"
    },
    {
        "id": "j4",
        "title": "Cloud DevOps & Security Specialist",
        "company": "CloudTech Platform",
        "description": "Manage CI/CD pipelines, Kubernetes clusters, Docker runtime, and AWS cloud security infrastructure.",
        "requiredSkills": ["Docker", "Kubernetes", "AWS", "Linux", "Git", "CI/CD", "Terraform"],
        "location": "Remote",
        "salary": "$120,000 - $160,000",
        "type": "Full-time"
    },
    {
        "id": "j5",
        "title": "Backend Microservices Developer",
        "company": "WebSolutions Enterprise",
        "description": "Design high-throughput Java Spring Boot APIs, Redis cache systems, and MySQL databases.",
        "requiredSkills": ["Java", "Spring", "SQL", "MySQL", "Redis", "REST API", "Microservices"],
        "location": "Austin, TX",
        "salary": "$115,000 - $155,000",
        "type": "Full-time"
    },
    {
        "id": "j6",
        "title": "Python Data Engineer",
        "company": "Data Corp Analytics",
        "description": "Build robust data ingestion pipelines, SQL data warehouses, and ETL flows for machine learning models.",
        "requiredSkills": ["Python", "Django", "Flask", "SQL", "PostgreSQL", "Pandas", "NumPy"],
        "location": "Seattle, WA",
        "salary": "$125,000 - $165,000",
        "type": "Full-time"
    }
]

# User Skills Store (persisted in memory)
USER_SKILLS: Dict[str, List[str]] = {}

class UserSkillsModel(BaseModel):
    userId: str
    skills: List[str]

@app.get("/")
def root():
    return {"service": "Matching", "status": "running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/user_skills")
def save_user_skills(data: UserSkillsModel):
    """Store or update candidate skills parsed from resume"""
    USER_SKILLS[data.userId] = [s.strip() for s in data.skills if s.strip()]
    return {"status": "success", "userId": data.userId, "skills": USER_SKILLS[data.userId]}

@app.get("/matches/{user_id}")
def get_matches(user_id: str):
    skills = USER_SKILLS.get(user_id, [])

    # If no skills registered for this user, return empty match list
    if not skills:
        return []

    user_skills_lower = set(s.lower() for s in skills)
    results = []

    for job in JOBS:
        req_skills = job["requiredSkills"]
        matched = [s for s in req_skills if s.lower() in user_skills_lower]
        missing = [s for s in req_skills if s.lower() not in user_skills_lower]

        if not req_skills:
            score = 0
        else:
            # Overlap score + extra weight for multi-skill matches
            raw_score = (len(matched) / len(req_skills)) * 100
            score = min(int(round(raw_score)), 100)

        # Only include jobs that have at least some match or 30%+ relevance
        if score >= 30:
            if score >= 85:
                reason = f"Exceptional match! You possess {len(matched)} key skills for this position."
            elif score >= 60:
                reason = f"Strong fit. Learning {missing[0] if missing else 'additional tools'} will maximize compatibility."
            else:
                reason = f"Good potential. Consider gaining experience in {', '.join(missing[:2])}."

            results.append({
                "job": job,
                "matchScore": score,
                "matchedSkills": matched,
                "missingSkills": missing,
                "reasoning": reason
            })

    # Sort results by highest match score
    results.sort(key=lambda x: x["matchScore"], reverse=True)
    return results