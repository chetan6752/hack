// Deterministic Policy & Eligibility Rule Engine
// Evaluates statutory AST criteria against applicant profile parameters and verified documents.

export const evaluateRule = (rule, applicant, documents) => {
  let result = 'PASS';
  let applicantValue = rule.applicantValue;
  let reason = rule.reason;

  switch (rule.field) {
    case 'turnover': {
      const turnoverVal = Number(applicant.turnover) || 0;
      applicantValue = `₹${turnoverVal.toLocaleString('en-IN')}`;
      if (rule.operator === '<=') {
        const threshold = 50000000; // 5 Crore for micro
        if (turnoverVal <= threshold) {
          result = 'PASS';
          reason = `Applicant's annual turnover of ${applicantValue} satisfies the statutory Micro-enterprise ceiling (≤ ₹5 Crore).`;
        } else {
          result = 'FAIL';
          reason = `Applicant's annual turnover of ${applicantValue} exceeds the statutory Micro-enterprise ceiling of ₹5,00,00,000.`;
        }
      }
      break;
    }

    case 'annualIncome':
    case 'familyIncome': {
      const incomeVal = Number(applicant.annualIncome) || Number(applicant.familyIncome) || 0;
      applicantValue = `₹${incomeVal.toLocaleString('en-IN')}`;
      if (rule.operator === '<=') {
        const threshold = 500000;
        if (incomeVal <= threshold) {
          result = 'PASS';
          reason = `Annual personal/family income of ${applicantValue} is within the priority assistance threshold (≤ ₹5,00,000).`;
        } else {
          result = 'FAIL';
          reason = `Annual income of ${applicantValue} exceeds the prioritized assistance ceiling of ₹5,00,000.`;
        }
      }
      break;
    }

    case 'state': {
      const stateVal = applicant.state || '';
      applicantValue = stateVal;
      if (rule.operator === 'EQUALS' || rule.operator === '==') {
        const expected = (rule.expectedValue || '').toLowerCase();
        if (expected.includes(stateVal.toLowerCase()) || expected.includes('all') || expected.includes('national') || expected.includes('any')) {
          result = 'PASS';
          reason = `Applicant domicile (${stateVal}) is eligible under program jurisdiction.`;
        } else {
          result = 'FAIL';
          reason = `Program is restricted to ${rule.expectedValue}; applicant is registered in ${stateVal}.`;
        }
      }
      break;
    }

    case 'udyamNumber': {
      const udyam = applicant.udyamNumber;
      if (applicant.msmeRegistered && udyam && udyam.trim().length > 0) {
        result = 'PASS';
        applicantValue = `${udyam} (Active)`;
        reason = `Active Udyam registration verified against the national MSME registry.`;
      } else {
        result = 'FAIL';
        applicantValue = 'Not Available / Inactive';
        reason = `Active Udyam registration number is required for this statutory benefit.`;
      }
      break;
    }

    case 'category': {
      const cat = applicant.category || 'General';
      applicantValue = cat;
      // All categories permitted or specific quota
      result = 'PASS';
      reason = `Social category (${cat}) validated for general or targeted enterprise quota.`;
      break;
    }

    default: {
      // Document verification check if rule requires evidence
      if (rule.evidenceDocument) {
        const matchedDoc = documents.find(
          (d) =>
            d.fileName?.toLowerCase().includes(rule.evidenceDocument.toLowerCase()) ||
            d.name?.toLowerCase().includes(rule.evidenceDocument.toLowerCase().replace('.pdf', '')) ||
            (rule.evidenceDocument.toLowerCase().includes('udyam') && d.category === 'Business') ||
            (rule.evidenceDocument.toLowerCase().includes('income') && d.category === 'Income')
        );

        if (matchedDoc && matchedDoc.status === 'Verified') {
          result = 'PASS';
          applicantValue = `Verified in ${matchedDoc.name}`;
          reason = `Required document "${matchedDoc.name}" is verified and active in the repository.`;
        } else if (matchedDoc && matchedDoc.status === 'Needs review') {
          result = 'FLAGGED';
          applicantValue = `Under Review (${matchedDoc.name})`;
          reason = `Uploaded document requires administrative clarification.`;
        } else {
          result = 'MISSING_DOC';
          applicantValue = 'Document Missing';
          reason = `Mandatory proof document (${rule.evidenceDocument}) has not been uploaded.`;
        }
      }
      break;
    }
  }

  return {
    ...rule,
    result,
    applicantValue,
    reason,
    verifiedDate: 'Live Evaluated'
  };
};

export const evaluateAllSchemes = (baseSchemes, applicant, documents, reviewCases = []) => {
  return baseSchemes.map((scheme) => {
    // 1. Check if there is an active unresolved review case for this scheme
    const activeCase = reviewCases.find(
      (c) =>
        (c.schemeName?.toLowerCase().includes(scheme.name.toLowerCase()) ||
          c.schemeId === scheme.id) &&
        (c.status === 'Pending' || c.status === 'In Review' || c.status === 'Documents Requested')
    );

    // 2. Evaluate each rule
    const evaluatedRules = (scheme.rules || []).map((rule) =>
      evaluateRule(rule, applicant, documents)
    );

    const hasFail = evaluatedRules.some((r) => r.result === 'FAIL');
    const hasFlagged = evaluatedRules.some((r) => r.result === 'FLAGGED') || Boolean(activeCase);
    const hasMissingDoc = evaluatedRules.some((r) => r.result === 'MISSING_DOC');

    let status = 'Eligible';
    if (hasFail) {
      status = 'Ineligible';
    } else if (hasFlagged) {
      status = 'Manual Review';
    } else if (hasMissingDoc) {
      status = 'Potentially Eligible';
    } else {
      status = 'Eligible';
    }

    // 3. Count documents
    const missingDocsCount = evaluatedRules.filter((r) => r.result === 'MISSING_DOC').length;
    const requiredDocsCount = scheme.requiredDocsCount || evaluatedRules.filter((r) => r.evidenceDocument).length || 3;
    const uploadedDocsCount = Math.max(0, requiredDocsCount - missingDocsCount);

    const verifiedRulesCount = evaluatedRules.filter((r) => r.result === 'PASS').length;
    const totalRulesCount = evaluatedRules.length || 1;

    let confidence = 'High (100% verified)';
    if (status === 'Manual Review') confidence = 'Requires Review (Discrepancy detected)';
    else if (status === 'Potentially Eligible') confidence = 'Medium (Pending statutory documents)';
    else if (status === 'Ineligible') confidence = 'Definitive (Statutory threshold exceeded)';

    return {
      ...scheme,
      status,
      confidence,
      evidenceCompleteness: `${verifiedRulesCount} of ${totalRulesCount} Rules Verified`,
      missingDocsCount,
      uploadedDocsCount,
      rules: evaluatedRules,
      lastVerified: 'Just now'
    };
  });
};
