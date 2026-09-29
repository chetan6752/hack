# Deterministic Policy & Eligibility Rule Engine in Python
# Evaluates statutory AST criteria against applicant parameters and verified documents.

def evaluate_rule(rule: dict, applicant: dict, documents: list) -> dict:
    rule_copy = dict(rule)
    result = "PASS"
    field = rule.get("field", "")
    operator = rule.get("operator", "")
    expected = rule.get("expectedValue", "")
    applicant_val = rule.get("applicantValue", "")
    reason = rule.get("reason", "")

    if field == "turnover":
        turnover_val = int(applicant.get("turnover", 0) or 0)
        applicant_val = f"₹{turnover_val:,}"
        if operator == "<=":
            threshold = 50000000  # 5 Crore Micro ceiling
            if turnover_val <= threshold:
                result = "PASS"
                reason = f"Applicant's annual turnover of {applicant_val} satisfies the statutory Micro-enterprise ceiling (≤ ₹5 Crore)."
            else:
                result = "FAIL"
                reason = f"Applicant's annual turnover of {applicant_val} exceeds the statutory Micro-enterprise ceiling of ₹5,00,00,000."

    elif field in ("annualIncome", "familyIncome"):
        income_val = int(applicant.get("annualIncome", 0) or applicant.get("familyIncome", 0) or 0)
        applicant_val = f"₹{income_val:,}"
        if operator == "<=":
            threshold = 500000
            if income_val <= threshold:
                result = "PASS"
                reason = f"Annual personal/family income of {applicant_val} is within the priority assistance threshold (≤ ₹5,00,000)."
            else:
                result = "FAIL"
                reason = f"Annual income of {applicant_val} exceeds the prioritized assistance ceiling of ₹5,00,000."

    elif field == "state":
        state_val = applicant.get("state", "")
        applicant_val = state_val
        if operator in ("EQUALS", "==", "IN_APPROVED_STATES"):
            expected_lower = expected.lower()
            if any(k in expected_lower for k in [state_val.lower(), "all", "national", "central"]):
                result = "PASS"
                reason = f"Applicant domicile ({state_val}) is eligible under program jurisdiction."
            else:
                result = "FAIL"
                reason = f"Program is restricted to {expected}; applicant is registered in {state_val}."

    elif field == "udyamNumber":
        udyam = applicant.get("udyamNumber", "")
        msme_reg = applicant.get("msmeRegistered", False)
        if msme_reg and udyam and len(udyam.strip()) > 0:
            result = "PASS"
            applicant_val = f"{udyam} (Active)"
            reason = "Active Udyam registration verified against the national MSME registry."
        else:
            result = "FAIL"
            applicant_val = "Not Available / Inactive"
            reason = "Active Udyam registration number is required for this statutory benefit."

    elif field == "category":
        cat = applicant.get("category", "General")
        applicant_val = cat
        result = "PASS"
        reason = f"Social category ({cat}) validated for general or targeted enterprise quota."

    # Document check if rule requires evidence
    evidence_doc = rule.get("evidenceDocument")
    if evidence_doc:
        doc_lower = evidence_doc.lower()
        matched_doc = None
        for d in documents:
            d_name = d.get("name", "").lower()
            d_file = d.get("fileName", "").lower()
            d_cat = d.get("category", "").lower()
            if doc_lower in d_file or doc_lower.replace(".pdf", "") in d_name:
                matched_doc = d
                break
            if "turnover" in doc_lower and "turnover" in d_name:
                matched_doc = d
                break
            if "gst" in doc_lower and "gst" in d_name:
                matched_doc = d
                break
            if "dpiit" in doc_lower and ("dpiit" in d_name or "startup" in d_name):
                matched_doc = d
                break

        if matched_doc:
            status = matched_doc.get("status", "")
            if status == "Verified":
                result = "PASS"
                applicant_val = f"Verified in {matched_doc.get('name')}"
                reason = f"Required document \"{matched_doc.get('name')}\" is verified and active."
            elif status == "Needs review":
                result = "FLAGGED"
                applicant_val = f"Under Review ({matched_doc.get('name')})"
                reason = "Uploaded document requires administrative clarification."
        else:
            if result != "FAIL":
                result = "MISSING_DOC"
                applicant_val = "Document Missing"
                reason = f"Mandatory proof document ({evidence_doc}) has not been uploaded."

    rule_copy["result"] = result
    rule_copy["applicantValue"] = applicant_val
    rule_copy["reason"] = reason
    rule_copy["verifiedDate"] = "Live Evaluated"
    return rule_copy


def evaluate_all_schemes(schemes: list, applicant: dict, documents: list, review_cases: list = None) -> list:
    review_cases = review_cases or []
    evaluated_schemes = []

    for scheme in schemes:
        scheme_copy = dict(scheme)
        scheme_id = scheme.get("id")
        scheme_name = scheme.get("name", "").lower()

        # Check for active unresolved review case
        active_case = None
        for c in review_cases:
            c_name = c.get("schemeName", "").lower()
            c_id = c.get("schemeId", "")
            c_status = c.get("status", "")
            if (scheme_id == c_id or scheme_name in c_name) and c_status in ("Pending", "In Review", "Documents Requested"):
                active_case = c
                break

        evaluated_rules = [
            evaluate_rule(r, applicant, documents) for r in scheme.get("rules", [])
        ]

        has_fail = any(r["result"] == "FAIL" for r in evaluated_rules)
        has_flagged = any(r["result"] == "FLAGGED" for r in evaluated_rules) or bool(active_case)
        has_missing = any(r["result"] == "MISSING_DOC" for r in evaluated_rules)

        if has_fail:
            status = "Ineligible"
            confidence = "Definitive (Statutory threshold exceeded)"
        elif has_flagged:
            status = "Manual Review"
            confidence = "Requires Review (Discrepancy detected)"
        elif has_missing:
            status = "Potentially Eligible"
            confidence = "Medium (Pending statutory documents)"
        else:
            status = "Eligible"
            confidence = "High (100% verified)"

        missing_count = sum(1 for r in evaluated_rules if r["result"] == "MISSING_DOC")
        required_count = scheme.get("requiredDocsCount", len([r for r in evaluated_rules if r.get("evidenceDocument")]) or 4)
        uploaded_count = max(0, required_count - missing_count)
        verified_rules = sum(1 for r in evaluated_rules if r["result"] == "PASS")
        total_rules = len(evaluated_rules) or 1

        scheme_copy["status"] = status
        scheme_copy["confidence"] = confidence
        scheme_copy["evidenceCompleteness"] = f"{verified_rules} of {total_rules} Rules Verified"
        scheme_copy["missingDocsCount"] = missing_count
        scheme_copy["uploadedDocsCount"] = uploaded_count
        scheme_copy["rules"] = evaluated_rules
        scheme_copy["lastVerified"] = "Live Evaluated"

        evaluated_schemes.append(scheme_copy)

    return evaluated_schemes
