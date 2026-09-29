from typing import Optional, List
from pydantic import BaseModel

class RagQueryRequest(BaseModel):
    question: str
    top_k: int = 3

class RagQueryResponse(BaseModel):
    question: str
    cosineSimilarity: float
    retrievedSource: str
    policyChunk: str
    matchedRule: str
    deterministicResult: str
    applicantEvidenceSummary: str
    generatedAnswer: str
    isGrounded: bool = True
