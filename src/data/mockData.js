// Master Mock Data Model for Financial Policy Discovery, Eligibility & Application Assistant
// Consistent with specifications in PROMPT 00 through PROMPT 25

export const initialApplicant = {
  id: "APP-2026-8941",
  name: "Rahul Sharma",
  age: 29,
  dob: "1997-08-14",
  gender: "Male",
  state: "Maharashtra",
  district: "Pune",
  address: "Flat 402, Green Meadows, Hinjewadi Phase 1, Pune, MH 411057",
  phone: "+91 98230 44912",
  email: "rahul.sharma@technovacraft.in",
  occupation: "Small Business Owner",
  annualIncome: 380000,
  familyIncome: 380000,
  employmentStatus: "Self-Employed",
  existingLoans: "None in default (₹1.2L machinery loan current)",
  bankAccountStatus: "Active (HDFC Bank Ltd, Hinjewadi Branch)",
  
  // Business profile
  businessName: "TechnoNova Engineering Solutions",
  businessType: "Proprietorship",
  businessRegistration: "Registered (Shop Act & MSME)",
  udyamNumber: "UDYAM-MH-12-0048291",
  msmeRegistered: true,
  turnover: 1800000,
  businessAge: "3 Years 4 Months",
  sector: "Light Engineering & Precision Fabrication",
  
  // Other eligibility parameters
  landOwnership: "Commercial Leased (Industrial Gala, Pune)",
  studentStatus: "No",
  category: "General",
  previousBenefits: "PM Mudra Shishu (Repaid in full, 2024)",
  profileCompleteness: 82,
};

