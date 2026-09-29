# Master Seed Data for DevKo Backend

INITIAL_APPLICANT = {
    "id": "APP-2026-8941",
    "name": "Rahul Sharma",
    "age": 29,
    "dob": "1997-08-14",
    "gender": "Male",
    "state": "Maharashtra",
    "district": "Pune",
    "address": "Flat 402, Green Meadows, Hinjewadi Phase 1, Pune, MH 411057",
    "phone": "+91 98230 44912",
    "email": "rahul.sharma@technovacraft.in",
    "occupation": "Small Business Owner",
    "annualIncome": 380000,
    "familyIncome": 380000,
    "employmentStatus": "Self-Employed",
    "existingLoans": "None in default (₹1.2L machinery loan current)",
    "bankAccountStatus": "Active (HDFC Bank Ltd, Hinjewadi Branch)",
    "businessName": "TechnoNova Engineering Solutions",
    "businessType": "Proprietorship",
    "businessRegistration": "Registered (Shop Act & MSME)",
    "udyamNumber": "UDYAM-MH-12-0048291",
    "msmeRegistered": True,
    "turnover": 1800000,
    "businessAge": "3 Years 4 Months",
    "sector": "Light Engineering & Precision Fabrication",
    "landOwnership": "Commercial Leased (Industrial Gala, Pune)",
    "studentStatus": "No",
    "category": "General",
    "previousBenefits": "PM Mudra Shishu (Repaid in full, 2024)",
    "profileCompleteness": 85
}

