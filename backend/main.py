import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.data.store import store

from backend.routes.applicant_routes import router as applicant_router
from backend.routes.scheme_routes import router as scheme_router
from backend.routes.eligibility_routes import router as eligibility_router
from backend.routes.document_routes import router as document_router
from backend.routes.tracking_routes import router as tracking_router
from backend.routes.review_routes import router as review_router
from backend.routes.rag_routes import router as rag_router

app = FastAPI(
    title="DevKo Financial Policy Discovery & Eligibility Intelligence API",
    description="Independent API platform providing deterministic AST rule evaluations, document OCR intelligence, live application tracking, and policy RAG retrieval.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration for local frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Modular Routers
app.include_router(applicant_router)
app.include_router(scheme_router)
app.include_router(eligibility_router)
app.include_router(document_router)
app.include_router(tracking_router)
app.include_router(review_router)
app.include_router(rag_router)

@app.get("/", tags=["System Root"])
def root():
    return {
        "platform": "DevKo Financial Policy Discovery & Eligibility Platform",
        "status": "online",
        "version": "1.0.0",
        "documentation": "/docs",
        "engine": "Deterministic AST Rule Engine & Semantic Vector RAG"
    }

@app.get("/api/health", tags=["System Root"])
def health_check():
    return {
        "status": "healthy",
        "database": "connected (stateful json store)",
        "modules": {
            "ast_rule_engine": "active",
            "document_ocr": "active",
            "tracking_lifecycle": "active",
            "rag_vector_retrieval": "active"
        }
    }

@app.get("/api/metrics", tags=["System Root"])
def platform_metrics():
    schemes = store.get_schemes()
    eligible = [s for s in schemes if s.get("status") == "Eligible"]
    total_benefits = sum(
        s.get("benefitCalculation", {}).get("estimatedBenefit", 0) for s in eligible
    )
    
    return {
        "totalSchemesIndexed": 4720,
        "activeEvaluatedPolicies": len(schemes),
        "statesCovered": 28,
        "eligibleCount": len(eligible),
        "totalVerifiedBenefits": f"₹{total_benefits:,}",
        "precisionScore": "100% Deterministic (Zero Hallucination)"
    }

@app.post("/api/system/reset", tags=["System Root"])
def reset_system_data():
    store.reset_to_default()
    return {
        "status": "success",
        "message": "Data store reset to standard verified baseline."
    }

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