export const mockSchemes = [
  {
    id: "msme-interest-support",
    name: "MSME Interest Subvention & Support Scheme",
    department: "Ministry of Micro, Small and Medium Enterprises",
    level: "Central Government",
    category: "Credit & Subsidies",
    description: "Provides a 2% per annum interest subvention on fresh or incremental working capital and term loans for eligible micro and small enterprises with active Udyam registration.",
    benefit: "₹75,000",
    benefitCalculation: {
      formula: "Eligible Loan Amount × Subvention Rate (2%) × 1 Year Tenure",
      eligibleAmount: 3750000,
      subsidyRate: "2.0%",
      estimatedBenefit: 75000,
      slabs: [
        { slab: "Loans up to ₹10 Lakhs", rate: "2.0% p.a.", maxBenefit: "₹20,000" },
        { slab: "Loans ₹10L to ₹50 Lakhs", rate: "2.0% p.a.", maxBenefit: "₹1,00,000" },
        { slab: "Loans > ₹50 Lakhs", rate: "1.5% p.a.", maxBenefit: "₹1,50,000 cap" },
      ],
      changeFactors: [
        "Final sanctioned working capital limit by participating scheduled bank",
        "Prompt loan repayment record without NPA classification",
        "Annual budget allocation cap from Ministry of MSME",
        "Validation of current FY GST returns matching reported turnover"
      ]
    },
    status: "Eligible", // Eligible, Ineligible, Potentially Eligible, Manual Review
    confidence: "High (100% verified)",
    evidenceCompleteness: "4 of 4 Rules Verified",
    relevanceScore: 98,
    lastVerified: "24 Sep 2026",
    requiredDocsCount: 4,
    uploadedDocsCount: 4,
    missingDocsCount: 0,
    applicationMode: "Online via MSME Champions Portal",
    portalUrl: "https://champions.gov.in/msme-subvention-demo",
    rules: [
      {
        id: "RULE-MSME-01",
        name: "Enterprise Classification Rule",
        description: "Applicant enterprise must be categorized as Micro or Small under MSMED Act 2020.",
        field: "turnover",
        operator: "<=",
        expectedValue: "Turnover <= ₹5,00,00,000 (Micro)",
        applicantValue: "₹18,00,000 (Micro Category)",
        result: "PASS",
        sourceDocument: "Udyam Registration Guidelines 2020",
        sourcePage: "Page 4",
        sourceSection: "Section 2.1 (Classification Criteria)",
        evidenceDocument: "Udyam_Registration_Certificate.pdf",
        reason: "Applicant's annual turnover of ₹18.0L is well within the ₹5 Crore threshold for Micro enterprises.",
        verifiedDate: "24 Sep 2026"
      },
      {
        id: "RULE-MSME-02",
        name: "Valid Udyam Registration",
        description: "Valid and active Udyam registration number linked with PAN and Aadhaar.",
        field: "udyamNumber",
        operator: "EXISTS & ACTIVE",
        expectedValue: "Active Udyam Certificate",
        applicantValue: "UDYAM-MH-12-0048291 (Active)",
        result: "PASS",
        sourceDocument: "MSME Notification S.O. 2119(E)",
        sourcePage: "Page 2",
        sourceSection: "Clause 3",
        evidenceDocument: "Udyam_Registration_Certificate.pdf",
        reason: "Certificate verified against national MSME registry with active status and matched PAN.",
        verifiedDate: "24 Sep 2026"
      },
      {
        id: "RULE-MSME-03",
        name: "Annual Family Income Ceiling",
        description: "Applicant personal/family income should not exceed ₹5,00,000 for prioritized subsidy bracket.",
        field: "annualIncome",
        operator: "<=",
        expectedValue: "<= ₹5,00,000",
        applicantValue: "₹3,80,000",
        result: "PASS",
        sourceDocument: "Scheme Operational Guidelines",
        sourcePage: "Page 14",
        sourceSection: "Section 4.2 (Income Limits)",
        evidenceDocument: "Income_Certificate_FY25_26.pdf",
        reason: "₹3.8L is below the ₹5L maximum ceiling verified from Tehsildar Income Certificate.",
        verifiedDate: "24 Sep 2026"
      },
      {
        id: "RULE-MSME-04",
        name: "Active Commercial Bank Account",
        description: "Applicant must hold an active commercial current/savings bank account with KYC compliance.",
        field: "bankAccountStatus",
        operator: "EQUALS",
        expectedValue: "Active Commercial Account",
        applicantValue: "HDFC Bank (Active)",
        result: "PASS",
        sourceDocument: "DBT Direct Transfer Framework",
        sourcePage: "Page 6",
        sourceSection: "Section 1.4",
        evidenceDocument: "Bank_Statement_6M.pdf",
        reason: "Bank statement confirms verified IFSC, active operating status, and Direct Benefit Transfer readiness.",
        verifiedDate: "24 Sep 2026"
      }
    ],
    requiredDocuments: [
      { name: "Udyam Registration Certificate", status: "Verified", isMandatory: true },
      { name: "Income Certificate (FY 2025-26)", status: "Verified", isMandatory: true },
      { name: "PAN Card", status: "Verified", isMandatory: true },
      { name: "Bank Account Statement (Last 6 Months)", status: "Verified", isMandatory: true }
    ],
    applicationSteps: [
      { step: 1, title: "Check Eligibility & Pre-fill", desc: "Automated engine checks verified records against MSME policy rules.", done: true },
      { step: 2, title: "Prepare Certified Documents", desc: "Ensure Udyam certificate and latest income certificate are digitally signed.", done: true },
      { step: 3, title: "Register on MSME Champions Portal", desc: "Login with Udyam Registration number and mobile OTP.", done: false, active: true },
      { step: 4, title: "Select Lending Bank Branch", desc: "Identify your scheduled bank branch where working capital loan is active.", done: false },
      { step: 5, title: "Upload Extracted Dossier", desc: "Attach verified document bundle generated by this assistant.", done: false },
      { step: 6, title: "Submit & Save Acknowledgement", desc: "Receive official reference token (e.g., MSME-SUB-2026-XXXX).", done: false },
      { step: 7, title: "Bank Verification & Approval", desc: "Bank manager verifies claims within 14 working days.", done: false },
      { step: 8, title: "Subvention Credit Disbursement", desc: "Interest subvention credited directly into your loan account quarterly.", done: false }
    ]
  },
  {
    id: "women-entrepreneur-fund",
    name: "Women Entrepreneur Assistance & Growth Scheme",
    department: "Ministry of Women & Child Development",
    level: "Central Government",
    category: "Grants & Subsidies",
    description: "Specialized financial grant program designed to support women-led micro enterprises and female individual proprietors in scaling manufacturing and services businesses.",
    benefit: "₹1,50,000",
    benefitCalculation: {
      formula: "Fixed One-Time Capital Grant + 50% Technology Reimbursement",
      eligibleAmount: 150000,
      subsidyRate: "100% Grant",
      estimatedBenefit: 150000,
      slabs: [
        { slab: "Micro Enterprises (>51% female ownership)", rate: "Flat ₹1.5L", maxBenefit: "₹1,50,000" }
      ],
      changeFactors: [
        "Must have minimum 51% female shareholding or sole female proprietorship"
      ]
    },
    status: "Ineligible",
    confidence: "Deterministic (Rule failed)",
    evidenceCompleteness: "Rule 01 failed definitively",
    relevanceScore: 42,
    lastVerified: "20 Sep 2026",
    requiredDocsCount: 5,
    uploadedDocsCount: 3,
    missingDocsCount: 2,
    applicationMode: "Online National Portal",
    portalUrl: "https://wcd.nic.in/women-business-grant-demo",
    rules: [
      {
        id: "RULE-WEF-01",
        name: "Gender / Ownership Mandate",
        description: "Primary applicant or >=51% enterprise owner must be female.",
        field: "gender",
        operator: "EQUALS",
        expectedValue: "Female",
        applicantValue: "Male",
        result: "FAIL",
        sourceDocument: "WEAS Scheme Charter 2024",
        sourcePage: "Page 3",
        sourceSection: "Section 1.2 (Target Beneficiaries)",
        evidenceDocument: "Aadhaar_Card.pdf / Profile",
        reason: "Applicant gender is registered as Male. The scheme strictly requires sole proprietorship or majority female ownership.",
        verifiedDate: "20 Sep 2026"
      },
      {
        id: "RULE-WEF-02",
        name: "Minimum Enterprise Vintage",
        description: "Business should have operated continuously for at least 1 year.",
        field: "businessAge",
        operator: ">=",
        expectedValue: ">= 1 Year",
        applicantValue: "3 Years 4 Months",
        result: "PASS",
        sourceDocument: "WEAS Scheme Charter 2024",
        sourcePage: "Page 5",
        sourceSection: "Section 2.4",
        evidenceDocument: "Udyam_Registration_Certificate.pdf",
        reason: "Applicant business operating age of 3+ years satisfies the vintage threshold.",
        verifiedDate: "20 Sep 2026"
      }
    ],
    requiredDocuments: [
      { name: "Female Ownership Proof / Aadhaar", status: "Invalid", isMandatory: true },
      { name: "Udyam Registration Certificate", status: "Verified", isMandatory: true },
      { name: "Bank Account Statement", status: "Verified", isMandatory: true }
    ],
    applicationSteps: [
      { step: 1, title: "Eligibility Assessment", desc: "Evaluation of ownership and legal constitution.", done: false }
    ]
  },
  {
    id: "working-capital-subsidy",
    name: "Small Business Working Capital Support Program",
    department: "Ministry of Commerce and Industry & State Directorate",
    level: "State & Central Joint",
    category: "Working Capital Subsidy",
    description: "Working capital relief and margin money subsidy for manufacturing and light engineering MSMEs experiencing raw material cost inflation.",
    benefit: "₹1,20,000",
    benefitCalculation: {
      formula: "15% of Certified Annual Turnover (capped at ₹1,20,000)",
      eligibleAmount: 1800000,
      subsidyRate: "15% (Capped)",
      estimatedBenefit: 120000,
      slabs: [
        { slab: "Turnover up to ₹15 Lakhs", rate: "15%", maxBenefit: "₹1,00,000" },
        { slab: "Turnover ₹15L to ₹25 Lakhs", rate: "15%", maxBenefit: "₹1,20,000" }
      ],
      changeFactors: [
        "Requires current FY 2025-26 Chartered Accountant certified turnover statement",
        "Must verify raw material invoice authenticity"
      ]
    },
    status: "Manual Review",
    confidence: "Medium (Conflicting evidence)",
    evidenceCompleteness: "3 of 4 Verified (1 Flagged)",
    relevanceScore: 91,
    lastVerified: "22 Sep 2026",
    requiredDocsCount: 5,
    uploadedDocsCount: 4,
    missingDocsCount: 1,
    applicationMode: "State Single Window Portal (MahaParivahan)",
    portalUrl: "https://industry.maharashtra.gov.in/demo-subsidy",
    rules: [
      {
        id: "RULE-WCS-01",
        name: "Manufacturing or Engineering Sector",
        description: "Enterprise must be in manufacturing, light engineering, or assembly.",
        field: "sector",
        operator: "IN LIST",
        expectedValue: "Manufacturing / Engineering",
        applicantValue: "Light Engineering & Precision Fabrication",
        result: "PASS",
        sourceDocument: "Industrial Policy Maharashtra 2024",
        sourcePage: "Page 8",
        sourceSection: "Schedule B",
        evidenceDocument: "Udyam_Registration_Certificate.pdf",
        reason: "Applicant NIC code falls directly under eligible Precision Engineering categories.",
        verifiedDate: "22 Sep 2026"
      },
      {
        id: "RULE-WCS-02",
        name: "Current Financial Year CA Turnover Audit",
        description: "Must provide CA certified turnover certificate for the active financial year (2025-26).",
        field: "turnoverCertificate",
        operator: "CURRENT_FY_VALID",
        expectedValue: "FY 2025-26 Statement",
        applicantValue: "CA Certificate dated FY 2023-24 (Outdated)",
        result: "REVIEW",
        sourceDocument: "Scheme Circular 12/2025",
        sourcePage: "Page 2",
        sourceSection: "Clause 4",
        evidenceDocument: "CA_Turnover_Cert_FY23_24.pdf",
        reason: "Uploaded CA certificate is from FY 2023-24. Current FY 2025-26 verification requires updated CA audit or GST 3B reconciliation.",
        verifiedDate: "22 Sep 2026"
      },
      {
        id: "RULE-WCS-03",
        name: "State Domicile / Registered Office",
        description: "Operating location must be physically in Maharashtra.",
        field: "state",
        operator: "EQUALS",
        expectedValue: "Maharashtra",
        applicantValue: "Maharashtra (Pune)",
        result: "PASS",
        sourceDocument: "State Subsidy Norms",
        sourcePage: "Page 3",
        sourceSection: "Clause 1.1",
        evidenceDocument: "Rent_Agreement_Pune.pdf",
        reason: "Registered gala lease agreement confirms continuous operation in Hinjewadi, Pune.",
        verifiedDate: "22 Sep 2026"
      }
    ],
    requiredDocuments: [
      { name: "Current FY 2025-26 CA Turnover Certificate", status: "Needs Review", isMandatory: true },
      { name: "Udyam Registration", status: "Verified", isMandatory: true },
      { name: "Factory/Gala Lease Agreement", status: "Verified", isMandatory: true },
      { name: "6-Month Bank Statement", status: "Verified", isMandatory: true }
    ],
    applicationSteps: [
      { step: 1, title: "Resolve Outdated Document", desc: "Upload revised CA certificate or reconcile GST 3B for FY 2025-26.", done: false, active: true },
      { step: 2, title: "Submit State Application", desc: "Submit through Maharashtra DIC portal.", done: false }
    ]
  },
  {
    id: "startup-seed-fund",
    name: "Startup India Seed Fund Assistance Program",
    department: "DPIIT, Ministry of Commerce and Industry",
    level: "Central Government",
    category: "Early Stage Equity & Seed Grant",
    description: "Financial assistance to early-stage startups for proof of concept, prototype development, product trials, market-entry and commercialization.",
    benefit: "₹2,00,000",
    benefitCalculation: {
      formula: "Milestone-based prototype validation grant up to ₹20,00,000 (Initial demo tranche ₹2,00,000)",
      eligibleAmount: 200000,
      subsidyRate: "Non-dilutive Grant",
      estimatedBenefit: 200000,
      slabs: [
        { slab: "Prototype validation phase", rate: "Grant", maxBenefit: "₹2,00,000" },
        { slab: "Commercialization phase", rate: "Debentures / Debt", maxBenefit: "₹50,00,000" }
      ],
      changeFactors: [
        "Requires official DPIIT Recognition Certificate number",
        "Requires Incubator partner recommendation panel review"
      ]
    },
    status: "Potentially Eligible",
    confidence: "Needs Missing Documents",
    evidenceCompleteness: "2 Verified, 2 Missing Documents",
    relevanceScore: 84,
    lastVerified: "18 Sep 2026",
    requiredDocsCount: 5,
    uploadedDocsCount: 3,
    missingDocsCount: 2,
    applicationMode: "Online via Startup India Hub",
    portalUrl: "https://www.startupindia.gov.in/demo-seed-fund",
    rules: [
      {
        id: "RULE-SISF-01",
        name: "Business Age Under 2 Years from Incorporation",
        description: "Startup must not have exceeded 2 years of incorporation at the time of application.",
        field: "businessAge",
        operator: "<=",
        expectedValue: "<= 2 Years",
        applicantValue: "3 Years 4 Months (May require date clarification)",
        result: "REVIEW",
        sourceDocument: "DPIIT Seed Fund Guidelines",
        sourcePage: "Page 6",
        sourceSection: "Clause 3(a)",
        evidenceDocument: "Udyam_Registration_Certificate.pdf",
        reason: "Udyam reflects 3.4 years since initial commencement, but incorporation date as corporate entity or LLP may qualify.",
        verifiedDate: "18 Sep 2026"
      },
      {
        id: "RULE-SISF-02",
        name: "DPIIT Recognition Number",
        description: "Must possess valid DPIIT Startup Recognition Certificate.",
        field: "dpiitNumber",
        operator: "EXISTS",
        expectedValue: "DPIIT Recognition Number",
        applicantValue: "Missing / Not Uploaded",
        result: "REVIEW",
        sourceDocument: "Startup India Portal Rules",
        sourcePage: "Page 2",
        sourceSection: "Clause 1",
        evidenceDocument: "MISSING_DPIIT_CERT.pdf",
        reason: "Document not found in applicant repository. Once uploaded, rule can be evaluated.",
        verifiedDate: "18 Sep 2026"
      },
      {
        id: "RULE-SISF-03",
        name: "GST Filing Compliance",
        description: "Must have active GSTIN and regular GST 3B return filings.",
        field: "gstReturn",
        operator: "FILED",
        expectedValue: "GST 3B Last Quarter",
        applicantValue: "Missing Document",
        result: "REVIEW",
        sourceDocument: "DPIIT Seed Fund Guidelines",
        sourcePage: "Page 9",
        sourceSection: "Annexure I",
        evidenceDocument: "MISSING_GST_3B.pdf",
        reason: "GST 3B filing proof needed to verify non-defaulter standing.",
        verifiedDate: "18 Sep 2026"
      }
    ],
    requiredDocuments: [
      { name: "DPIIT Recognition Certificate", status: "Missing", isMandatory: true },
      { name: "GST 3B Return (Q1 2026)", status: "Missing", isMandatory: true },
      { name: "Udyam Certificate", status: "Verified", isMandatory: true },
      { name: "Project Pitch / Prototype Deck", status: "Verified", isMandatory: false }
    ],
    applicationSteps: [
      { step: 1, title: "Acquire DPIIT Certificate", desc: "Register on Startup India and obtain certificate (2-3 business days).", done: false, active: true },
      { step: 2, title: "Select Incubator Partner", desc: "Choose nearest authorized incubator in Pune / Mumbai.", done: false }
    ]
  },
  {
    id: "rural-enterprise-grant",
    name: "Rural Enterprise Support & Village Industry Grant",
    department: "Ministry of Rural Development",
    level: "State & District Panchayat Level",
    category: "Grants & Subsidies",
    description: "Capital grant for small enterprises operating in rural gram panchayat jurisdictions to generate rural employment.",
    benefit: "₹90,000",
    benefitCalculation: {
      formula: "Fixed equipment purchase incentive for rural units",
      eligibleAmount: 90000,
      subsidyRate: "Flat Grant",
      estimatedBenefit: 90000,
      slabs: [{ slab: "Rural Micro Unit", rate: "100% equipment grant", maxBenefit: "₹90,000" }],
      changeFactors: ["Mandatory Gram Panchayat Certificate"]
    },
    status: "Ineligible",
    confidence: "Deterministic (Geographic rule failed)",
    evidenceCompleteness: "Rule Failed",
    relevanceScore: 35,
    lastVerified: "15 Sep 2026",
    requiredDocsCount: 4,
    uploadedDocsCount: 3,
    missingDocsCount: 1,
    applicationMode: "District Industry Centre (DIC)",
    portalUrl: "https://rural.nic.in/demo-enterprise",
    rules: [
      {
        id: "RULE-RUR-01",
        name: "Gram Panchayat Geographic Jurisdiction",
        description: "Enterprise operating address must fall within notified Gram Panchayat limits.",
        field: "districtJurisdiction",
        operator: "EQUALS",
        expectedValue: "Gram Panchayat Area",
        applicantValue: "Pune Municipal Corporation (Urban)",
        result: "FAIL",
        sourceDocument: "Rural Development Notification 2023",
        sourcePage: "Page 11",
        sourceSection: "Clause 5",
        evidenceDocument: "Rent_Agreement_Pune.pdf",
        reason: "Applicant's unit address is located inside Pune Municipal Corporation (PMC), classified as urban.",
        verifiedDate: "15 Sep 2026"
      }
    ],
    requiredDocuments: [
      { name: "Gram Panchayat NOC", status: "Missing", isMandatory: true }
    ],
    applicationSteps: []
  },
  {
    id: "tech-upgradation-subsidy",
    name: "PM Technology Upgradation & Automation Incentive",
    department: "Ministry of Heavy Industries",
    level: "Central Government",
    category: "Capital Subsidy",
    description: "Capital subsidy of 15% on procurement of advanced CNC machinery, automation tooling, and clean energy fixtures for registered MSMEs.",
    benefit: "₹1,10,000",
    benefitCalculation: {
      formula: "15% of Plant & Machinery Invoice Value (Max ₹1,10,000 for Micro Units)",
      eligibleAmount: 750000,
      subsidyRate: "15.0%",
      estimatedBenefit: 110000,
      slabs: [
        { slab: "Machinery ₹2L to ₹10L", rate: "15%", maxBenefit: "₹1,10,000" },
        { slab: "Machinery ₹10L to ₹50L", rate: "12%", maxBenefit: "₹5,00,000" }
      ],
      changeFactors: [
        "Invoices must be from approved OEM vendors",
        "Physical inspection by MSME Technology Centre inspector"
      ]
    },
    status: "Eligible",
    confidence: "High (100% verified)",
    evidenceCompleteness: "3 of 3 Rules Verified",
    relevanceScore: 94,
    lastVerified: "25 Sep 2026",
    requiredDocsCount: 4,
    uploadedDocsCount: 4,
    missingDocsCount: 0,
    applicationMode: "Online Single Window",
    portalUrl: "https://heavyindustries.gov.in/tech-subsidy-demo",
    rules: [
      {
        id: "RULE-TECH-01",
        name: "Eligible Machinery Sector",
        description: "Enterprise must be in precision machining, fabrication or tools.",
        field: "sector",
        operator: "EQUALS",
        expectedValue: "Precision / Fabrication",
        applicantValue: "Light Engineering & Precision Fabrication",
        result: "PASS",
        sourceDocument: "Technology Modernization Norms 2025",
        sourcePage: "Page 16",
        sourceSection: "Annexure III",
        evidenceDocument: "Udyam_Registration_Certificate.pdf",
        reason: "Sector matches eligible modernization codes.",
        verifiedDate: "25 Sep 2026"
      },
      {
        id: "RULE-TECH-02",
        name: "Prior Default Check",
        description: "Applicant has no willful default or NPA with commercial banks.",
        field: "existingLoans",
        operator: "NO_DEFAULT",
        expectedValue: "No Active Default",
        applicantValue: "Current & In Good Standing",
        result: "PASS",
        sourceDocument: "RBI MSME Lending Framework",
        sourcePage: "Page 4",
        sourceSection: "Para 2.1",
        evidenceDocument: "Bank_Statement_6M.pdf",
        reason: "Bank statement confirms zero bounced EMIs and good credit standing.",
        verifiedDate: "25 Sep 2026"
      },
      {
        id: "RULE-TECH-03",
        name: "Active Udyam Certificate",
        description: "Micro or Small unit with verified registration.",
        field: "udyamNumber",
        operator: "VALID",
        expectedValue: "Active Registration",
        applicantValue: "UDYAM-MH-12-0048291",
        result: "PASS",
        sourceDocument: "Scheme Rules",
        sourcePage: "Page 2",
        sourceSection: "Clause 1",
        evidenceDocument: "Udyam_Registration_Certificate.pdf",
        reason: "Valid Udyam credential verified.",
        verifiedDate: "25 Sep 2026"
      }
    ],
    requiredDocuments: [
      { name: "Udyam Certificate", status: "Verified", isMandatory: true },
      { name: "Machinery Quotation / Invoice", status: "Verified", isMandatory: true },
      { name: "Bank Statement", status: "Verified", isMandatory: true },
      { name: "PAN Card", status: "Verified", isMandatory: true }
    ],
    applicationSteps: [
      { step: 1, title: "Obtain Machinery Quotations", desc: "Secure GST quotation from certified machinery supplier.", done: true },
      { step: 2, title: "Lodge Application Online", desc: "Upload vendor invoices and bank sanction letter.", done: false, active: true },
      { step: 3, title: "On-site Verification", desc: "Inspector verifies machine installation.", done: false },
      { step: 4, title: "Grant Disbursement", desc: "Subsidy transferred via PFMS DBT.", done: false }
    ]
  }
];

