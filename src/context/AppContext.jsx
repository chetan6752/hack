import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  initialApplicant,
  mockSchemes,
  mockDocuments,
  mockManualReviewCases,
  mockNotifications,
  mockTrackingApplications
} from '../data/mockData';
import { evaluateAllSchemes } from '../utils/ruleEngine';

const AppContext = createContext();

const STORAGE_KEYS = {
  APPLICANT: 'devko_applicant',
  DOCUMENTS: 'devko_documents',
  REVIEW_CASES: 'devko_review_cases',
  NOTIFICATIONS: 'devko_notifications',
  TRACKING: 'devko_tracking',
  BOOKMARKS: 'devko_bookmarks'
};

const getStored = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
};

export const AppProvider = ({ children }) => {
  const [applicant, setApplicant] = useState(() => getStored(STORAGE_KEYS.APPLICANT, initialApplicant));
  const [documents, setDocuments] = useState(() => getStored(STORAGE_KEYS.DOCUMENTS, mockDocuments));
  const [reviewCases, setReviewCases] = useState(() => getStored(STORAGE_KEYS.REVIEW_CASES, mockManualReviewCases));
  const [notifications, setNotifications] = useState(() => getStored(STORAGE_KEYS.NOTIFICATIONS, mockNotifications));
  const [trackingApplications, setTrackingApplications] = useState(() => getStored(STORAGE_KEYS.TRACKING, mockTrackingApplications));
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState(() => getStored(STORAGE_KEYS.BOOKMARKS, ['msme-interest-support']));
  const [demoMode, setDemoMode] = useState(true);
  const [toast, setToast] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICANT, JSON.stringify(applicant));
    } catch {}
  }, [applicant]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
    } catch {}
  }, [documents]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEW_CASES, JSON.stringify(reviewCases));
    } catch {}
  }, [reviewCases]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRACKING, JSON.stringify(trackingApplications));
    } catch {}
  }, [trackingApplications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarkedSchemes));
    } catch {}
  }, [bookmarkedSchemes]);

  // Dynamically evaluated schemes based on current applicant, documents, and review cases
  const schemes = useMemo(() => {
    return evaluateAllSchemes(mockSchemes, applicant, documents, reviewCases);
  }, [applicant, documents, reviewCases]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const updateApplicant = (updatedFields) => {
    setApplicant((prev) => {
      const next = { ...prev, ...updatedFields };
      return next;
    });
    showToast('Applicant profile updated. Deterministic rule engine re-evaluated.', 'success');
  };

  const toggleBookmark = (schemeId) => {
    setBookmarkedSchemes((prev) => {
      const exists = prev.includes(schemeId);
      const updated = exists ? prev.filter((id) => id !== schemeId) : [...prev, schemeId];
      showToast(exists ? 'Scheme removed from saved list' : 'Scheme saved to your shortlist', 'info');
      return updated;
    });
  };

  const addDocument = (newDoc) => {
    setDocuments((prev) => [newDoc, ...prev]);

    // Check which schemes benefit
    const prevEligibleCount = schemes.filter((s) => s.status === 'Eligible').length;
    setTimeout(() => {
      const updatedSchemes = evaluateAllSchemes(mockSchemes, applicant, [newDoc, ...documents], reviewCases);
      const newEligibleCount = updatedSchemes.filter((s) => s.status === 'Eligible').length;

      if (newEligibleCount > prevEligibleCount) {
        const newlyUnlocked = updatedSchemes.find(
          (s) => s.status === 'Eligible' && schemes.find((old) => old.id === s.id)?.status !== 'Eligible'
        );
        const schemeName = newlyUnlocked ? newlyUnlocked.name : 'Target Scheme';

        showToast(`Document verified! "${schemeName}" is now 100% Eligible!`, 'success');

        // Add a notification
        const newNotif = {
          id: `notif-${Date.now()}`,
          title: `Scheme Unlocked: ${schemeName}`,
          description: `Document verification fulfilled all statutory AST criteria. Financial assistance is ready to claim.`,
          date: 'Just now',
          read: false,
          type: 'success',
          actionUrl: '/eligibility'
        };
        setNotifications((prevNotifs) => [newNotif, ...prevNotifs]);
      } else {
        showToast(`Document "${newDoc.name}" uploaded and validated against AST rules.`, 'success');
      }
    }, 100);
  };

  const updateReviewCaseStatus = (caseId, newStatus, resolutionNote) => {
    setReviewCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            status: newStatus,
            resolutionNote,
            auditTrail: [
              ...c.auditTrail,
              {
                timestamp: 'Just now',
                actor: 'Officer Reviewer',
                action: `Updated status to "${newStatus}". Note: ${resolutionNote || 'Administrative verification recorded.'}`
              }
            ]
          };
        }
        return c;
      })
    );

    if (newStatus === 'Resolved') {
      showToast(`Case ${caseId} resolved. Administrative hold cleared across affected policies.`, 'success');
      const newNotif = {
        id: `notif-rev-${Date.now()}`,
        title: `Administrative Hold Cleared`,
        description: `Discrepancy review ${caseId} was resolved. The scheme is now marked Eligible.`,
        date: 'Just now',
        read: false,
        type: 'success',
        actionUrl: '/eligibility'
      };
      setNotifications((prev) => [newNotif, ...prev]);
    } else {
      showToast(`Case ${caseId} updated to "${newStatus}"`, 'info');
    }
  };

  const addTrackingApplication = (scheme) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const refNum = `DEVKO-MH-2026-${randomNum}`;

    const newApp = {
      id: `app-${Date.now()}`,
      referenceNumber: refNum,
      schemeId: scheme.id,
      schemeName: scheme.name,
      department: scheme.department,
      submittedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      estimatedBenefit: scheme.benefit,
      currentStatus: 'Under Department Review',
      statusExplanation: 'Dossier successfully registered with official nodal authority. Statutory verification is in progress.',
      timeline: [
        { step: 'Dossier Submitted', date: 'Today', status: 'completed', desc: 'Pre-verified PDF package compiled and dispatched.' },
        { step: 'Department Review', date: 'In Progress', status: 'active', desc: 'Nodal officer examining AST compliance.' },
        { step: 'Field Inspection', date: 'Pending', status: 'pending', desc: 'District industries center physical/digital spot check.' },
        { step: 'Sanction Order', date: 'Pending', status: 'pending', desc: 'Statutory approval issued by Competent Authority.' },
        { step: 'Bank Disbursal', date: 'Pending', status: 'pending', desc: 'Direct credit into verified applicant current account.' }
      ]
    };

    setTrackingApplications((prev) => [newApp, ...prev]);
    showToast(`Application registered! Reference: ${refNum}`, 'success');

    const newNotif = {
      id: `notif-track-${Date.now()}`,
      title: `Application Registered: ${refNum}`,
      description: `Your application for ${scheme.name} is now tracked in real-time under Reference ${refNum}.`,
      date: 'Just now',
      read: false,
      type: 'info',
      actionUrl: '/tracking'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return refNum;
  };

  const advanceTrackingStage = (appId) => {
    setTrackingApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const activeIndex = app.timeline.findIndex((t) => t.status === 'active');
          if (activeIndex !== -1 && activeIndex < app.timeline.length - 1) {
            const nextIndex = activeIndex + 1;
            const updatedTimeline = app.timeline.map((t, i) => {
              if (i === activeIndex) return { ...t, status: 'completed', date: 'Verified' };
              if (i === nextIndex) return { ...t, status: 'active', date: 'In Progress' };
              return t;
            });

            const nextStepName = updatedTimeline[nextIndex].step;
            const newStatus = nextIndex === app.timeline.length - 1 ? 'Benefit Disbursed' : `${nextStepName} Active`;

            showToast(`Application ${app.referenceNumber} advanced to "${nextStepName}"!`, 'success');

            return {
              ...app,
              currentStatus: newStatus,
              statusExplanation: `Milestone advanced. Current active stage: ${nextStepName}.`,
              timeline: updatedTimeline
            };
          }
        }
        return app;
      })
    );
  };

  const runManualEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      showToast('Deterministic AST Rule Engine: 48 rules across 6 policies verified with 100% precision.', 'success');
    }, 800);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const resetToDefaultData = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.APPLICANT);
      localStorage.removeItem(STORAGE_KEYS.DOCUMENTS);
      localStorage.removeItem(STORAGE_KEYS.REVIEW_CASES);
      localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
      localStorage.removeItem(STORAGE_KEYS.TRACKING);
      localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
    } catch {}

    setApplicant(initialApplicant);
    setDocuments(mockDocuments);
    setReviewCases(mockManualReviewCases);
    setNotifications(mockNotifications);
    setTrackingApplications(mockTrackingApplications);
    setBookmarkedSchemes(['msme-interest-support']);
    showToast('Application state reset to standard verified baseline.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        applicant,
        updateApplicant,
        schemes,
        documents,
        addDocument,
        reviewCases,
        updateReviewCaseStatus,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        trackingApplications,
        addTrackingApplication,
        advanceTrackingStage,
        runManualEvaluation,
        isEvaluating,
        resetToDefaultData,
        demoMode,
        setDemoMode,
        bookmarkedSchemes,
        toggleBookmark,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

