# Fullstack Take-Home Assessment

Welcome! This assessment is designed to evaluate your skills in FastAPI backend development and React frontend integration.

## Time Expectation

**1 hour and 30 minutes**. We understand this is limited time, so focus on:
1. **Backend implementation** (70% of assessment)
2. Frontend wiring (30% of assessment)
3. Correct functionality over additional features

## Overview

You'll be implementing the backend API for a candidate management interface and wiring it to a pre-built frontend. This assessment focuses on:
- Building robust FastAPI endpoints with multi-field filtering
- Implementing flexible sorting and pagination
- Proper API response formatting
- Connecting frontend to backend with React

## What's Different About This Assessment

Unlike a frontend-focused assessment, **most of the UI components are already built for you**. Your job is to:
1. Implement the backend logic (filtering, sorting, pagination)
2. Build filter section components
3. Wire the frontend to your backend API

## What's Pre-Built for You

### Frontend Components (Already Implemented)
- Complete: **SearchInput** - Debounced search input with icon
- Complete: **CollapsibleSection** - Working expand/collapse sections
- Complete: **CandidateCard** - Complete candidate display with all details
- Complete: **Pagination** - Pagination UI component
- Complete: **Sidebar** - Full sidebar layout with search and filters
- Complete: **App.tsx** - Main app structure with state management

### What You Need to Build

#### Backend (~60 minutes) - THE MAIN FOCUS
In `backend/main.py`, implement:

1. **Multi-field Filtering**
   - Search filter (name, position, company)
   - Application type filter (active/archived)
   - Source filter (LinkedIn, Indeed, etc.)
   - Job ID filter

2. **Flexible Sorting**
   - Sort by last_activity (date)
   - Sort by name (alphabetical)
   - Support both ascending and descending order

3. **Server-side Pagination**
   - Calculate correct page slices
   - Return proper metadata (total, total_pages)
   - Handle edge cases

4. **Response Formatting**
   - Return consistent response structure
   - Include all required metadata

#### Frontend (~30 minutes) - MINOR WORK
1. **Wire API calls** in App.tsx
   - Fetch candidates from your backend
   - Handle loading states
   - Update state on search/pagination

2. **Build Filter Sections**
   - Add checkbox options inside CollapsibleSection components
   - Wire filter selections to backend API calls

3. **Make Pagination Work**
   - Connect pagination clicks to page state
   - Trigger new API calls on page change

## Getting Started

### 1. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will run on `http://localhost:8000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will run on `http://localhost:5173`

## Core Requirements (Must Complete)

### 1. Backend Implementation (~60 minutes) - **PRIMARY FOCUS (70%)**

Implement in `backend/main.py`:

**Filtering** (20 min):
- [ ] Search by name, position, or company (case-insensitive)
- [ ] Filter by application_type (list parameter)
- [ ] Filter by source (list parameter)
- [ ] Filter by job_id (exact match)

**Sorting** (15 min):
- [ ] Sort by last_activity (date field)
- [ ] Sort by name (alphabetical)
- [ ] Support asc/desc order for both

**Pagination** (15 min):
- [ ] Calculate correct slice based on page and per_page
- [ ] Return accurate total count
- [ ] Calculate total_pages correctly
- [ ] Handle out-of-bounds pages gracefully

**Response Format** (10 min):
- [ ] Return JSON with: candidates, total, page, per_page, total_pages
- [ ] Ensure consistent response structure

### 2. Frontend Integration (~30 minutes)

**Wire API Calls** (15 min):
- [ ] Implement useEffect to fetch candidates
- [ ] Pass search, page params to API
- [ ] Update state with response data

**Filter Sections** (10 min):
- [ ] Add checkboxes to 2-3 filter sections
- [ ] Store selected filters in state
- [ ] Pass filters to API calls

**Pagination** (5 min):
- [ ] Verify pagination component is wired to API calls

## Design Files

- **Reference Design (Figma)**: [View Figma File](https://www.figma.com/design/gZL1X2fSo0MzExOIXNW1hz/Sample-Pages?node-id=1-1390&t=00CymjmcEhM0QfRK-11)
- **Design Specs**: See `designs/specs.md` for colors, spacing, typography
- **Screenshots**: See `designs/` folder for exported screenshots

## Evaluation Criteria

Your submission will be evaluated on:

### 1. Backend Implementation (50 points)
- All filters work correctly (multi-field filtering)
- Sorting works for both fields and directions
- Pagination returns correct data slices
- Response format is consistent and correct
- Edge cases handled (empty results, out-of-bounds pages)
- Bonus: Successfully handling list parameters for filtering (+5 pts)

### 2. API Integration (25 points)
- Frontend successfully calls backend
- Search updates candidate list
- Pagination works
- Loading/error states handled

### 3. Code Quality (15 points)
- Clean, readable code
- Proper TypeScript types
- Good variable naming
- Helpful comments where needed

### 4. Filter Implementation (10 points)
- Filter sections have working checkboxes
- Filters update the API call
- Multiple filters can be combined

## Submission

When complete:

1. **Test your code**
   - Ensure backend runs without errors
   - Test all filtering, sorting, pagination
   - Verify frontend connects to backend

2. **Document any incomplete features** in `NOTES.md`
   - What you completed
   - What you would do with more time
   - Any challenges you faced

3. **Zip the project**
   - Delete `node_modules/` and `venv/` before zipping
   - Keep `.git` folder if you used git

4. **Email it back to us**

## Tips for Success

1. **Start with the backend** - This is 70% of the assessment
2. **Test as you go** - Use `http://localhost:8000/docs` to test endpoints
3. **Use the hints** - The backend file has detailed pseudocode
4. **Get it working first** - Perfect is the enemy of good
5. **Frontend is mostly done** - Just wire it up, don't rebuild components

## Questions?

If you have questions during the assessment, please reach out to [your-email@company.com].

Good luck! We're excited to see your backend skills.
