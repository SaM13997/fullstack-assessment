# Detailed Requirements

This document breaks down the assessment into specific, actionable tasks.

## Reference Design

**Figma Link**: [View the reference design here](https://www.figma.com/design/gZL1X2fSo0MzExOIXNW1hz/Sample-Pages?node-id=1-1390&t=00CymjmcEhM0QfRK-11)

The frontend UI is already built to match this design. Your focus is on implementing the backend logic and wiring it to the pre-built frontend.

## Time Allocation

**Total: 1 hour and 30 minutes**

**Focus areas:**
- **Part 1: Backend Multi-field Filtering**
- **Part 2: Backend Sorting Logic**
- **Part 3: Backend Pagination & Response Format**
- **Part 4: Frontend API Integration**
- **Part 5: Frontend Filter UI**
- **Part 6: Testing & Polish**

---

## Part 1: Backend - Multi-field Filtering

**File**: `backend/main.py`
**Location**: Lines 61-88 (TODO comments)

Implement four types of filters in the `/api/candidates` endpoint:

### 1.1 Search Filter
- [ ] Filter candidates by search term (case-insensitive)
- [ ] Search should match against: `name`, `position`, or `company`
- [ ] If search query is provided, filter the candidates list
- [ ] Example: search="john" should match "John Smith", "Johnson Corp", etc.

**Implementation hint:**
```python
if search:
    search_lower = search.lower()
    candidates = [c for c in candidates
                  if search_lower in c['name'].lower() or
                     search_lower in c['position'].lower() or
                     search_lower in c['company'].lower()]
```

### 1.2 Application Type Filter
- [ ] Filter by `application_type` field (list parameter)
- [ ] Possible values: `"active"`, `"archived"`
- [ ] Frontend may send multiple values: `application_type=["active", "archived"]`
- [ ] Only include candidates whose `application_type` is in the list

**Implementation hint:**
```python
if application_type:
    candidates = [c for c in candidates
                  if c['application_type'] in application_type]
```

### 1.3 Source Filter
- [ ] Filter by `source` field (list parameter)
- [ ] Possible values: `"LinkedIn"`, `"Indeed"`, `"Career Page"`, `"Referral"`, `"GitHub"`, etc.
- [ ] Frontend may send multiple values
- [ ] Only include candidates whose `source` is in the list

### 1.4 Job ID Filter
- [ ] Filter by exact `job_id` match (string parameter)
- [ ] Example: `job_id="job-123"` should only return candidates with that job ID
- [ ] This is an exact match filter, not a partial match

---

## Part 2: Backend - Sorting Logic

**File**: `backend/main.py`
**Location**: Lines 90-107 (TODO comments)

Implement flexible sorting with two fields and two directions:

### 2.1 Sort by Last Activity (Date)
- [ ] When `sort_by="last_activity"`, sort candidates by the `last_activity` field
- [ ] `last_activity` is an ISO timestamp string (e.g., `"2024-10-25T14:32:00"`)
- [ ] Support ascending order (`sort_order="asc"` - oldest first)
- [ ] Support descending order (`sort_order="desc"` - newest first, default)

**Implementation hint:**
```python
if sort_by == 'last_activity':
    candidates = sorted(
        candidates,
        key=lambda x: x['last_activity'],
        reverse=(sort_order == 'desc')
    )
```

### 2.2 Sort by Name (Alphabetical)
- [ ] When `sort_by="name"`, sort candidates alphabetically by the `name` field
- [ ] Make it case-insensitive (convert to lowercase for sorting)
- [ ] Support ascending order (`sort_order="asc"` - A to Z, default)
- [ ] Support descending order (`sort_order="desc"` - Z to A)

**Implementation hint:**
```python
elif sort_by == 'name':
    candidates = sorted(
        candidates,
        key=lambda x: x['name'].lower(),
        reverse=(sort_order == 'desc')
    )
```

### 2.3 Default Sorting
- [ ] If no `sort_by` is provided, default to `last_activity` descending
- [ ] Ensure sorting happens after all filtering
- [ ] **Note**: Sorting is handled entirely server-side. No frontend UI controls for sorting are required.

---

## Part 3: Backend - Pagination & Response Format

**File**: `backend/main.py`
**Location**: Lines 110-137 (TODO comments)

### 3.1 Server-side Pagination
- [ ] Calculate the correct slice of candidates based on `page` and `per_page`
- [ ] Default: `page=1`, `per_page=5`
- [ ] Formula: `start_idx = (page - 1) * per_page`, `end_idx = start_idx + per_page`
- [ ] Handle edge cases: if page is out of bounds, return empty list

**Implementation hint:**
```python
# Calculate pagination
total = len(candidates)
total_pages = (total + per_page - 1) // per_page  # Ceiling division

start_idx = (page - 1) * per_page
end_idx = start_idx + per_page
paginated_candidates = candidates[start_idx:end_idx]
```

### 3.2 Response Format
- [ ] Return a JSON response with the following structure:
```json
{
  "candidates": [...],
  "total": 20,
  "page": 1,
  "per_page": 5,
  "total_pages": 4
}
```

**Required fields:**
- `candidates`: List of candidate objects (paginated)
- `total`: Total number of candidates after filtering
- `page`: Current page number
- `per_page`: Items per page
- `total_pages`: Total number of pages (calculated from total and per_page)

### 3.3 Edge Cases
Handle these scenarios properly:
- [ ] **Page out of bounds**: If `page` > `total_pages`, return empty `candidates` list but include correct `total` and `total_pages` values
- [ ] **No results after filtering**: Return `{ "candidates": [], "total": 0, "page": 1, "per_page": 5, "total_pages": 0 }`
- [ ] **Invalid sort field**: If `sort_by` is not recognized, default to `last_activity` descending
- [ ] Ensure `total_pages` is calculated correctly using ceiling division: `(total + per_page - 1) // per_page`

---

## Part 4: Frontend - API Integration

**File**: `frontend/src/App.tsx`
**Location**: Lines 15-27 (commented useEffect)

### 4.1 Implement useEffect for API Calls
- [ ] Uncomment and complete the `useEffect` hook in App.tsx
- [ ] Fetch candidates from `http://localhost:8000/api/candidates`
- [ ] Pass query parameters: `page`, `per_page`, `search`, `sort_by`, `sort_order`, filters
- [ ] Update state with the response: `candidates`, `total`, `totalPages`

**Implementation hint:**
```typescript
useEffect(() => {
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: '5',
        ...(search && { search }),
        // Add more params as needed
      });

      const response = await fetch(`http://localhost:8000/api/candidates?${params}`);
      const data = await response.json();

      setCandidates(data.candidates);
      setTotal(data.total);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchCandidates();
}, [page, search]); // Re-fetch when page or search changes
```

### 4.2 Loading State
- [ ] Show a loading indicator while fetching (optional but recommended)
- [ ] You can use a simple "Loading..." text or skeleton loaders

### 4.3 Error Handling
- [ ] Add basic error handling in case the API fails
- [ ] Log errors to console at minimum

---

## Part 5: Frontend - Filter UI

**File**: `frontend/src/components/Sidebar.tsx`
**Location**: Lines 52-83 (CollapsibleSection components)

### 5.1 Add Filter Checkboxes
Pick 2-3 filter sections and add working checkboxes inside them:

**Recommended sections to implement:**
- [ ] **Application Type** - Add checkboxes for "Active" and "Archived"
- [ ] **Source** - Add checkboxes for "LinkedIn", "Indeed", "Career Page", "Referral"
- [ ] **Jobs** (optional) - Add checkboxes for available job IDs

**Implementation example:**
```typescript
<CollapsibleSection title="Application Type" isOpen={true}>
  <div className="space-y-2">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={filters.application_type?.includes('active')}
        onChange={(e) => handleFilterChange('application_type', 'active', e.target.checked)}
      />
      <span>Active</span>
    </label>
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={filters.application_type?.includes('archived')}
        onChange={(e) => handleFilterChange('application_type', 'archived', e.target.checked)}
      />
      <span>Archived</span>
    </label>
  </div>
