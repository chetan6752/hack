from fastapi import APIRouter
from backend.models.rag import RagQueryRequest, RagQueryResponse
from backend.services.rag_service import query_policy_circulars
from backend.data.mock_data import MOCK_RAG_QUERIES

router = APIRouter(prefix="/api/rag", tags=["Policy RAG & Retrieval Engine"])

@router.post("/query", response_model=RagQueryResponse)
def execute_rag_query(req: RagQueryRequest):
    return query_policy_circulars(req.question)

@router.get("/sample-queries")
def get_sample_queries():
    return MOCK_RAG_QUERIES
