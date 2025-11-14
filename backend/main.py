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
    # TODO: Implement filtering logic
    # =============================================================================
    # Filter 1: Search filter (name, position, company)
    # if search:
    #     search_lower = search.lower()
    #     candidates = [c for c in candidates
    #                   if search_lower in c['name'].lower() or
    #                      search_lower in c['position'].lower() or
    #                      search_lower in c['company'].lower()]

    # Filter 2: Application type filter
    # HINT: application_type can be a list like ['active', 'archived']
    # if application_type:
    #     candidates = [c for c in candidates
    #                   if c['application_type'] in application_type]

    # Filter 3: Source filter
    # HINT: Similar to application_type, filter by source field
    # if source:
    #     candidates = [c for c in candidates
    #                   if c['source'] in source]

    # Filter 4: Job ID filter
    # HINT: Filter by exact job_id match
    # if job_id:
    #     candidates = [c for c in candidates
    #                   if c['job_id'] == job_id]

    # =============================================================================
    # TODO: Implement sorting logic
    # =============================================================================
    # Sort by the specified field and order
    # HINT: Use Python's sorted() function with a key and reverse parameter
    #
    # Example for sorting by last_activity:
    # if sort_by == 'last_activity':
    #     candidates = sorted(
    #         candidates,
    #         key=lambda x: x['last_activity'],
    #         reverse=(sort_order == 'desc')
    #     )
    # elif sort_by == 'name':
    #     candidates = sorted(
    #         candidates,
    #         key=lambda x: x['name'].lower(),
    #         reverse=(sort_order == 'desc')
    #     )

    # =============================================================================
    # TODO: Implement pagination logic
    # =============================================================================
    # Calculate pagination indices and slice the data
    # HINT:
    # total = len(candidates)  # After filtering!
    # start_idx = (page - 1) * per_page
    # end_idx = start_idx + per_page
    # paginated_candidates = candidates[start_idx:end_idx]
    # total_pages = (total + per_page - 1) // per_page  # Ceiling division

    # =============================================================================
    # TODO: Return properly formatted response
    # =============================================================================
    # Your response should include:
    # - candidates: The paginated list
    # - total: Total count after filtering
    # - page: Current page number
    # - per_page: Items per page
    # - total_pages: Total number of pages

    # PLACEHOLDER - Replace with your implementation
    return {
        "candidates": candidates[:per_page],  # TODO: Use paginated_candidates
        "total": len(candidates),
        "page": page,
        "per_page": per_page,
        "total_pages": (len(candidates) + per_page - 1) // per_page
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
