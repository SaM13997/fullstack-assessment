# Backend API

FastAPI backend for the Candidate Management application.

## Setup

1. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment**
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - Windows:
     ```bash
     venv\Scripts\activate
     ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server**
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`

## API Documentation

FastAPI provides automatic interactive documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

### GET /api/candidates

Get paginated and filtered list of candidates.

**Query Parameters:**
- `page` (int, default: 1) - Page number
- `per_page` (int, default: 5) - Items per page (max 50)
- `search` (string, optional) - Search by name, position, or company
- `sort` (string, default: "activity_desc") - Sort order:
  - `activity_desc` - Last activity (newest first)
  - `activity_asc` - Last activity (oldest first)
  - `name_asc` - Name A-Z
  - `name_desc` - Name Z-A

**Response:**
```json
{
  "candidates": [...],
  "total": 20,
  "page": 1,
  "per_page": 5,
  "total_pages": 4
}
```

## TODO: Implementation Tasks

The main endpoint is partially implemented. You need to add:

1. **Filtering Logic**
   - Filter candidates by search term (check name, position, company)
   - Make search case-insensitive

2. **Sorting Logic**
   - Implement sorting by last_activity (date)
   - Implement sorting by name (alphabetical)
   - Handle both ascending and descending order

3. **Pagination Logic**
   - Calculate the correct slice of data based on page and per_page
   - Ensure page bounds are respected

## Example Implementation Hints

### Filtering
```python
# Filter by search term
if search:
    search_lower = search.lower()
    candidates = [
        c for c in candidates
        if search_lower in c['name'].lower()
        or search_lower in c['position'].lower()
        or search_lower in c['company'].lower()
    ]
```

### Sorting
```python
# Sort by field
if sort == 'activity_desc':
    candidates.sort(key=lambda x: x['last_activity'], reverse=True)
elif sort == 'name_asc':
    candidates.sort(key=lambda x: x['name'].lower())
# etc.
```

### Pagination
```python
# Calculate slice
start_idx = (page - 1) * per_page
end_idx = start_idx + per_page
paginated_candidates = candidates[start_idx:end_idx]
```

## Testing

You can test the API using:
- The browser: http://localhost:8000/api/candidates?page=1&search=john
- curl: `curl "http://localhost:8000/api/candidates?page=1&per_page=5"`
- The Swagger UI: http://localhost:8000/docs

## Notes

- CORS is already configured for `http://localhost:5173` (Vite's default port)
- The data is loaded from `../mock-data/candidates.json`
- The API returns JSON responses