MOCK_SCHEMES = [
    {
        "id": "msme-interest-support",
        "name": "MSME Interest Subvention & Support Scheme",
        "department": "Ministry of Micro, Small and Medium Enterprises",
        "level": "Central Government",
        "category": "Credit & Subsidies",
        "description": "Provides a 2% per annum interest subvention on fresh or incremental working capital and term loans for eligible micro and small enterprises with active Udyam registration.",
        "benefit": "₹75,000",
        "benefitCalculation": {
            "formula": "Eligible Loan Amount × Subvention Rate (2%) × 1 Year Tenure",
            "eligibleAmount": 3750000,
            "subsidyRate": "2.0%",
            "estimatedBenefit": 75000,
            "slabs": [
                {"slab": "Loans up to ₹10 Lakhs", "rate": "2.0% p.a.", "maxBenefit": "₹20,000"},
                {"slab": "Loans ₹10L to ₹50 Lakhs", "rate": "2.0% p.a.", "maxBenefit": "₹1,00,000"},
                {"slab": "Loans > ₹50 Lakhs", "rate": "1.5% p.a.", "maxBenefit": "₹1,50,000 cap"}
            ],
            "changeFactors": [
                "Final sanctioned working capital limit by participating scheduled bank",
                "Prompt loan repayment record without NPA classification",
                "Annual budget allocation cap from Ministry of MSME",
                "Validation of current FY GST returns matching reported turnover"
            ]
        },
        "status": "Eligible",
        "confidence": "High (100% verified)",
        "evidenceCompleteness": "4 of 4 Rules Verified",
        "relevanceScore": 98,
        "lastVerified": "24 Sep 2026",
        "requiredDocsCount": 4,
        "uploadedDocsCount": 4,
        "missingDocsCount": 0,
        "applicationMode": "Online via MSME Champions Portal",
        "portalUrl": "https://champions.gov.in/msme-subvention-demo",
        "rules": [
            {
                "id": "RULE-MSME-01",
                "name": "Enterprise Classification Rule",
                "description": "Applicant enterprise must be categorized as Micro or Small under MSMED Act 2020.",
                "field": "turnover",
                "operator": "<=",
                "expectedValue": "Turnover <= ₹5,00,00,000 (Micro)",
                "applicantValue": "₹18,00,000 (Micro Category)",
                "result": "PASS",
                "sourceDocument": "Udyam Registration Guidelines 2020",
                "sourcePage": "Page 4",
                "sourceSection": "Section 2.1 (Classification Criteria)",
                "evidenceDocument": "Udyam_Registration_Certificate.pdf",
                "reason": "Applicant's annual turnover of ₹18.0L is well within the ₹5 Crore threshold for Micro enterprises.",
                "verifiedDate": "24 Sep 2026"
            },
            {
                "id": "RULE-MSME-02",
                "name": "Valid Udyam Registration",
                "description": "Valid and active Udyam registration number linked with PAN and Aadhaar.",
                "field": "udyamNumber",
                "operator": "EXISTS & ACTIVE",
                "expectedValue": "Active Udyam Certificate",
                "applicantValue": "UDYAM-MH-12-0048291 (Active)",
                "result": "PASS",
                "sourceDocument": "MSME Notification S.O. 2119(E)",
                "sourcePage": "Page 2",
                "sourceSection": "Clause 3",
                "evidenceDocument": "Udyam_Registration_Certificate.pdf",
                "reason": "Certificate verified against national MSME registry with active status and matched PAN.",
                "verifiedDate": "24 Sep 2026"
            },
            {
                "id": "RULE-MSME-03",
                "name": "Annual Family Income Ceiling",
                "description": "Applicant personal/family income should not exceed ₹5,00,000 for prioritized subsidy bracket.",
                "field": "annualIncome",
                "operator": "<=",
                "expectedValue": "<= ₹5,00,00,000",
                "applicantValue": "₹3,80,000",
                "result": "PASS",
                "sourceDocument": "Scheme Operational Guidelines",
                "sourcePage": "Page 14",
                "sourceSection": "Section 4.2 (Income Limits)",
                "evidenceDocument": "Income_Certificate_Verified.pdf",
                "reason": "Certified income of ₹3.8L from Tehsildar is within eligible boundary.",
                "verifiedDate": "24 Sep 2026"
            },
            {
                "id": "RULE-MSME-04",
                "name": "State Domicile and Operational Base",
                "description": "Enterprise physical manufacturing or service unit must be located within operational states.",
                "field": "state",
                "operator": "IN_APPROVED_STATES",
                "expectedValue": "All Indian States & UTs (Central Scope)",
                "applicantValue": "Maharashtra (Pune District)",
                "result": "PASS",
                "sourceDocument": "Operational Guidelines Annexure B",
                "sourcePage": "Page 28",
                "sourceSection": "National Rollout Scope",
                "evidenceDocument": "Electricity_Bill_Commercial_Gala.pdf",
                "reason": "Physical premises address matches Udyam registered industrial gala in Hinjewadi, Pune.",
                "verifiedDate": "24 Sep 2026"
            }
        ],
        "applicationSteps": [
            {"step": 1, "title": "Check Eligibility", "desc": "Deterministic evaluation of turnover and Udyam active status.", "action": "Completed", "done": True, "active": False},
            {"step": 2, "title": "Prepare Certified Dossier", "desc": "Compile pre-verified PDF bundle.", "action": "Ready", "done": True, "active": False},
            {"step": 3, "title": "Register on MSME Champions Portal", "desc": "Authenticate using Udyam ID credentials.", "action": "Open Portal", "done": False, "active": True},
            {"step": 4, "title": "Submit Working Capital Claim", "desc": "Provide sanction letter and HDFC loan account details.", "action": "Pending", "done": False, "active": False}
        ]
    },
    {
        "id": "working-capital-subsidy",
        "name": "Small Business Working Capital Subsidy",
        "department": "Department of Industries, Maharashtra",
        "level": "State & Central Joint",
        "category": "Working Capital Subsidy",
        "description": "5% interest subvention on short-term working capital credit for registered light engineering micro-units in designated industrial belts.",
        "benefit": "₹1,20,000",
        "benefitCalculation": {
            "formula": "Working Capital Limit × 5% × 12 Months",
            "eligibleAmount": 2400000,
            "subsidyRate": "5.0%",
            "estimatedBenefit": 120000,
            "slabs": [
                {"slab": "Micro units in Zone B/C", "rate": "5.0% p.a.", "maxBenefit": "₹1,20,000"},
                {"slab": "Small units in Zone A", "rate": "3.5% p.a.", "maxBenefit": "₹80,000"}
            ],
            "changeFactors": ["Prompt repayment", "Valid CA turnover certificate for current FY"]
        },
        "status": "Manual Review",
        "confidence": "Requires Review (Turnover certificate FY 2025-26 discrepancy)",
        "evidenceCompleteness": "3 of 4 Rules Verified",
        "relevanceScore": 92,
        "lastVerified": "22 Sep 2026",
        "requiredDocsCount": 4,
        "uploadedDocsCount": 3,
        "missingDocsCount": 1,
        "applicationMode": "Online via MahaSwayam / DIC Portal",
        "portalUrl": "https://mahabms.gov.in/working-capital-subvention",
        "rules": [
            {
                "id": "RULE-WCS-01",
                "name": "State Industrial Belt Requirement",
                "description": "Unit must be located in Maharashtra Zone B or C industrial zone.",
                "field": "state",
                "operator": "EQUALS",
                "expectedValue": "Maharashtra",
                "applicantValue": "Maharashtra (Pune MIDC belt)",
                "result": "PASS",
                "sourceDocument": "Maharashtra Industrial Policy 2024",
                "sourcePage": "Page 11",
                "sourceSection": "Clause 5.3",
                "evidenceDocument": "Shop_Act_License.pdf",
                "reason": "Address verified in Hinjewadi industrial zone.",
                "verifiedDate": "22 Sep 2026"
            },
            {
                "id": "RULE-WCS-02",
                "name": "Audited Annual Turnover Proof",
                "description": "Audited CA turnover certificate for FY 2025-26 must match GST returns.",
                "field": "turnover",
                "operator": "CERTIFIED_MATCH",
                "expectedValue": "CA Certificate FY 25-26 matching GST 3B",
                "applicantValue": "Mismatched / Prior FY Certificate Uploaded",
                "result": "FLAGGED",
                "sourceDocument": "DIC Operational Guidelines",
                "sourcePage": "Page 7",
                "sourceSection": "Audit Criteria",
                "evidenceDocument": "CA_Turnover_Certificate_FY25_26.pdf",
                "reason": "Uploaded certificate is from FY 2024-25. Upload FY 2025-26 certificate to clear hold.",
                "verifiedDate": "22 Sep 2026"
            }
        ],
        "applicationSteps": [
            {"step": 1, "title": "Resolve Audit Certificate", "desc": "Upload FY 2025-26 CA certificate.", "action": "Action Required", "done": False, "active": True},
            {"step": 2, "title": "Submit Nodal Form", "desc": "Fill DIC Form 3 on MahaSwayam.", "action": "Pending", "done": False, "active": False}
        ]
    },
    {
        "id": "startup-india-seed-fund",
        "name": "Startup India Seed Fund Scheme",
        "department": "Department for Promotion of Industry and Internal Trade (DPIIT)",
        "level": "Central Government",
        "category": "Early Stage Equity & Seed Grant",
        "description": "Financial assistance to startups for proof of concept, prototype development, product trials, and market entry via approved incubators.",
        "benefit": "₹2,00,000",
        "benefitCalculation": {
            "formula": "Milestone-based prototype validation grant",
            "eligibleAmount": 2000000,
            "subsidyRate": "Grant (Non-dilutive)",
            "estimatedBenefit": 200000,
            "slabs": [
                {"slab": "Proof of Concept Grant", "rate": "100% Grant", "maxBenefit": "₹2,00,000"},
                {"slab": "Commercialization Loan", "rate": "Debenture/Loan", "maxBenefit": "₹5,00,000"}
            ],
            "changeFactors": ["Incubator committee selection", "DPIIT startup recognition certificate"]
        },
        "status": "Potentially Eligible",
        "confidence": "Medium (Pending DPIIT Certificate & GST 3B)",
        "evidenceCompleteness": "2 of 4 Rules Verified",
        "relevanceScore": 88,
        "lastVerified": "20 Sep 2026",
        "requiredDocsCount": 4,
        "uploadedDocsCount": 2,
        "missingDocsCount": 2,
        "applicationMode": "Online via Startup India Portal",
        "portalUrl": "https://seedfund.startupindia.gov.in",
        "rules": [
            {
                "id": "RULE-SEED-01",
                "name": "DPIIT Recognition",
                "description": "Startup must hold a valid DPIIT recognition number.",
                "field": "category",
                "operator": "EXISTS",
                "expectedValue": "Valid DPIIT Certificate",
                "applicantValue": "Document Missing",
                "result": "MISSING_DOC",
                "sourceDocument": "SISFS Guidelines 2021",
                "sourcePage": "Page 3",
                "sourceSection": "Eligibility 3.1",
                "evidenceDocument": "DPIIT_Recognition_Certificate.pdf",
                "reason": "DPIIT recognition certificate required.",
                "verifiedDate": "20 Sep 2026"
            }
        ],
        "applicationSteps": [
            {"step": 1, "title": "Upload DPIIT Certificate", "desc": "Provide statutory recognition proof.", "action": "Upload", "done": False, "active": True}
        ]
    }
]

