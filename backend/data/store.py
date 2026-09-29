import json
import os
import random
from datetime import datetime
from backend.data.mock_data import (
    INITIAL_APPLICANT,
    MOCK_SCHEMES,
    MOCK_DOCUMENTS,
    MOCK_REVIEW_CASES,
    MOCK_TRACKING_APPLICATIONS
)
from backend.services.rule_engine import evaluate_all_schemes

STORAGE_FILE = os.path.join(os.path.dirname(__file__), "storage.json")

class DataStore:
    def __init__(self):
        self.applicant = dict(INITIAL_APPLICANT)
        self.documents = [dict(d) for d in MOCK_DOCUMENTS]
        self.review_cases = [dict(c) for c in MOCK_REVIEW_CASES]
        self.tracking_applications = [dict(t) for t in MOCK_TRACKING_APPLICATIONS]
        self.bookmarked_schemes = ["msme-interest-support"]
        self.load_from_disk()

    def load_from_disk(self):
        if os.path.exists(STORAGE_FILE):
            try:
                with open(STORAGE_FILE, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self.applicant = data.get("applicant", self.applicant)
                    self.documents = data.get("documents", self.documents)
                    self.review_cases = data.get("review_cases", self.review_cases)
                    self.tracking_applications = data.get("tracking_applications", self.tracking_applications)
                    self.bookmarked_schemes = data.get("bookmarked_schemes", self.bookmarked_schemes)
            except Exception as e:
                print(f"Error loading storage: {e}")

    def save_to_disk(self):
        try:
            with open(STORAGE_FILE, "w", encoding="utf-8") as f:
                json.dump({
                    "applicant": self.applicant,
                    "documents": self.documents,
                    "review_cases": self.review_cases,
                    "tracking_applications": self.tracking_applications,
                    "bookmarked_schemes": self.bookmarked_schemes
                }, f, indent=2)
        except Exception as e:
            print(f"Error saving storage: {e}")

    def get_applicant(self) -> dict:
        return self.applicant

    def update_applicant(self, fields: dict) -> dict:
        for k, v in fields.items():
            if v is not None:
                self.applicant[k] = v
        self.save_to_disk()
        return self.applicant

    def get_documents(self) -> list:
        return self.documents

    def add_document(self, doc: dict) -> dict:
        self.documents.insert(0, doc)
        self.save_to_disk()
        return doc

    def get_review_cases(self) -> list:
        return self.review_cases

    def update_review_case(self, case_id: str, status: str, resolution_note: str = "") -> dict:
        updated = None
        for c in self.review_cases:
            if c.get("id") == case_id:
                c["status"] = status
                c["resolutionNote"] = resolution_note
                c.setdefault("auditTrail", []).append({
                    "timestamp": "Just now",
                    "actor": "Officer Reviewer",
                    "action": f'Updated status to "{status}". Note: {resolution_note}'
                })
                updated = c
                break
        self.save_to_disk()
        return updated

    def get_tracking(self) -> list:
        return self.tracking_applications

    def add_tracking(self, scheme: dict) -> dict:
        ref_num = f"DEVKO-MH-2026-{random.randint(10000, 99999)}"
        new_app = {
            "id": f"app-{int(datetime.now().timestamp())}",
            "referenceNumber": ref_num,
            "schemeId": scheme.get("id", ""),
            "schemeName": scheme.get("name", ""),
            "department": scheme.get("department", "Ministry of MSME / State Industries"),
            "submittedDate": datetime.now().strftime("%d %b %Y"),
            "estimatedBenefit": scheme.get("benefit", "₹75,000"),
            "currentStatus": "Under Department Review",
            "statusExplanation": "Dossier compiled with verified statutory credentials. Awaiting nodal processing.",
            "timeline": [
                {"step": "Dossier Submitted", "date": "Today", "status": "completed", "desc": "Package dispatched to nodal gateway."},
                {"step": "Department Review", "date": "In Progress", "status": "active", "desc": "Nodal officer verifying credentials."},
                {"step": "Field Inspection", "date": "Pending", "status": "pending", "desc": "District industries center spot check."},
                {"step": "Sanction Order", "date": "Pending", "status": "pending", "desc": "Official sanction order issue."},
                {"step": "Bank Disbursal", "date": "Pending", "status": "pending", "desc": "PFMS direct benefit credit."}
            ]
        }
        self.tracking_applications.insert(0, new_app)
        self.save_to_disk()
        return new_app

    def advance_tracking_stage(self, app_id: str) -> dict:
        target = None
        for app in self.tracking_applications:
            if app.get("id") == app_id:
                timeline = app.get("timeline", [])
                active_idx = next((i for i, t in enumerate(timeline) if t.get("status") == "active"), -1)
                if active_idx != -1 and active_idx < len(timeline) - 1:
                    timeline[active_idx]["status"] = "completed"
                    timeline[active_idx]["date"] = "Verified"
                    timeline[active_idx + 1]["status"] = "active"
                    timeline[active_idx + 1]["date"] = "In Progress"
                    next_step = timeline[active_idx + 1]["step"]
                    app["currentStatus"] = f"{next_step} Active"
                    app["statusExplanation"] = f"Milestone advanced. Current stage: {next_step}."
                target = app
                break
        self.save_to_disk()
        return target

    def get_schemes(self) -> list:
        return evaluate_all_schemes(MOCK_SCHEMES, self.applicant, self.documents, self.review_cases)

    def toggle_bookmark(self, scheme_id: str) -> list:
        if scheme_id in self.bookmarked_schemes:
            self.bookmarked_schemes.remove(scheme_id)
        else:
            self.bookmarked_schemes.append(scheme_id)
        self.save_to_disk()
        return self.bookmarked_schemes

    def reset_to_default(self):
        self.applicant = dict(INITIAL_APPLICANT)
        self.documents = [dict(d) for d in MOCK_DOCUMENTS]
        self.review_cases = [dict(c) for c in MOCK_REVIEW_CASES]
        self.tracking_applications = [dict(t) for t in MOCK_TRACKING_APPLICATIONS]
        self.bookmarked_schemes = ["msme-interest-support"]
        self.save_to_disk()

store = DataStore()
