from typing import List, Optional
from pydantic import BaseModel

class TimelineItem(BaseModel):
    step: str
    date: str
    status: str  # completed, active, pending
    desc: str

class TrackingApplication(BaseModel):
    id: str
    referenceNumber: str
    schemeId: str
    schemeName: str
    department: str
    submittedDate: str
    estimatedBenefit: str
    currentStatus: str
    statusExplanation: str
    timeline: List[TimelineItem] = []

class ApplyRequest(BaseModel):
    schemeId: str

class ReviewCase(BaseModel):
    id: str
    schemeId: str
    schemeName: str
    applicantName: str
    reason: str
    priority: str
    status: str  # Pending, In Review, Resolved, Documents Requested
    assignedOfficer: str
    applicantEvidence: dict
    officialRule: dict
    auditTrail: List[dict] = []

class AdjudicationRequest(BaseModel):
    status: str  # Resolved, Documents Requested, In Review
    resolutionNote: str = "Officer administrative verification recorded."
