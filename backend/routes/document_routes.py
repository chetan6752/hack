from fastapi import APIRouter
from backend.data.store import store
from backend.models.document import DocumentUploadRequest
from backend.services.ocr_service import process_document_upload

router = APIRouter(prefix="/api/documents", tags=["Documents & OCR Intelligence"])

@router.get("")
def list_documents():
    docs = store.get_documents()
    uploaded_count = len([d for d in docs if d.get("status") != "Missing"])
    return {
        "count": len(docs),
        "uploadedCount": uploaded_count,
        "documents": docs
    }

@router.post("/upload")
def upload_and_process_document(req: DocumentUploadRequest):
    extracted_doc = process_document_upload(
        doc_type=req.docType,
        custom_file_name=req.customFileName,
        category=req.category
    )
    store.add_document(extracted_doc)
    
    # Check if schemes were affected
    updated_schemes = store.get_schemes()
    eligible_count = len([s for s in updated_schemes if s.get("status") == "Eligible"])

    return {
        "status": "success",
        "message": f"Document \"{extracted_doc['name']}\" verified and OCR fields bound.",
        "document": extracted_doc,
        "eligibleSchemesCount": eligible_count
    }

@router.get("/missing")
def list_missing_documents():
    schemes = store.get_schemes()
    missing_docs = []
    
    for s in schemes:
        for r in s.get("rules", []):
            if r.get("result") == "MISSING_DOC":
                missing_docs.append({
                    "schemeId": s.get("id"),
                    "schemeName": s.get("name"),
                    "ruleId": r.get("id"),
                    "document": r.get("evidenceDocument"),
                    "reason": r.get("reason"),
                    "potentialBenefit": s.get("benefit")
                })

    return {
        "missingCount": len(missing_docs),
        "priorityChecklist": missing_docs
    }
