from typing import List, Optional, Dict, Any
from pydantic import BaseModel

class ASTDeterministicRule(BaseModel):
    id: str
    name: str
    description: str
    field: str
    operator: str
    expectedValue: str
    applicantValue: str
    result: str  # PASS, FAIL, FLAGGED, MISSING_DOC
    sourceDocument: str
    sourcePage: str
    sourceSection: str
    evidenceDocument: Optional[str] = None
    reason: str
    verifiedDate: str = "Live Evaluated"

class BenefitSlab(BaseModel):
    slab: str
    rate: str
    maxBenefit: str

class BenefitCalculation(BaseModel):
    formula: str
    eligibleAmount: int
    subsidyRate: str
    estimatedBenefit: int
    slabs: List[BenefitSlab] = []
    changeFactors: List[str] = []

class ApplicationStep(BaseModel):
    step: int
    title: str
    desc: str
    action: str
    done: bool = False
    active: bool = False

class Scheme(BaseModel):
    id: str
    name: str
    department: str
    level: str
    category: str
    description: str
    benefit: str
    benefitCalculation: Optional[BenefitCalculation] = None
    status: str = "Eligible"  # Eligible, Ineligible, Potentially Eligible, Manual Review
    confidence: str = "High (100% verified)"
    evidenceCompleteness: str = "All Rules Verified"
    relevanceScore: int = 95
    lastVerified: str = "Live Synchronized"
    requiredDocsCount: int = 4
    uploadedDocsCount: int = 4
    missingDocsCount: int = 0
    applicationMode: str = "Online via Official Portal"
    portalUrl: str
    rules: List[ASTDeterministicRule] = []
    applicationSteps: List[ApplicationStep] = []
