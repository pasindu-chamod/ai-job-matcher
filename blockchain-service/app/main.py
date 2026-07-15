from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import hashlib, json
from datetime import datetime
from typing import List, Dict

app = FastAPI(title="Blockchain Service")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

chain: List[Dict] = [{"index": 0, "timestamp": datetime.now().isoformat(), "data": {"type": "genesis"}, "previous_hash": "0", "hash": "genesis"}]
verifications: Dict[str, List[Dict]] = {}

def add_block(data: Dict) -> Dict:
    prev = chain[-1]
    block_str = json.dumps({"index": len(chain), "data": data, "previous_hash": prev["hash"]}, sort_keys=True)
    block_hash = hashlib.sha256(block_str.encode()).hexdigest()
    block = {"index": len(chain), "timestamp": datetime.now().isoformat(), "data": data, "previous_hash": prev["hash"], "hash": block_hash}
    chain.append(block)
    return block

class VerifyRequest(BaseModel):
    userId: str
    skill: str

@app.get("/")
def root():
    return {"service": "Blockchain", "status": "running", "blocks": len(chain)}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/verify")
def verify(req: VerifyRequest):
    block = add_block({"type": "verification", "userId": req.userId, "skill": req.skill})
    result = {"skill": req.skill, "verified": True, "blockchainHash": block["hash"], "issuedAt": block["timestamp"]}
    if req.userId not in verifications:
        verifications[req.userId] = []
    verifications[req.userId].append(result)
    return result

@app.get("/verifications/{user_id}")
def get_verifications(user_id: str):
    return verifications.get(user_id, [])

@app.get("/blockchain")
def get_chain():
    return {"chain": chain, "length": len(chain)}