from fastapi import APIRouter, HTTPException
from backend.data.store import store
from backend.models.tracking import AdjudicationRequest

router = APIRouter(prefix="/api/review-cases", tags=["Manual Review & Adjudication"])

@router.get("")
def list_review_cases():
    cases = store.get_review_cases()
    return {
        "count": len(cases),
        "pendingCount": len([c for c in cases if c.get("status") == "Pending"]),
        "cases": cases
    }

@router.post("/{case_id}/adjudicate")
def adjudicate_case(case_id: str, req: AdjudicationRequest):
    updated = store.update_review_case(case_id, req.status, req.resolutionNote)
    if not updated:
        raise HTTPException(status_code=404, detail="Review case not found")
    
    # Check if scheme status unlocked
    schemes = store.get_schemes()
    eligible_count = len([s for s in schemes if s.get("status") == "Eligible"])

    return {
        "status": "success",
        "message": f"Case {case_id} adjudicated to \"{req.status}\"",
        "case": updated,
        "eligibleSchemesCount": eligible_count
    }
