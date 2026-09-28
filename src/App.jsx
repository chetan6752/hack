import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { SchemesPage } from './pages/SchemesPage';
import { SchemeDetailPage } from './pages/SchemeDetailPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { MissingDocsPage } from './pages/MissingDocsPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { ApplicationGuidePage } from './pages/ApplicationGuidePage';
import { TrackingPage } from './pages/TrackingPage';
import { ManualReviewPage } from './pages/ManualReviewPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AdminSchemesPage } from './pages/AdminSchemesPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { RagExplainerPage } from './pages/RagExplainerPage';

export const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Standalone Landing & Login */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected / AppShell Routes */}
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/schemes" element={<SchemesPage />} />
            <Route path="/schemes/:id" element={<SchemeDetailPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/missing-documents" element={<MissingDocsPage />} />
            <Route path="/eligibility" element={<EligibilityPage />} />
            <Route path="/application-guide" element={<ApplicationGuidePage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/review" element={<ManualReviewPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/admin" element={<AdminSchemesPage />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
            <Route path="/rag-demo" element={<RagExplainerPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
