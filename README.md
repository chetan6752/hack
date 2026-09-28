# 🏛️ myScheme Assistant — Financial Policy Discovery & Eligibility Assistant

> **National Hackathon Prototype**  
> A unified platform inspired by **[myScheme.gov.in](https://www.myscheme.gov.in/)** that enables citizens and MSME entrepreneurs to discover Central and State government schemes, verify eligibility with deterministic statutory rule evidence, estimate potential subsidies, and navigate official application portals.

---

## 🌟 Key Features

1. **myScheme.gov.in Government Design System**:
   - Official Indian Government color theme: crisp white cards, faint green (`#f0fdf4`) backgrounds, and emerald green (`#15803d`) accents.
   - Bilingual header with Indian Tricolor, national declaration, font size accessibility scalers (`A-`, `A`, `A+`), and toll-free helpline.
   - Spacious, decluttered top-navigation layout with full mobile drawer support.

2. **Dedicated Landing Page (`/`)**:
   - Central scheme search bar with 1-click popular filter chips.
   - Demographic Quick-Match tool (State, Age, Category/Occupation).
   - 8 Ministerial categories with direct scheme filters.
   - 4-Step transparent process flow.
   - Live featured opportunities preview and interactive FAQ accordion.

3. **Deterministic Rule Evaluation Engine (Zero AI Hallucinations)**:
   - Evaluates applicant profile and document parameters against official Gazette clauses using strict Boolean and mathematical AST operators.
   - Never uses speculative LLMs to make legal eligibility decisions.
   - Auditable source citations referencing Gazette circulars, volume numbers, and gazetted clauses.

4. **Document Intelligence & OCR Pipeline**:
   - 5-stage automated document verification pipeline (Upload → OCR/LayoutLM → Structured Extraction → Gateway Cross-Check → Verification).
   - Support for both native device file uploads and instant demonstration presets.
   - Key-value fact extraction (certified income, Udyam ID, turnover, dates).

5. **Human-in-the-Loop Manual Review Center**:
   - Automatic escalation when documents are outdated, ambiguous, or conflict across fiscal years.
   - Side-by-side evidence diff viewer (applicant proof vs statutory policy requirement).
   - Caseworker adjudication console (*Verify*, *Request Doc*, *Ineligible*, *Eligible*, *Escalate*).

6. **Interactive Benefit Estimation Engine**:
   - Transparent subvention formulas, tiered slab rates, and factor disclosures.
   - Interactive working capital loan slider recalculating annual benefits in real time.

7. **8-Stage Application Guide & Status Tracking**:
   - Step-by-step roadmap to apply on official ministerial portals without common mistakes.
   - Lifecycle milestone tracking matching state PFMS and departmental stages.

8. **Technical Architecture & Policy RAG Hub**:
   - Multi-layer system architecture breakdown.
   - Visual RAG vector retrieval pipeline demonstrating grounded semantic chunk retrieval.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 5, React Router v6
- **Styling**: Tailwind CSS v3 (custom GovTech palette), Lucide React
- **Visuals & Charts**: Recharts, SVG emblems
- **Performance**: Zero-dependency deterministic AST evaluator

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
| `/` | **Landing Page** | One-stop discovery portal, sector categories, search & FAQs |
| `/login` | **SSO Sign In** | MeriPehchaan SSO login with 1-click Hackathon Demo access |
| `/dashboard` | **Citizen Dashboard** | Executive KPI stack, recommended schemes, pending actions |
| `/schemes` | **Schemes Directory** | Multi-facet filtering by category, level, and eligibility status |
| `/schemes/:id` | **Scheme Details** | 6-tab deep dive with rule explainability and benefit calculator |
| `/eligibility` | **Decision Center** | Full evaluation matrix with statutory rule inspection drawer |
| `/documents` | **Documents Hub** | Document intelligence repository with 5-stage OCR pipeline |
| `/missing-documents` | **Gap Analysis** | Prioritized uploads ranked by subsidy unlock potential |
| `/review` | **Manual Review** | Caseworker adjudication queue with side-by-side evidence diffs |
| `/application-guide`| **Roadmap** | Step-by-step guidance for official government portal submission |
| `/tracking` | **Status Tracking** | Lifecycle tracking across departmental verification stages |
| `/profile` | **Citizen Profile** | MeriPehchaan verified dossier with JSON export |
| `/notifications` | **Action Center** | Real-time policy alerts and document clarification notices |
| `/admin` | **Policy Admin Hub** | Rule AST inspector and Gazette knowledge base library |
| `/architecture` | **Architecture** | Technical stack and system design principles |
| `/rag-demo` | **Policy RAG Flow** | Step-by-step vector retrieval and evidence grounding visualization |

---

## ⚖️ License & Disclaimer

Designed and developed for National Hackathon Evaluation. All scheme rules and circulars are modeled from official Gazette publications from the Ministry of MSME, Ministry of Finance, and Government of India portals.