export const mockDocuments = [
  {
    id: "doc-1",
    name: "Aadhaar Card",
    fileName: "Aadhaar_Rahul_Sharma_Masked.pdf",
    category: "Identity",
    fileSize: "1.4 MB",
    uploadedAt: "12 Sep 2026, 11:20 AM",
    status: "Verified",
    expiryDate: "Lifelong / Permanent",
    confidence: "99.4%",
    sourceRef: "UIDAI Vault Verification Token: SHA256-8F01...99B2",
    extractedFields: {
      "Full Name": "Rahul Ramesh Sharma",
      "Date of Birth": "14/08/1997",
      "Age": "29 Years",
      "Gender": "Male",
      "UID Mask": "XXXXXXXX8912",
      "State": "Maharashtra"
    },
    verificationNotes: "Aadhaar OTP electronic verification successfully validated with name match score 1.0."
  },
  {
    id: "doc-2",
    name: "Permanent Account Number (PAN) Card",
    fileName: "PAN_Rahul_Sharma.pdf",
    category: "Identity",
    fileSize: "840 KB",
    uploadedAt: "12 Sep 2026, 11:22 AM",
    status: "Verified",
    expiryDate: "Permanent",
    confidence: "99.1%",
    sourceRef: "NSDL / Income Tax Dept API Cross-Check",
    extractedFields: {
      "PAN Number": "ABCPS1234F",
      "Cardholder Name": "Rahul Ramesh Sharma",
      "Father Name": "Ramesh Sharma",
      "Date of Issue": "03/11/2018",
      "Category": "Individual / Proprietor"
    },
    verificationNotes: "PAN is active and linked with verified Aadhaar."
  },
  {
    id: "doc-3",
    name: "Income Certificate (FY 2025–26)",
    fileName: "Income_Certificate_Pune_FY25_26.pdf",
    category: "Income",
    fileSize: "2.1 MB",
    uploadedAt: "18 Sep 2026, 04:15 PM",
    status: "Verified",
    expiryDate: "31 Mar 2027",
    confidence: "98.7%",
    sourceRef: "MahaOnline Revenue Dept - Token REV-PUN-2026-902",
    extractedFields: {
      "Annual Income": "₹3,80,000",
      "Financial Year": "2025–2026",
      "Issuing Authority": "Office of the Tehsildar, Haveli, Pune",
      "Applicant Name Match": "Yes (Exact Match)",
      "Digital Signature": "Valid (Certifying Officer Class III)"
    },
    verificationNotes: "Income detected: ₹3,80,000. Verified below all state and central ceiling brackets."
  },
  {
    id: "doc-4",
    name: "Udyam Registration Certificate",
    fileName: "Udyam_MH_12_0048291.pdf",
    category: "Business",
    fileSize: "1.8 MB",
    uploadedAt: "15 Sep 2026, 02:40 PM",
    status: "Verified",
    expiryDate: "Valid while active",
    confidence: "99.8%",
    sourceRef: "Ministry of MSME Central Registry - UDYAM API",
    extractedFields: {
      "Udyam Number": "UDYAM-MH-12-0048291",
      "Enterprise Name": "TechnoNova Engineering Solutions",
      "Enterprise Class": "Micro Enterprise",
      "Major Activity": "Manufacturing (Precision Tools)",
      "Commencement Date": "12/04/2023",
      "NIC Code": "25920 - Machining of metal parts"
    },
    verificationNotes: "Udyam registration is active and verified directly against MSME gateway."
  },
  {
    id: "doc-5",
    name: "Commercial Bank Statement (Last 6 Months)",
    fileName: "HDFC_Current_Account_6M.pdf",
    category: "Bank",
    fileSize: "4.2 MB",
    uploadedAt: "20 Sep 2026, 09:12 AM",
    status: "Verified",
    expiryDate: "Valid (Issued Sep 2026)",
    confidence: "97.5%",
    sourceRef: "HDFC Bank Statement e-Statement Parser",
    extractedFields: {
      "Bank Name": "HDFC Bank Ltd",
      "Account Number": "502000XXXX4419",
      "Account Type": "Current Account",
      "Branch": "Hinjewadi Phase 1, Pune",
      "Average Monthly Balance": "₹1,42,800",
      "Overdue / NPA Status": "Clean (Zero Overdue)"
    },
    verificationNotes: "Active banking track record verified with zero dishonored checks."
  },
  {
    id: "doc-6",
    name: "Chartered Accountant Turnover Certificate",
    fileName: "CA_Turnover_Certificate_FY23_24.pdf",
    category: "Business",
    fileSize: "1.1 MB",
    uploadedAt: "20 Sep 2026, 09:15 AM",
    status: "Needs review",
    expiryDate: "Outdated (Dated FY 2023-24)",
    confidence: "82.0%",
    sourceRef: "ICAI UDIN Check: UDIN-24019284BK... (Outdated FY)",
    extractedFields: {
      "Certified Turnover": "₹14,50,000",
      "Certified FY": "2023–2024",
      "Auditor Firm": "K. S. Joshi & Associates, Pune",
      "UDIN Status": "Valid for FY 23-24 only"
    },
    verificationNotes: "Flagged: Certificate covers FY 2023-24. Policy requires current FY 2025-26 proof."
  },
  {
    id: "doc-7",
    name: "Registered Gala Commercial Lease Agreement",
    fileName: "Commercial_Lease_Agreement_Hinjewadi.pdf",
    category: "Address",
    fileSize: "3.5 MB",
    uploadedAt: "14 Sep 2026, 03:00 PM",
    status: "Verified",
    expiryDate: "30 Nov 2028",
    confidence: "96.2%",
    sourceRef: "IGR Maharashtra Registered Deed: PNE-4-8819-2024",
    extractedFields: {
      "Premises Address": "Plot 18/B, Industrial Gala, Hinjewadi Phase 1, Pune",
      "Lessor": "Pune Industrial Estate Corp",
      "Lessee": "Rahul Ramesh Sharma (Proprietor)",
      "Agreement Period": "5 Years (2023–2028)"
    },
    verificationNotes: "Physical commercial premise confirmed within Maharashtra state territory."
  },
  {
    id: "doc-8",
    name: "GST 3B Quarterly Return (Latest)",
    fileName: "Not Uploaded",
    category: "Registration",
    fileSize: "0 KB",
    uploadedAt: "Pending",
    status: "Missing",
    expiryDate: "Required",
    confidence: "0%",
    sourceRef: "GST Portal Integration Required",
    extractedFields: {},
    verificationNotes: "Mandatory for Startup Seed and Working Capital schemes."
  },
  {
    id: "doc-9",
    name: "DPIIT Startup Recognition Certificate",
    fileName: "Not Uploaded",
    category: "Registration",
    fileSize: "0 KB",
    uploadedAt: "Pending",
    status: "Missing",
    expiryDate: "Required",
    confidence: "0%",
    sourceRef: "DPIIT Portal Verification",
    extractedFields: {},
    verificationNotes: "Mandatory for Startup India Seed Fund."
  },
  {
    id: "doc-10",
    name: "Gram Panchayat Residence NOC",
    fileName: "Not Uploaded",
    category: "Certificates",
    fileSize: "0 KB",
    uploadedAt: "Not Applicable",
    status: "Missing",
    expiryDate: "N/A",
    confidence: "0%",
    sourceRef: "Rural Panchayat Authority",
    extractedFields: {},
    verificationNotes: "Required only for rural targeted schemes."
  }
];