MOCK_DOCUMENTS = [
    {
        "id": "doc-01",
        "name": "Udyam Registration Certificate",
        "fileName": "Udyam_Registration_Certificate.pdf",
        "category": "Business",
        "fileSize": "1.4 MB",
        "uploadedAt": "18 Sep 2026",
        "status": "Verified",
        "expiryDate": "Lifetime Valid",
        "confidence": "99.8%",
        "sourceRef": "National MSME Portal API Verified",
        "extractedFields": {
            "Udyam Registration Number": "UDYAM-MH-12-0048291",
            "Enterprise Name": "TechnoNova Engineering Solutions",
            "Organization Type": "Proprietorship",
            "Major Activity": "Manufacturing",
            "Enterprise Category": "Micro",
            "Date of Commencement": "12 May 2023",
            "NIC Code 2 Digit": "25 (Fabricated Metal Products)"
        },
        "verificationNotes": "Direct API validation with Ministry of MSME database. Digital signature verified."
    },
    {
        "id": "doc-02",
        "name": "Aadhaar Card (Masked e-Aadhaar)",
        "fileName": "Aadhaar_Masked_Rahul_Sharma.pdf",
        "category": "Identity",
        "fileSize": "840 KB",
        "uploadedAt": "18 Sep 2026",
        "status": "Verified",
        "expiryDate": "Permanent",
        "confidence": "99.9%",
        "sourceRef": "UIDAI Offline XML Hash Verification",
        "extractedFields": {
            "Applicant Full Name": "Rahul Sharma",
            "Gender": "Male",
            "Date of Birth": "14-08-1997",
            "Masked Aadhaar Number": "XXXX-XXXX-9842",
            "State of Domicile": "Maharashtra",
            "PIN Code": "411057"
        },
        "verificationNotes": "UIDAI digital signature verified. Demographic name matches tax and bank records."
    },
    {
        "id": "doc-03",
        "name": "Income Certificate (Tehsildar)",
        "fileName": "Income_Certificate_FY25_26.pdf",
        "category": "Income",
        "fileSize": "1.8 MB",
        "uploadedAt": "19 Sep 2026",
        "status": "Verified",
        "expiryDate": "31 Mar 2027",
        "confidence": "99.2%",
        "sourceRef": "Revenue Department Digital Seal",
        "extractedFields": {
            "Annual Family Income": "₹3,80,000",
            "Financial Year": "2025-26",
            "Issuing Authority": "Office of Tehsildar, Haveli, Pune",
            "Certificate Barcode ID": "MH/REV/2026/094821"
        },
        "verificationNotes": "Verified against state revenue portal Aaple Sarkar repository."
    }
]

