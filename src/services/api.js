// DevKo API Client Bridge
// Seamlessly communicates with Python FastAPI backend (http://127.0.0.1:8000)
// Gracefully falls back to local reactive storage if backend server is offline.

const API_BASE = 'http://127.0.0.1:8000/api';

export const apiClient = {
  // Health
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch (e) {
      return { status: 'offline', mode: 'client-side reactive fallback' };
    }
  },

  // Applicant
  getApplicant: async () => {
    const res = await fetch(`${API_BASE}/applicant`);
    if (!res.ok) throw new Error('Failed to fetch applicant');
    return await res.json();
  },

  updateApplicant: async (fields) => {
    const res = await fetch(`${API_BASE}/applicant`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    if (!res.ok) throw new Error('Failed to update applicant');
    return await res.json();
  },

  // Schemes
  getSchemes: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/schemes${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch schemes');
    return await res.json();
  },

  // Eligibility
  evaluateEligibility: async () => {
    const res = await fetch(`${API_BASE}/eligibility/evaluate`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to evaluate eligibility');
    return await res.json();
  },

  // Documents
  uploadDocument: async (docData) => {
    const res = await fetch(`${API_BASE}/documents/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(docData)
    });
    if (!res.ok) throw new Error('Failed to upload document');
    return await res.json();
  },

  // Tracking
  applyForScheme: async (schemeId) => {
    const res = await fetch(`${API_BASE}/tracking/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schemeId })
    });
    if (!res.ok) throw new Error('Failed to register application');
    return await res.json();
  },

  advanceTrackingStage: async (appId) => {
    const res = await fetch(`${API_BASE}/tracking/${appId}/advance`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to advance application');
    return await res.json();
  },

  // RAG Query
  queryPolicyRAG: async (question) => {
    const res = await fetch(`${API_BASE}/rag/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    if (!res.ok) throw new Error('Failed to query policy RAG');
    return await res.json();
  }
};