</CollapsibleSection>
```

### 5.2 Wire Filters to API
- [ ] When checkboxes are toggled, update the filter state
- [ ] Pass the filters to your API fetch call
- [ ] For list parameters, send them as arrays: `application_type=["active"]`

**Note**: The CollapsibleSection component already has expand/collapse functionality. You just need to add checkbox children inside it.

---

## Part 6: Testing & Polish

### 6.1 Backend Testing
- [ ] Visit `http://localhost:8000/docs` to test your API
- [ ] Test filtering: Try different search terms, filters
- [ ] Test sorting: Try sorting by name and activity in both directions
- [ ] Test pagination: Navigate through pages, test edge cases

**Example test URLs:**
- `http://localhost:8000/api/candidates?page=1&per_page=5`
- `http://localhost:8000/api/candidates?search=john&sort_by=name&sort_order=asc`
- `http://localhost:8000/api/candidates?application_type=active&source=LinkedIn`

### 6.2 Frontend Testing
- [ ] Verify the frontend displays candidates correctly
- [ ] Test search input - typing should filter candidates
- [ ] Test pagination - clicking pages should update the list
- [ ] Test filters - checking boxes should filter the results

### 6.3 Visual Check
- [ ] Ensure the UI matches the Figma design (it should, since components are pre-built)
- [ ] Verify no console errors
- [ ] Check that data displays correctly

---

## Success Criteria

Your implementation is complete when:

**Backend (70% of grade):**
- [ ] All four filter types work correctly
- [ ] Sorting works for both fields (last_activity, name) and both directions (asc, desc)
- [ ] Pagination returns correct data slices and metadata
- [ ] Response format is consistent and includes all required fields
- [ ] Edge cases are handled (out of bounds pages, no results, etc.)

**Frontend (30% of grade):**
- [ ] Frontend successfully fetches and displays candidates from your backend
- [ ] Search input updates the candidate list
- [ ] Pagination works (clicking pages fetches new data)
- [ ] At least 2 filter sections have working checkboxes
- [ ] Filters update the API call and results

---

## Tips for Success

1. **Start with the backend** - Get filtering, sorting, and pagination working first
2. **Test as you go** - Use the FastAPI docs (`/docs`) to test each filter
3. **Use the hints** - Code hints are provided in the TODO comments
4. **Focus on functionality** - The UI is already built, just make it work
5. **Don't rebuild components** - Use the pre-built SearchInput, CandidateCard, Pagination
6. **Ask questions** - If stuck, refer to the README.md or backend hints

---

## Common Pitfalls to Avoid

- Don't rebuild the frontend components from scratch (they're already done!)
- Don't forget to filter BEFORE sorting and pagination
- Don't forget to handle list parameters (application_type, source) as arrays
- Don't forget to make search case-insensitive
- Don't forget to calculate `total_pages` with ceiling division
- Don't skip testing - verify your backend works before wiring the frontend

---

## Submission Checklist

When you're done:
- [ ] Backend runs without errors: `uvicorn main:app --reload`
- [ ] Frontend runs without errors: `npm run dev`
- [ ] All filters, sorting, and pagination work
- [ ] Frontend displays data from your backend
- [ ] At least 2 filter sections have working checkboxes
- [ ] Tested edge cases (empty results, out of bounds pages)
- [ ] Filled out NOTES.md with what you completed

Good luck! Focus on getting the backend logic solid, then wire it to the frontend.
