import { useEffect, useState } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { CandidateCard } from "./components/CandidateCard";
import { Pagination } from "./components/Pagination";
import type { Candidate } from "./types/candidate";

type CandidateFilters = {
  application_type: string[];
  source: string[];
  job_id: string | null;
};

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<CandidateFilters>({
    application_type: [],
    source: [],
    job_id: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          per_page: "5",
        });

        if (searchValue) {
          params.set("search", searchValue);
        }

        filters.application_type.forEach((value) =>
          params.append("application_type", value)
        );

        filters.source.forEach((value) => params.append("source", value));

        if (filters.job_id) {
          params.set("job_id", filters.job_id);
        }

        const response = await fetch(
          `http://localhost:8000/api/candidates?${params.toString()}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load candidates");
        }

        const data = await response.json();
        setCandidates(data.candidates);
        setTotal(data.total);
        setTotalPages(data.total_pages);
      } catch (fetchError) {
        if ((fetchError as Error).name === "AbortError") {
          return;
        }

        console.error("Error fetching candidates:", fetchError);
        setError("Unable to load candidates. Please try again.");
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();

    return () => controller.abort();
  }, [currentPage, searchValue, filters]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (
    key: "application_type" | "source",
    value: string,
    checked: boolean
  ) => {
    setFilters((prev) => {
      const existing = new Set(prev[key]);
      if (checked) {
        existing.add(value);
      } else {
        existing.delete(value);
      }

      return {
        ...prev,
        [key]: Array.from(existing),
      };
    });
    setCurrentPage(1);
  };

  const handleJobFilterChange = (jobId: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      job_id: checked ? jobId : null,
    }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      application_type: [],
      source: [],
      job_id: null,
    });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f7f8f7]">
      {/* Page Title */}
      <h1 className="text-[34.59px] font-normal text-[#15372c] px-6 pt-4 pb-3 leading-[46.67px]">
        All Candidates
      </h1>

      <div className="flex">
        {/* Sidebar with pre-built components */}
        <Sidebar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          onJobFilterChange={handleJobFilterChange}
          onResetFilters={handleResetFilters}
        />

        {/* Main Content */}
        <main className="flex-1 px-6">
          {/* Results Summary */}
          <div className="mb-4 flex items-center gap-4 mt-[9px]">
            <p className="text-[13.8px] text-[#222222]">
              Showing {total} candidate applications
            </p>
            {/* TODO: Add action buttons (Generate Report, Add Candidate, Bulk Actions) */}
          </div>

          {/* Candidate List Header */}
          <div className="bg-neutral-50 border border-[#e1e1e1] border-b-0 rounded-t mb-0">
            <div className="grid grid-cols-[360px_1fr] h-[40px]">
              <div className="px-[15px] text-[12.4px] font-normal text-[#909090] flex items-center border-r border-[#e1e1e1]">
                Name
              </div>
              <div className="px-[15px] text-[12.4px] font-normal text-[#909090] flex items-center">
                Job/Status
              </div>
            </div>
          </div>

          {/* Candidate List */}
          {loading ? (
            <p className="text-center text-gray-500 py-8 bg-white border border-[#e1e1e1]">
              Loading candidates...
            </p>
          ) : error ? (
            <p className="text-center text-red-500 py-8 bg-white border border-[#e1e1e1]">
              {error}
            </p>
          ) : candidates.length > 0 ? (
            <div className="bg-white border-l border-r border-[#e1e1e1]">
              {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8 bg-white border border-[#e1e1e1]">
              No candidates found.
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
