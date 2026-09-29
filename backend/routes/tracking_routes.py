from fastapi import APIRouter, HTTPException
from backend.data.store import store
from backend.models.tracking import ApplyRequest

router = APIRouter(prefix="/api/tracking", tags=["Application Tracking & PFMS"])

@router.get("")
def list_tracking_applications():
    return store.get_tracking()

@router.post("/apply")
def submit_application_dossier(req: ApplyRequest):
    schemes = store.get_schemes()
    scheme = next((s for s in schemes if s["id"] == req.schemeId), None)
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")

    new_app = store.add_tracking(scheme)
    return {
        "status": "success",
        "message": f"Application registered under reference {new_app['referenceNumber']}",
        "application": new_app
    }

@router.post("/{app_id}/advance")
def advance_application_stage(app_id: str):
    advanced = store.advance_tracking_stage(app_id)
    if not advanced:
        raise HTTPException(status_code=404, detail="Tracking application not found")
    return {
        "status": "success",
        "message": f"Application {advanced['referenceNumber']} advanced to {advanced['currentStatus']}",
        "application": advanced
    }

@router.get("/{app_id}/receipt")
def get_official_receipt(app_id: str):
    apps = store.get_tracking()
    app = next((a for a in apps if a["id"] == app_id), None)
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    applicant = store.get_applicant()
    receipt_text = f"""
================================================================================
DEVKO CITIZEN SCHEME APPLICATION ACKNOWLEDGEMENT SLIP
================================================================================
Application Reference: {app['referenceNumber']}
Submission Date: {app['submittedDate']}
Current Nodal Status: {app['currentStatus']}

APPLICANT: {applicant.get('name')}
ENTERPRISE: {applicant.get('businessName')}
UDYAM ID: {applicant.get('udyamNumber')}
STATE: {applicant.get('state')} ({applicant.get('district')})

SCHEME: {app['schemeName']}
BENEFIT ASSISTANCE: {app['estimatedBenefit']}
PFMS GATEWAY: Registered / Active

================================================================================
This official acknowledgement proves registration with state authorities.
================================================================================
"""
    return {
        "referenceNumber": app["referenceNumber"],
        "receiptSlip": receipt_text.strip()
    }
