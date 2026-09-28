import React, { createContext, useContext, useState } from 'react';
import {
  initialApplicant,
  mockSchemes,
  mockDocuments,
  mockManualReviewCases,
  mockNotifications,
  mockTrackingApplications
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [applicant, setApplicant] = useState(initialApplicant);
  const [schemes, setSchemes] = useState(mockSchemes);
  const [documents, setDocuments] = useState(mockDocuments);
  const [reviewCases, setReviewCases] = useState(mockManualReviewCases);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [trackingApplications, setTrackingApplications] = useState(mockTrackingApplications);
  const [demoMode, setDemoMode] = useState(true);
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState(['msme-interest-support']);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const updateApplicant = (updatedFields) => {
    setApplicant((prev) => ({
      ...prev,
      ...updatedFields,
    }));
    showToast('Applicant profile updated successfully', 'success');
  };

  const toggleBookmark = (schemeId) => {
    setBookmarkedSchemes((prev) => {
      const exists = prev.includes(schemeId);
      const updated = exists ? prev.filter((id) => id !== schemeId) : [...prev, schemeId];
      showToast(exists ? 'Scheme removed from saved' : 'Scheme saved to your shortlist', 'info');
      return updated;
    });
  };

  const addDocument = (newDoc) => {
    setDocuments((prev) => [newDoc, ...prev]);
    showToast(`Document "${newDoc.name}" uploaded and processed`, 'success');
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
                actor: 'Officer (Demo User)',
                action: `Updated status to "${newStatus}". Note: ${resolutionNote || 'Manual action recorded.'}`
              }
            ]
          };
        }
        return c;
      })
    );
    showToast(`Case ${caseId} updated to ${newStatus}`, 'success');
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
