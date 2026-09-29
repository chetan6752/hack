from fastapi import APIRouter
from backend.data.store import store
from backend.models.applicant import ApplicantUpdate

router = APIRouter(prefix="/api/applicant", tags=["Applicant Profile"])

@router.get("")
def get_applicant_profile():
    return store.get_applicant()

@router.put("")
def update_applicant_profile(update: ApplicantUpdate):
    updated = store.update_applicant(update.model_dump(exclude_unset=True))
    return {
        "status": "success",
        "message": "Applicant profile updated and rule engine re-evaluated",
        "data": updated
    }

@router.post("/export")
def export_applicant_dossier():
    applicant = store.get_applicant()
    return {
        "filename": f"Applicant_Dossier_{applicant.get('id', 'APP')}.json",
        "dossier": applicant
    }
