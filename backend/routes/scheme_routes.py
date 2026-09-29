from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from backend.data.store import store

router = APIRouter(prefix="/api/schemes", tags=["Schemes & Subsidies"])

@router.get("")
def list_schemes(
    search: Optional[str] = Query(None, description="Search keyword"),
    category: Optional[str] = Query(None, description="Filter category"),
    status: Optional[str] = Query(None, description="Filter status (Eligible, Potential, etc.)"),
    level: Optional[str] = Query(None, description="Filter level (Central, State)"),
    sort_by: Optional[str] = Query("relevance", description="Sort by relevance, benefit, or missingDocs")
):
    schemes = store.get_schemes()
    filtered = []

    for s in schemes:
        if search:
            q = search.lower()
            match = (
                q in s.get("name", "").lower() or
                q in s.get("description", "").lower() or
                q in s.get("department", "").lower() or
                q in s.get("category", "").lower()
            )
            if not match:
                continue

        if category and category.lower() != "all":
            if category.lower() not in s.get("category", "").lower():
                continue

        if status and status.lower() != "all":
            if status.lower() != s.get("status", "").lower():
                continue

        if level and level.lower() != "all":
            if level.lower() not in s.get("level", "").lower():
                continue

        filtered.append(s)

    if sort_by == "relevance":
        filtered.sort(key=lambda x: x.get("relevanceScore", 0), reverse=True)
    elif sort_by == "missingDocs":
        filtered.sort(key=lambda x: x.get("missingDocsCount", 0))

    return {
        "count": len(filtered),
        "schemes": filtered
    }

@router.get("/{scheme_id}")
def get_scheme_by_id(scheme_id: str):
    schemes = store.get_schemes()
    scheme = next((s for s in schemes if s["id"] == scheme_id), None)
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme policy not found")
    return scheme

@router.post("/{scheme_id}/bookmark")
def bookmark_scheme(scheme_id: str):
    bookmarks = store.toggle_bookmark(scheme_id)
    is_saved = scheme_id in bookmarks
    return {
        "schemeId": scheme_id,
        "isBookmarked": is_saved,
        "bookmarkedList": bookmarks
    }