export const mockManualReviewCases = [
  {
    id: "REV-2026-001",
    applicantName: "Rahul Sharma",
    applicantId: "APP-2026-8941",
    schemeId: "working-capital-subsidy",
    schemeName: "Small Business Working Capital Support Program",
    priority: "High",
    status: "Pending", // Pending, In Review, Resolved, Documents Requested
    createdAt: "22 Sep 2026, 02:30 PM",
    reason: "Outdated CA Turnover Certificate (FY 2023-24 uploaded instead of current FY 2025-26)",
    applicantEvidence: {
      documentName: "CA_Turnover_Certificate_FY23_24.pdf",
      uploadedDate: "20 Sep 2026",
      extractedValue: "₹14,50,000 (FY 2023-24)",
      selfReportedTurnover: "₹18,00,000",
      discrepancyNote: "Turnover reported in application profile is ₹18,00,000, but uploaded CA certificate only certifies ₹14,50,000 for FY 23-24."
    },
    officialRule: {
      ruleId: "RULE-WCS-02",
      requirement: "Audited turnover certificate for active financial year (2025-26) or reconciliation of latest 4 quarters of GST 3B.",
      policySource: "Scheme Circular 12/2025, Page 2, Clause 4",
      actionNeeded: "Request fresh FY 2025-26 CA certificate or quarterly GST-3B filings."
    },
    blockedReason: "Automated engine cannot deterministically approve turnover eligibility because existing evidence is 2 fiscal years behind required validity.",
    auditTrail: [
      { timestamp: "22 Sep 2026, 02:30 PM", actor: "System Engine", action: "Flagged case for manual review due to date mismatch" }
    ]
  },
  {
    id: "REV-2026-002",
    applicantName: "Rahul Sharma",
    applicantId: "APP-2026-8941",
    schemeId: "startup-seed-fund",
    schemeName: "Startup India Seed Fund Assistance Program",
    priority: "Medium",
    status: "In Review",
    createdAt: "21 Sep 2026, 11:15 AM",
    reason: "Vintage Ambiguity between Udyam Commencement (3.4 yrs) and Startup Incorporation",
    applicantEvidence: {
      documentName: "Udyam_Registration_Certificate.pdf",
      uploadedDate: "15 Sep 2026",
      extractedValue: "Commencement Date: 12/04/2023 (3.4 years)",
      selfReportedTurnover: "₹18,00,000",
      discrepancyNote: "Udyam mentions 2023. If entity converted to Private Limited or LLP within last 24 months, it satisfies the 2-year startup rule."
    },
    officialRule: {
      ruleId: "RULE-SISF-01",
      requirement: "Startup must not have exceeded 2 years of incorporation at the date of seed application.",
      policySource: "DPIIT Seed Fund Guidelines, Page 6, Clause 3(a)",
      actionNeeded: "Verify Certificate of Incorporation (MCA) or confirm proprietorship vintage."
    },
    blockedReason: "Requires human policy officer interpretation to distinguish between informal proprietorship commencement and legal incorporation date.",
    auditTrail: [
      { timestamp: "21 Sep 2026, 11:15 AM", actor: "System Engine", action: "Flagged due to business age threshold boundary" },
      { timestamp: "23 Sep 2026, 10:00 AM", actor: "Officer S. Deshmukh", action: "Moved status to In Review" }
    ]
  },
  {
    id: "REV-2026-003",
    applicantName: "Ananya Deshmukh",
    applicantId: "APP-2026-4402",
    schemeId: "msme-interest-support",
    schemeName: "MSME Interest Support Scheme",
    priority: "Low",
    status: "Resolved",
    createdAt: "19 Sep 2026, 04:00 PM",
    reason: "Bank IFSC Code Branch Merger Verification",
    applicantEvidence: {
      documentName: "Syndicate_Bank_Passbook.pdf",
      uploadedDate: "19 Sep 2026",
      extractedValue: "IFSC: SYNB0005012 (Canara Bank Merger)",
      selfReportedTurnover: "₹9,20,000",
      discrepancyNote: "Legacy Syndicate Bank IFSC remapped to Canara Bank CNRB0005012."
    },
    officialRule: {
      ruleId: "RULE-MSME-04",
      requirement: "Active commercial bank account with validated PFMS Direct Transfer compatibility.",
      policySource: "DBT Direct Transfer Framework, Page 6, Section 1.4",
      actionNeeded: "Re-verify new merged IFSC code."
    },
    blockedReason: "IFSC branch code required lookup against National Clearing Cell merged database.",
    auditTrail: [
      { timestamp: "19 Sep 2026, 04:00 PM", actor: "System Engine", action: "Flagged legacy IFSC code" },
      { timestamp: "20 Sep 2026, 09:30 AM", actor: "Officer P. Nair", action: "Verified merged IFSC mapping; Marked Resolved" }
    ]
  }
];

