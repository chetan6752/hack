# 🧭 DevKo — Financial Policy & Scheme Discovery Platform

> **DevKo** is an high-performance intelligence platform that empowers citizens, entrepreneurs, and MSME business owners to discover financial schemes, subsidies, and welfare policies. Built with a deterministic rule evaluation engine, DevKo checks eligibility with verified facts, estimates potential benefits, and guides applicants step-by-step — with zero government affiliation, zero third-party platform dependencies, and zero AI hallucinations.

---

## 🌟 Key Features

1. **Privacy-Preserving Architecture**:
   - DevKo operates completely independently and is not bound to or an assistant of any government portal or third-party service.
   - Transparent, privacy-preserving parameter evaluation directly from verified applicant facts.

2. **Fully Device-Friendly & Responsive UI**:
   - Clean, modern aesthetic with crisp white cards, faint emerald accents (`#f0fdf4`), and dark green typography.
   - Optimized for all screen sizes (mobile viewports from 360px up to 4K displays).
   - Touch-friendly drawer navigation, flexible search inputs, and auto-adapting KPI cards with zero horizontal clipping.

3. **Dedicated Landing Page (`/`)**:
   - Responsive central search bar with 1-click popular search tags.
   - Instant demographic assessment tool (State, Age, Category/Sector).
   - 8 Industry sector categories with filtered scheme navigation.
   - 4-Step transparent process flow and interactive FAQ accordion.

4. **Deterministic Rule Evaluation Engine (Zero AI Hallucinations)**:
   - Evaluates applicant profile data and document parameters against official statutory criteria using strict Boolean and mathematical AST operators.
   - Never relies on speculative generative AI to make eligibility decisions.
   - Provides transparent rule citations referencing public policy notifications.

5. **Document Intelligence & Repository (`/documents`)**:
   - 5-stage automated document verification pipeline (Upload → OCR → Structured Fact Extraction → Parameter Check → Verification).
   - Supports device file uploads and instant demonstration profiles.
   - Automated fact extraction (turnover, Udyam registration ID, audited net income, domicile).

6. **Prioritized Gap Analysis (`/missing-documents`)**:
   - Ranked checklist highlighting which missing certificates block the highest financial assistance.
   - Direct upload shortcuts to quickly unlock pending eligibility.

7. **Human-in-the-Loop Review Center (`/review`)**:
   - Automatic escalation when documents require clarification (such as prior fiscal year audits).
   - Side-by-side evidence diff viewer (applicant proof vs statutory policy requirement).
   - Caseworker adjudication console (*Verify*, *Request Doc*, *Ineligible*, *Eligible*, *Escalate*).

8. **Interactive Benefit Estimation Engine**:
   - Transparent subvention formulas, tiered slab rates, and factor disclosures.
   - Interactive working capital loan sliders recalculating annual financial savings in real time.

9. **Step-by-Step Application Guide & Tracking (`/application-guide`, `/tracking`)**:
   - Comprehensive checklist to prepare compliant application dossiers.
   - Multi-milestone status tracker reflecting departmental and PFMS disbursement stages.

10. **Technical Architecture & Policy RAG Hub (`/architecture`, `/rag-demo`)**:
    - Multi-layer decoupled architecture breakdown.
    - Visual RAG vector retrieval pipeline demonstrating grounded semantic policy chunk retrieval.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 5, React Router v6
- **Styling**: Tailwind CSS v3 (curated DevKo emerald/slate theme), Lucide React
- **Visuals & Charts**: Recharts, SVG iconography
- **Engine**: Zero-dependency deterministic AST rule evaluation

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/chetan6752/hack.git
cd hack

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🗺️ Application Routes

| Route | Page | Description |
|---|---|---|
| `/` | **Landing Page** | Central scheme search, sector categories, demographic quick assessment, and FAQs |
| `/login` | **Sign In** | Secure citizen sign in with 1-click demonstration persona access |
| `/dashboard` | **Citizen Dashboard** | Executive KPI stack, recommended schemes, and pending action items |
| `/schemes` | **Schemes Directory** | Multi-facet filtering by sector category, level, and eligibility status |
| `/schemes/:id` | **Scheme Details** | 6-tab deep dive with rule explainability and interactive benefit calculator |
| `/eligibility` | **Decision Center** | Full evaluation matrix with statutory rule inspection drawer |
| `/documents` | **Documents Hub** | Document intelligence repository with 5-stage verification pipeline |
| `/missing-documents` | **Gap Analysis** | Prioritized uploads ranked by subsidy unlock potential |
| `/review` | **Manual Review** | Review queue with side-by-side evidence diffs for caseworker inspection |
| `/application-guide`| **Roadmap** | Step-by-step guidance for official portal submission |
| `/tracking` | **Status Tracking** | Lifecycle tracking across departmental verification stages |
| `/profile` | **Applicant Profile** | Structured applicant dossier and parameter inspection with JSON export |
| `/notifications` | **Alerts Hub** | Real-time policy alerts and document clarification notices |
| `/admin` | **Policy Admin Hub** | Rule AST inspector and statutory policy knowledge base library |
| `/architecture` | **Architecture** | Technical stack and system design principles |
| `/rag-demo` | **Policy RAG Flow** | Step-by-step vector retrieval and evidence grounding visualization |

---

## ⚖️ Independent Platform Disclaimer

**DevKo** is an independent financial policy discovery and eligibility intelligence platform. DevKo is **not** an assistant of myScheme, nor is it affiliated with, bound to, or endorsed by any government entity or ministry. All scheme rules, eligibility parameters, and guidelines are structured from publicly available circulars and official gazette notifications for informational transparency.
