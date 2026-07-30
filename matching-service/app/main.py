from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional

app = FastAPI(title="Matching Service")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Real-world authentic tech jobs with realistic titles, companies, locations & salaries
JOBS = [
    {
        "id": "j1",
        "title": "Senior Software Engineer (Full Stack)",
        "company": "Cognizant Technology Solutions",
        "description": "Design and build web applications using React, Node.js, and Python API services. Responsible for database architecture and RESTful integration.",
        "requiredSkills": ["React", "Node", "Python", "SQL", "Git", "REST API"],
        "location": "Remote / Colombo",
        "salary": "$95,000 - $135,000",
        "type": "Full-time"
    },
    {
        "id": "j2",
        "title": "Frontend React Developer",
        "company": "Virtusa Corporation",
        "description": "Build modern responsive user interfaces with React 18, TypeScript, HTML5, and CSS3. Collaborate with UI/UX designers and backend teams.",
        "requiredSkills": ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"],
        "location": "Hybrid - Colombo",
        "salary": "$75,000 - $105,000",
        "type": "Full-time"
    },
    {
        "id": "j3",
        "title": "Python Data & ML Engineer",
        "company": "Sysco LABS",
        "description": "Develop data processing pipelines, train machine learning models with TensorFlow and Pandas, and integrate analytics microservices.",
        "requiredSkills": ["Python", "Machine Learning", "TensorFlow", "Pandas", "SQL", "NumPy"],
        "location": "Colombo, Sri Lanka",
        "salary": "$110,000 - $150,000",
        "type": "Full-time"
    },
    {
        "id": "j4",
        "title": "DevOps & Cloud Engineer",
        "company": "WSO2",
        "description": "Maintain CI/CD pipelines, Docker container runtime, Kubernetes cluster management, and AWS cloud infrastructure deployment.",
        "requiredSkills": ["Docker", "Kubernetes", "AWS", "Linux", "Git", "CI/CD"],
        "location": "Remote",
        "salary": "$100,000 - $140,000",
        "type": "Full-time"
    },
    {
        "id": "j5",
        "title": "Java Spring Boot Backend Developer",
        "company": "IFS R&D",
        "description": "Develop scalable enterprise backend microservices using Java 17, Spring Boot, MySQL, and Redis caching.",
        "requiredSkills": ["Java", "Spring Boot", "SQL", "MySQL", "REST API", "Microservices"],
        "location": "Colombo, Sri Lanka",
        "salary": "$85,000 - $120,000",
        "type": "Full-time"
    },
    {
        "id": "j6",
        "title": "Full Stack Python & React Engineer",
        "company": "99x Technology",
        "description": "Build cloud-native SaaS solutions using Python FastAPI backend and React TypeScript frontend with automated testing.",
        "requiredSkills": ["Python", "FastAPI", "React", "TypeScript", "SQL", "Docker"],
        "location": "Hybrid",
        "salary": "$90,000 - $130,000",
        "type": "Full-time"
    }
]

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
    USER_SKILLS[data.userId] = [s.strip() for s in data.skills if s.strip()]
    return {"status": "success", "userId": data.userId, "skills": USER_SKILLS[data.userId]}

@app.get("/matches/{user_id}")
def get_matches(user_id: str):
    skills = USER_SKILLS.get(user_id, [])

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
            raw_score = (len(matched) / len(req_skills)) * 100
            score = min(int(round(raw_score)), 100)

        if score >= 25:
            if score >= 80:
                reason = f"Excellent fit! Your resume matches {len(matched)} key required skills for this position."
            elif score >= 50:
                reason = f"Good match. Learning {missing[0] if missing else 'additional tools'} will strengthen your application."
            else:
                reason = f"Potential match. Consider developing skills in {', '.join(missing[:2])}."

            results.append({
                "job": job,
                "matchScore": score,
                "matchedSkills": matched,
                "missingSkills": missing,
                "reasoning": reason
            })

    results.sort(key=lambda x: x["matchScore"], reverse=True)
    return results