export const mockNotifications = [
  {
    id: "notif-1",
    title: "High Match Scheme Identified",
    message: "MSME Interest Support Scheme is 100% verified. Estimated benefit of ₹75,000 available.",
    type: "action", // action, info, success
    timeGroup: "Today",
    timestamp: "10 minutes ago",
    link: "/schemes/msme-interest-support",
    read: false
  },
  {
    id: "notif-2",
    title: "Missing Document Flagged",
    message: "Upload your latest GST 3B return to unlock eligibility for Startup India Seed Fund (₹2.0L).",
    type: "action",
    timeGroup: "Today",
    timestamp: "2 hours ago",
    link: "/missing-documents",
    read: false
  },
  {
    id: "notif-3",
    title: "Income Certificate Verified",
    message: "Income Certificate verified by OCR pipeline. Annual income recorded at ₹3,80,000.",
    type: "success",
    timeGroup: "Today",
    timestamp: "4 hours ago",
    link: "/documents",
    read: true
  },
  {
    id: "notif-4",
    title: "Manual Review Case Created",
    message: "Small Business Working Capital Support requires updated CA turnover certificate for FY 2025-26.",
    type: "action",
    timeGroup: "Earlier",
    timestamp: "2 days ago",
    link: "/review",
    read: true
  },
  {
    id: "notif-5",
    title: "Udyam Database Matched",
    message: "Registration UDYAM-MH-12-0048291 confirmed active with zero regulatory non-compliances.",
    type: "info",
    timeGroup: "Earlier",
    timestamp: "5 days ago",
    link: "/documents",
    read: true
  },
  {
    id: "notif-6",
    title: "Profile 82% Completed",
    message: "Add your secondary business category to complete 100% profile intelligence.",
    type: "info",
    timeGroup: "Earlier",
    timestamp: "6 days ago",
    link: "/profile",
    read: true
  }
];

