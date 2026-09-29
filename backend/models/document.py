from typing import Dict, Optional, Any
from pydantic import BaseModel

class Document(BaseModel):
    id: str
    name: str
    fileName: str
    category: str
    fileSize: str = "1.8 MB"
    uploadedAt: str = "Just now"
    status: str = "Verified"  # Verified, Needs review, Missing
    expiryDate: Optional[str] = None
    confidence: str = "99.2%"
    sourceRef: str = "Digital Signature & Verification Gateway"
    extractedFields: Dict[str, Any] = {}
    verificationNotes: str = "Statutory document verified and bound to applicant parameter dossier."

class DocumentUploadRequest(BaseModel):
    name: Optional[str] = None
    category: str = "Business"
    docType: str = "CA Turnover Certificate"
    customFileName: Optional[str] = None
