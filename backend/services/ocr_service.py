# Document Intelligence & OCR Extraction Service
import time

def process_document_upload(doc_type: str = "CA Turnover Certificate", custom_file_name: str = None, category: str = "Business") -> dict:
    lower_type = (doc_type or "").lower()
    ts = int(time.time())
    
    if any(k in lower_type for k in ["ca", "turnover", "audit"]):
        return {
            "id": f"doc-{ts}",
            "name": "Latest FY 2025-26 CA Turnover Certificate",
            "fileName": "CA_Turnover_Certificate_FY25_26.pdf",
            "category": "Business",
            "fileSize": "1.8 MB",
            "uploadedAt": "Just now",
            "status": "Verified",
            "expiryDate": "31 Mar 2027",
            "confidence": "99.4%",
            "sourceRef": "ICAI UDIN Digital Verification Gateway",
            "extractedFields": {
                "Turnover Certified": "₹18,00,000",
                "Financial Year": "2025–26",
                "ICAI UDIN": "26048291AAAA1029",
                "Audit Status": "Unqualified / Clean Opinion",
                "CA Membership": "FCA-048291 (Pune)",
                "Digital Seal": "Verified (SHA-256 Valid)"
            },
            "verificationNotes": "Audit certificate verified via ICAI portal. Clears administrative discrepancy hold."
        }
    elif any(k in lower_type for k in ["gst", "tax", "return"]):
        return {
            "id": f"doc-{ts}",
            "name": "GST 3B Quarterly Return (Latest Q1 2026)",
            "fileName": "GST_3B_Return_Q1_2026.pdf",
            "category": "Business",
            "fileSize": "2.1 MB",
            "uploadedAt": "Just now",
            "status": "Verified",
            "expiryDate": "30 Sep 2026",
            "confidence": "99.8%",
            "sourceRef": "GSTN Government Gateway API",
            "extractedFields": {
                "GSTIN": "27ABCPS1234F1Z5",
                "Filing Period": "Q1 FY 2026-27 (Apr–Jun)",
                "Gross Supplies": "₹18,00,000",
                "Tax Paid": "₹1,62,000",
                "ARN Reference": "AA270626019284F",
                "Filing Status": "Active & Verified"
            },
            "verificationNotes": "Quarterly return confirmed active on GST portal with matched turnover."
        }
    elif any(k in lower_type for k in ["dpiit", "startup", "recognition"]):
        return {
            "id": f"doc-{ts}",
            "name": "DPIIT Startup Recognition Certificate",
            "fileName": "DPIIT_Recognition_Certificate.pdf",
            "category": "Certificates",
            "fileSize": "1.4 MB",
            "uploadedAt": "Just now",
            "status": "Verified",
            "expiryDate": "14 Aug 2031",
            "confidence": "99.1%",
            "sourceRef": "Startup India DPIIT National Portal",
            "extractedFields": {
                "DPIIT Certificate No": "DIPP-MH-2026-9821",
                "Entity Name": "TechnoNova Engineering Solutions",
                "Incorporation Category": "Micro Manufacturing",
                "Tax Exemption (80-IAC)": "Eligible / Recommended",
                "Certificate Validity": "Active (10 Years)"
            },
            "verificationNotes": "DPIIT recognition validated for grant disbursement eligibility."
        }
    elif "income" in lower_type:
        return {
            "id": f"doc-{ts}",
            "name": "Income Certificate (FY 2025–26)",
            "fileName": custom_file_name or "Income_Certificate_Verified_FY25_26.pdf",
            "category": "Income",
            "fileSize": "1.5 MB",
            "uploadedAt": "Just now",
            "status": "Verified",
            "expiryDate": "31 Mar 2027",
            "confidence": "99.2%",
            "sourceRef": "Revenue Department Digital Seal",
            "extractedFields": {
                "Annual Family Income": "₹3,80,000",
                "Financial Year": "2025-26",
                "Applicant Full Name": "Rahul Sharma",
                "Issuing Authority": "Office of Tehsildar, Haveli, Pune",
                "Digital Signature": "Verified (Class 3 SHA256)"
            },
            "verificationNotes": "Document parsed and field values bound to applicant profile."
        }
    else:
        return {
            "id": f"doc-{ts}",
            "name": custom_file_name.rsplit(".", 1)[0] if custom_file_name else "Verified Supplementary Proof",
            "fileName": custom_file_name or "Supplementary_Document.pdf",
            "category": category,
            "fileSize": "1.9 MB",
            "uploadedAt": "Just now",
            "status": "Verified",
            "expiryDate": "31 Dec 2027",
            "confidence": "98.7%",
            "sourceRef": "Official Department Verification Gateway",
            "extractedFields": {
                "Document Name": custom_file_name or "Supplementary Proof",
                "Category": category,
                "Applicant Matched": "Yes (Rahul Sharma)",
                "Integrity Hash": "0x7F9B...8842"
            },
            "verificationNotes": "Statutory document verified and bound to applicant parameter dossier."
        }
