import type { Candidate } from "../types/candidate";

interface CandidateCardProps {
  candidate: Candidate;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <div className="border-b border-gray-200">
      {/* Main Row */}
      <div className="grid grid-cols-[345px_1fr] py-5">
        {/* Left Column - Name & Position */}
        <div className="px-5">
          <p className="text-xl text-[#15372c] ">{candidate.name}</p>
          <p className="text-base text-gray-600 mt-1">{candidate.position}</p>
          {candidate.company && (
            <p className="text-base text-gray-600">{candidate.company}</p>
          )}
        </div>

        {/* Right Column - Job & Status */}
        <div className="px-4">
          <p className="text-sm text-gray-900 mt-1">{candidate.job_title}</p>
          <a
            href="#"
            className="text-sm text-[#10B981] hover:underline inline-block mt-1"
            onClick={(e) => e.preventDefault()}
          >
            {candidate.action_link}
          </a>
        </div>
      </div>

      {/* Status Row */}
      <div className="grid grid-cols-[345px_1fr] py-2.5 bg-gray-50">
        <div className="px-5 flex items-center">
          <span className="text-sm text-gray-700">{candidate.status}</span>
        </div>
        <div className="px-4">
          <a
            href="#"
            className="text-sm text-[#10B981] hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            {candidate.action_link}
          </a>
        </div>
      </div>

      {/* Availability Section (if applicable) */}
      {candidate.has_availability && (
        <div className="grid grid-cols-[345px_1fr] py-3 border-t border-gray-200">
          <div className="px-5" />
          <div className="px-4 flex items-center gap-4">
            <span className="text-sm text-gray-700">Availability</span>
            <span className="px-2.5 py-1 text-sm bg-gray-100 rounded">
              {candidate.availability_status}
            </span>
            <a
              href="#"
              className="text-sm text-[#10B981] hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Request Availability
            </a>
          </div>
        </div>
      )}

      {/* Interviews Section (if applicable) */}
      {candidate.has_interviews && candidate.interviews && (
        <>
          <div className="grid grid-cols-[345px_1fr] py-2.5 border-t border-gray-200">
            <div className="px-5" />
            <div className="px-4">
              <span className="text-sm font-medium text-gray-700">
                Interviews
              </span>
            </div>
          </div>
          {candidate.interviews.map((interview, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[345px_1fr] py-2.5 border-t border-gray-200"
            >
              <div className="px-5 flex items-center">
                <span className="text-sm text-gray-700">{interview.name}</span>
              </div>
              <div className="px-4 flex items-center gap-2">
                <a
                  href="#"
                  className="text-sm text-[#10B981] hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Schedule manually
                </a>
                <span className="text-gray-400">|</span>
                <a
                  href="#"
                  className="text-sm text-[#10B981] hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Automated scheduling
                </a>
                <span className="text-gray-400">|</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 16 6"
                  >
                    <circle cx="3" cy="3" r="1.5" />
                    <circle cx="8" cy="3" r="1.5" />
                    <circle cx="13" cy="3" r="1.5" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
