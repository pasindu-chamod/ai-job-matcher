from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List

app = FastAPI(title="Matching Service")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

JOBS = [
    {"id":"j1","title":"Senior Software Engineer","company":"TechCorp","description":"Build scalable apps","requiredSkills":["Java","Spring","SQL","Docker","AWS"],"location":"San Francisco","salary":"$120k-$160k","type":"Full-time"},
    {"id":"j2","title":"Frontend Developer","company":"StartupXYZ","description":"Create beautiful UIs","requiredSkills":["React","TypeScript","JavaScript","HTML","CSS"],"location":"Remote","salary":"$90k-$130k","type":"Full-time"},
    {"id":"j3","title":"ML Engineer","company":"AI Innovations","description":"Develop ML models","requiredSkills":["Python","TensorFlow","PyTorch","SQL"],"location":"New York","salary":"$140k-$180k","type":"Full-time"},
    {"id":"j4","title":"Full Stack Developer","company":"WebSolutions","description":"Frontend and backend","requiredSkills":["React","Node","Express","MongoDB","JavaScript"],"location":"Austin","salary":"$100k-$140k","type":"Full-time"},
    {"id":"j5","title":"Python Developer","company":"Data Corp","description":"Data pipelines","requiredSkills":["Python","Django","Flask","SQL"],"location":"Seattle","salary":"$110k-$150k","type":"Full-time"},
]

USER_SKILLS = {"user123": ["Python","Java","React","JavaScript","SQL","Docker"]}

@app.get("/")
def root():
    return {"service": "Matching", "status": "running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/matches/{user_id}")
def get_matches(user_id: str):
    skills = USER_SKILLS.get(user_id, [])
    if not skills:
        return []

    results = []
    for job in JOBS:
        matched = [s for s in job["requiredSkills"] if s.lower() in [x.lower() for x in skills]]
        missing = [s for s in job["requiredSkills"] if s.lower() not in [x.lower() for x in skills]]
        score = int((len(matched) / len(job["requiredSkills"])) * 100) if job["requiredSkills"] else 0

        if score >= 80:
            reason = f"Excellent! You have {len(matched)} matching skills."
        elif score >= 50:
            reason = f"Good match. Learn {missing[0] if missing else 'more skills'} to improve."
        else:
            reason = f"Develop {', '.join(missing[:2])} for a stronger application."

        results.append({
            "job": job, "matchScore": score,
            "matchedSkills": matched, "missingSkills": missing, "reasoning": reason
        })

    results.sort(key=lambda x: x["matchScore"], reverse=True)
    return results