export const mockTrackingApplications = [
  {
    id: "APP-TRK-90182",
    schemeId: "msme-interest-support",
    schemeName: "MSME Interest Support Scheme",
    referenceNumber: "MSME-SUB-2026-MH-09821",
    submittedDate: "24 Sep 2026",
    currentStatus: "Under Review",
    statusColor: "amber",
    statusExplanation: "The Department of MSME & HDFC Bank Credit Cell are verifying the working capital certificate. Estimated resolution: 3 working days.",
    estimatedBenefit: "₹75,000",
    timeline: [
      { step: "Draft Prepared", date: "23 Sep 2026", status: "completed", desc: "Applicant dossier assembled and rules validated." },
      { step: "Documents Uploaded", date: "24 Sep 2026", status: "completed", desc: "4/4 verified documents transmitted to MSME portal." },
      { step: "Application Submitted", date: "24 Sep 2026", status: "completed", desc: "Acknowledgement receipt generated (Ref: MSME-SUB-2026-MH-09821)." },
      { step: "Under Review", date: "Current", status: "active", desc: "Verification officer inspecting loan schedule and turnover." },
      { step: "Sanction Decision", date: "Expected 02 Oct", status: "pending", desc: "Formal subvention sanction order issued." },
      { step: "Disbursement", date: "Expected 10 Oct", status: "pending", desc: "Subvention amount credited into HDFC loan account." }
    ]
  },
  {
    id: "APP-TRK-77120",
    schemeId: "tech-upgradation-subsidy",
    schemeName: "PM Technology Upgradation Subsidy",
    referenceNumber: "PM-TECH-2026-77120",
    submittedDate: "16 Sep 2026",
    currentStatus: "Documents Prepared",
    statusColor: "blue",
    statusExplanation: "Dossier complete. Ready for final submission on Ministry of Heavy Industries single-window portal.",
    estimatedBenefit: "₹1,10,000",
    timeline: [
      { step: "Draft Prepared", date: "15 Sep 2026", status: "completed", desc: "Applicant machine quotation checked." },
      { step: "Documents Prepared", date: "16 Sep 2026", status: "active", desc: "Vendor invoices, Udyam certificate and bank statements bundled." },
      { step: "Application Submitted", date: "Pending Action", status: "pending", desc: "Click 'Submit to Portal' to proceed." },
      { step: "Under Review", date: "--", status: "pending", desc: "Department inspection." },
      { step: "Sanction Decision", date: "--", status: "pending", desc: "PFMS token release." },
      { step: "Disbursement", date: "--", status: "pending", desc: "Direct benefit transfer." }
    ]
  }
];