MOCK_REVIEW_CASES = [
    {
        "id": "CASE-2026-081",
        "schemeId": "working-capital-subsidy",
        "schemeName": "Small Business Working Capital Subsidy",
        "applicantName": "Rahul Sharma (TechnoNova)",
        "reason": "Turnover certificate is from prior fiscal year (FY 2024-25 instead of FY 2025-26).",
        "priority": "High",
        "status": "Pending",
        "assignedOfficer": "S. K. Deshmukh (DIC Pune)",
        "applicantEvidence": {
            "documentName": "CA_Turnover_Certificate_FY24_25.pdf",
            "uploadedDate": "19 Sep 2026",
            "extractedValue": "Turnover ₹15,40,000 for FY 2024-25",
            "selfReportedTurnover": "₹18,00,000 for FY 2025-26",
            "discrepancyNote": "Certificate year lags reported financial year by 1 cycle."
        },
        "officialRule": {
            "ruleId": "RULE-WCS-02",
            "requirement": "Statutory audit certificate must cover immediately preceding complete financial year (FY 2025-26).",
            "policySource": "Maharashtra Industrial Policy 2024 Operational Guidelines Page 7",
            "actionNeeded": "Upload revised CA turnover audit with active ICAI UDIN for FY 2025-26."
        },
        "auditTrail": [
            {"timestamp": "22 Sep 2026, 11:30 AM", "actor": "Automated Rule Engine", "action": "Rule RULE-WCS-02 evaluated to FLAGGED."},
            {"timestamp": "22 Sep 2026, 02:15 PM", "actor": "DIC Case Router", "action": "Assigned to S. K. Deshmukh for review."}
        ]
    }
]

