from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import json
from pathlib import Path

app = FastAPI(title="Candidate Management API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load mock data
DATA_FILE = Path(__file__).parent.parent / "mock-data" / "candidates.json"

def load_candidates():
    """Load candidates from JSON file"""
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    return data["candidates"]


@app.get("/")
def read_root():
    """Root endpoint"""
    return {"message": "Candidate Management API", "docs": "/docs"}


@app.get("/api/candidates")
def get_candidates(
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(5, ge=1, le=50, description="Items per page"),
    search: Optional[str] = Query(None, description="Search by name, position, or company"),
    sort_by: Optional[str] = Query("last_activity", description="Field to sort by (last_activity, name)"),
    sort_order: Optional[str] = Query("desc", description="Sort order (asc, desc)"),
    application_type: Optional[List[str]] = Query(None, description="Filter by application type"),
    source: Optional[List[str]] = Query(None, description="Filter by source"),
    job_id: Optional[str] = Query(None, description="Filter by job ID"),
):
    """
    Get paginated and filtered candidates

    YOUR TASK: Implement a complete backend API with:
    1. Multi-field filtering (search, application_type, source, job_id)
    2. Flexible sorting (by last_activity or name, asc or desc)
    3. Server-side pagination
    4. Proper response formatting

    This is the core of the fullstack assessment!
    """

    # Step 1: Load all candidates
    candidates = load_candidates()

    # =============================================================================
    # Filtering logic
    # =============================================================================
    if search:
        search_lower = search.lower()
        candidates = [
            c
            for c in candidates
            if search_lower in c["name"].lower()
            or search_lower in c["position"].lower()
            or search_lower in c["company"].lower()
        ]

    if application_type:
        allowed_types = {value.lower() for value in application_type}
        candidates = [
            c
            for c in candidates
            if c.get("application_type", "").lower() in allowed_types
        ]

    if source:
        allowed_sources = {value.lower() for value in source}
        candidates = [
            c
            for c in candidates
            if c.get("source", "").lower() in allowed_sources
        ]

    if job_id:
        candidates = [c for c in candidates if c.get("job_id") == job_id]

    # =============================================================================
    # Sorting logic
    # =============================================================================
    normalized_sort_by = (sort_by or "last_activity").lower()
    normalized_sort_order = (sort_order or "desc").lower()

    if normalized_sort_by not in {"last_activity", "name"}:
        normalized_sort_by = "last_activity"

    if normalized_sort_order not in {"asc", "desc"}:
        normalized_sort_order = "desc"

    reverse = normalized_sort_order == "desc"

    if normalized_sort_by == "name":
        candidates = sorted(
            candidates,
            key=lambda x: x["name"].lower(),
            reverse=reverse,
        )
    else:  # default to last_activity
        candidates = sorted(
            candidates,
            key=lambda x: x["last_activity"],
            reverse=reverse,
        )

    # =============================================================================
    # Pagination logic & response formatting
    # =============================================================================
    total = len(candidates)
    total_pages = (total + per_page - 1) // per_page if total > 0 else 0

    start_idx = (page - 1) * per_page
    end_idx = start_idx + per_page
    if total == 0 or start_idx >= total:
        paginated_candidates = []
    else:
        paginated_candidates = candidates[start_idx:end_idx]

    return {
        "candidates": paginated_candidates,
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