export const mockPolicyKnowledgeBase = [
  {
    id: "KB-DOC-01",
    title: "Master Operational Guidelines for MSME Interest Subvention Scheme 2024–2027",
    department: "Ministry of Micro, Small & Medium Enterprises",
    version: "v3.2 (Gazette Ref 2024/MSME/09)",
    lastUpdated: "14 Jan 2026",
    pages: 48,
    extractedRulesCount: 28,
    verificationStatus: "Verified & Seeded",
    fileSize: "4.8 MB PDF",
    summary: "Comprehensive eligibility criteria, lending caps, interest computation tables, and PFMS nodal bank guidelines for micro & small enterprises.",
    relatedSchemes: ["MSME Interest Support Scheme"]
  },
  {
    id: "KB-DOC-02",
    title: "Maharashtra Industrial Policy 2024 & Working Capital Directives",
    department: "Directorate of Industries, Govt. of Maharashtra",
    version: "v1.4",
    lastUpdated: "02 Feb 2026",
    pages: 64,
    extractedRulesCount: 34,
    verificationStatus: "Verified & Seeded",
    fileSize: "6.2 MB PDF",
    summary: "State incentives for light engineering clusters, raw material subvention, and CA turnover verification regulations.",
    relatedSchemes: ["Small Business Working Capital Support Program"]
  },
  {
    id: "KB-DOC-03",
    title: "Startup India Seed Fund Scheme (SISFS) Operational Guidelines",
    department: "DPIIT, Ministry of Commerce & Industry",
    version: "v2.1",
    lastUpdated: "18 Nov 2025",
    pages: 32,
    extractedRulesCount: 19,
    verificationStatus: "Verified & Seeded",
    fileSize: "3.1 MB PDF",
    summary: "Guidelines for seed funding up to ₹50 Lakhs through approved incubators, prototype validation benchmarks, and DPIIT verification.",
    relatedSchemes: ["Startup India Seed Fund Assistance Program"]
  },
  {
    id: "KB-DOC-04",
    title: "Credit Linked Capital Subsidy Scheme for Technology Upgradation (CLCSS)",
    department: "Ministry of Heavy Industries & MSME",
    version: "v4.0",
    lastUpdated: "10 Mar 2026",
    pages: 52,
    extractedRulesCount: 22,
    verificationStatus: "Verified & Seeded",
    fileSize: "5.5 MB PDF",
    summary: "Eligible machinery categories, OEM certification criteria, and 15% upfront capital subsidy procedures.",
    relatedSchemes: ["PM Technology Upgradation & Automation Incentive"]
  }
];

