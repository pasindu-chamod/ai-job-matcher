from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2, docx, io, re
from typing import List

app = FastAPI(title="Resume Service")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

SKILLS = ["python","java","javascript","typescript","react","angular","vue","node","express",
          "spring","django","flask","sql","mongodb","postgresql","mysql","aws","azure",
          "docker","kubernetes","git","html","css","tailwind","machine learning","tensorflow","pytorch"]

def extract_text(content: bytes, filename: str) -> str:
    try:
        if filename.endswith('.pdf'):
            reader = PyPDF2.PdfReader(io.BytesIO(content))
            return "".join(page.extract_text() or "" for page in reader.pages)
        elif filename.endswith('.docx'):
            doc = docx.Document(io.BytesIO(content))
            return "\n".join(p.text for p in doc.paragraphs)
    except Exception as e:
        raise HTTPException(400, str(e))
    raise HTTPException(400, "Unsupported format")

@app.get("/")
def root():
    return {"service": "Resume Analysis", "status": "running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    content = await file.read()
    text = extract_text(content, file.filename or "")
    text_lower = text.lower()

    skills = list(set(s.title() for s in SKILLS if s in text_lower))
    score = min(50 + len(skills) * 5 + (10 if "experience" in text_lower else 0), 100)

    years = 0
    m = re.search(r'(\d+)\s*years?', text_lower)
    if m: years = int(m.group(1))

    return {
        "skills": skills,
        "atsScore": score,
        "strengths": ["Strong technical skills", "Clear experience section", "Good skill diversity"],
        "suggestions": ["Add more metrics", "Use action verbs", "Include project links"],
        "summary": text[:500],
        "experienceYears": years
    }