MOCK_TRACKING_APPLICATIONS = [
    {
        "id": "app-01",
        "referenceNumber": "DEVKO-MH-2026-89412",
        "schemeId": "msme-interest-support",
        "schemeName": "MSME Interest Subvention & Support Scheme",
        "department": "Ministry of Micro, Small and Medium Enterprises",
        "submittedDate": "24 Sep 2026",
        "estimatedBenefit": "₹75,000",
        "currentStatus": "Under Department Review",
        "statusExplanation": "Dossier compiled with pre-verified Udyam, income, and bank credentials. Awaiting nodal approval.",
        "timeline": [
            {"step": "Dossier Submitted", "date": "24 Sep 2026", "status": "completed", "desc": "Application package dispatched to nodal gateway."},
            {"step": "Department Review", "date": "In Progress", "status": "active", "desc": "Nodal officer verifying enterprise credentials."},
            {"step": "Field Inspection", "date": "Pending", "status": "pending", "desc": "District industries center spot check."},
            {"step": "Sanction Order", "date": "Pending", "status": "pending", "desc": "Official sanction document issue."},
            {"step": "Bank Disbursal", "date": "Pending", "status": "pending", "desc": "PFMS direct benefit credit."}
        ]
    }
]

MOCK_RAG_QUERIES = [
    {
        "question": "What is the maximum turnover threshold for MSME interest subsidy eligibility?",
        "cosineSimilarity": 0.964,
        "retrievedSource": "MSME Gazette Notification S.O. 2119(E), Section 2.1 (Classification Guidelines)",
        "policyChunk": "An enterprise shall be classified as a Micro enterprise where the investment in plant and machinery does not exceed one crore rupees and turnover does not exceed five crore rupees. Micro enterprises with active Udyam registration qualify for priority interest subvention up to 2.0% per annum on fresh working capital facilities.",
        "matchedRule": "RULE-MSME-01 (Enterprise Classification Rule)",
        "deterministicResult": "PASS (Turnover: ₹18,00,000 <= ₹5,00,00,000)",
        "applicantEvidenceSummary": "Udyam registration verified turnover: ₹18.0L. Applicant qualifies under Micro enterprise statutory ceiling.",
        "generatedAnswer": "Under MSME Gazette Notification S.O. 2119(E), the statutory turnover ceiling for Micro enterprises is ₹5,00,00,000 (Five Crores). Since your verified turnover is ₹18,00,000, you satisfy this criteria deterministically."
    },
    {
        "question": "Can a registered sole proprietorship apply for the Startup India Seed Fund?",
        "cosineSimilarity": 0.948,
        "retrievedSource": "Startup India Seed Fund Scheme Guidelines (SISFS 2021), Clause 3.1",
        "policyChunk": "To be eligible for incubation seed grants, an entity must hold DPIIT Startup Recognition. While entities may initiate development as proprietorships or partnerships, conversion to a Private Limited Company or LLP registered not more than 2 years prior is mandatory for final grant disbursal.",
        "matchedRule": "RULE-SEED-01 (Entity Legal Structure & Recognition)",
        "deterministicResult": "PENDING (Current structure: Sole Proprietorship; DPIIT cert needed)",
        "applicantEvidenceSummary": "Applicant entity is registered as Proprietorship with active Shop Act & MSME. Requires DPIIT recognition and corporate transition prior to grant sanction.",
        "generatedAnswer": "You can prepare and submit your application as an active MSME proprietor, but DPIIT recognition and conversion to an eligible corporate structure is required before the non-dilutive seed grant (up to ₹20 Lakhs) is disbursed."
    },
    {
        "question": "What documents are required to clear administrative review on working capital subsidies?",
        "cosineSimilarity": 0.952,
        "retrievedSource": "Maharashtra Industrial Policy 2024 Working Capital Subvention Manual, Page 7",
        "policyChunk": "Applications flagged for turnover discrepancies must provide an updated Chartered Accountant audit certificate bearing a verified ICAI Unique Document Identification Number (UDIN) for the immediately preceding completed financial year.",
        "matchedRule": "RULE-WCS-02 (Audited Annual Turnover Proof)",
        "deterministicResult": "ACTION_REQUIRED (Upload FY 2025-26 CA Audit with UDIN)",
        "applicantEvidenceSummary": "Uploaded audit certificate corresponds to FY 2024-25. Uploading FY 2025-26 CA Certificate with valid UDIN clears the review hold.",
        "generatedAnswer": "To clear the administrative review on Small Business Working Capital Subsidy, upload the latest FY 2025-26 CA Turnover Certificate with an active ICAI UDIN. This will immediately resolve the discrepancy and unlock your ₹1,20,000 benefit."
    }
]