export const mockRagQueries = [
  {
    question: "Why am I eligible for the MSME Interest Subvention Scheme?",
    retrievedSource: "Master Operational Guidelines for MSME Interest Subvention, Page 14, Section 4.2",
    policyChunk: `Section 4.2 (Eligibility Thresholds): "Any micro enterprise holding valid Udyam registration whose aggregate annual turnover does not exceed ₹5,00,00,000, and where the proprietor's individual/family annual income is within ₹5,00,000, shall be eligible for 2% per annum interest subvention on active working capital facilities from scheduled commercial banks."`,
    matchedRule: "RULE-MSME-01 & RULE-MSME-03",
    applicantEvidenceSummary: "Applicant turnover is ₹18,00,000 (Micro) and family annual income is ₹3,80,000 (below ₹5.0L ceiling). Udyam is active with verified HDFC commercial current account.",
    deterministicResult: "PASS (All 4 conditions satisfied)",
    generatedAnswer: "You are fully eligible because your annual business turnover of ₹18,00,000 qualifies your unit as a Micro Enterprise (threshold <= ₹5 Crore), your certified family income of ₹3,80,000 is under the ₹5,00,000 ceiling stated in Section 4.2, and your active Udyam Certificate (UDYAM-MH-12-0048291) is cross-verified with an active commercial bank account."
  },
  {
    question: "Why was my Working Capital Subsidy routed to Manual Review?",
    retrievedSource: "Maharashtra Industrial Policy 2024, Scheme Circular 12/2025, Page 2, Clause 4",
    policyChunk: `Clause 4 (Turnover Recertification): "Applicants must furnish Chartered Accountant audited financial turnover certificates for the immediately preceding active financial year (FY 2025-26) or submit quarterly GST-3B filings demonstrating continuous operational revenue."`,
    matchedRule: "RULE-WCS-02 (Current FY CA Turnover Audit)",
    applicantEvidenceSummary: "Uploaded document CA_Turnover_Certificate_FY23_24.pdf is dated for FY 2023-24, creating a 2-year verification gap.",
    deterministicResult: "MANUAL REVIEW REQUIRED (Outdated Evidence)",
    generatedAnswer: "Your application is under manual review because the uploaded Chartered Accountant Turnover Certificate is for FY 2023-24. Under Circular 12/2025 Clause 4, the policy mandates proof for the current financial year (FY 2025-26). You can resolve this immediately by uploading an updated FY 2025-26 CA certificate or your latest quarterly GST 3B return."
  },
  {
    question: "Why did I fail eligibility for the Women Entrepreneur Assistance Scheme?",
    retrievedSource: "WEAS Scheme Charter 2024, Page 3, Section 1.2 (Target Beneficiaries)",
    policyChunk: `Section 1.2: "The scheme is exclusively reserved for female individual proprietors or enterprise entities where women entrepreneurs hold a minimum 51% equity or management control."`,
    matchedRule: "RULE-WEF-01 (Gender / Ownership Mandate)",
    applicantEvidenceSummary: "Applicant registered gender is Male; Proprietorship is 100% held by applicant.",
    deterministicResult: "FAIL (Definitive statutory rule violation)",
    generatedAnswer: "Your profile did not qualify because Section 1.2 of the scheme charter mandates female ownership (minimum 51% shareholding or female sole proprietorship). Your verified profile indicates sole male proprietorship."
  }
];

export const systemArchitectureLayers = [
  {
    layer: "User Experience Layer",
    tech: "React 18 + Tailwind CSS + Lucide Icons",
    description: "Cinematic, accessible GovTech dashboard featuring auditable rule cards, document upload drag-and-drop, interactive drawers, and presentation tour.",
    color: "from-blue-600 to-indigo-700"
  },
  {
    layer: "Application API Gateway",
    tech: "FastAPI / Python Microservice Gateway",
    description: "Stateless REST endpoints handling session authentication, document pipeline routing, rule evaluation triggers, and mock DBT sandbox endpoints.",
    color: "from-indigo-600 to-purple-700"
  },
  {
    layer: "Document Intelligence Pipeline",
    tech: "OCR (Tesseract/PaddleOCR) + LayoutLM + Field Extractor",
    description: "Extracts key-value pairs (Income, Turnover, Udyam ID, IFSC, Aadhaar mask) from PDF/scanned documents with confidence scoring and expiry checks.",
    color: "from-teal-600 to-emerald-700"
  },
  {
    layer: "Policy Retrieval & RAG System",
    tech: "Vector Database (ChromaDB / pgvector) + Text Embeddings",
    description: "Indexes official Gazette notifications, ministerial circulars, and scheme guidelines into semantic chunks for rapid policy retrieval.",
    color: "from-amber-600 to-orange-700"
  },
  {
    layer: "Deterministic Eligibility Rule Engine",
    tech: "Pure Python / Rule AST Engine (Non-LLM Hallucination Free)",
    description: "Evaluates extracted facts against structured Boolean and arithmetic policy operators (<=, >=, IN, MATCH). Generates auditable PASS/FAIL/REVIEW evidence logs.",
    color: "from-emerald-600 to-teal-700"
  },
  {
    layer: "Human-in-the-Loop Manual Review",
    tech: "Auditor Console + Conflict Resolution Workflow",
    description: "Routes ambiguous documents (e.g. outdated FY certificates, blurred scans, merged IFSC codes) to human caseworkers with side-by-side evidence diffs.",
    color: "from-rose-600 to-pink-700"
  },
  {
    layer: "Data & Audit Layer",
    tech: "PostgreSQL + Immutable Audit Logs",
    description: "Secure storage for encrypted applicant profiles, document checksums, verifiable decision hashes, and PFMS tracking payloads.",
    color: "from-slate-700 to-slate-900"
  }
];
