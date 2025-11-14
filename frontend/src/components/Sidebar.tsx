import { useState } from 'react';
import { SearchInput } from './SearchInput';
import { CollapsibleSection } from './CollapsibleSection';

interface SidebarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ searchValue, onSearchChange }) => {
  const [fullTextSearch, setFullTextSearch] = useState(false);

  return (
    <aside className="w-[248px] bg-[#f7f8f7] min-h-screen px-6 pt-2 pb-6">
      {/* Search Input */}
      <SearchInput value={searchValue} onChange={onSearchChange} />

      {/* Full Text Search Toggle */}
      <div className="mt-2">
        <div className="flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="fullTextSearch"
              checked={fullTextSearch}
              onChange={(e) => setFullTextSearch(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-[50px] h-[25px] bg-[#ccd4d1] rounded-full peer peer-checked:bg-[#047957] peer-focus:ring-2 peer-focus:ring-[#047957]/20 transition-colors duration-200 ease-in-out">
              <div className={`absolute left-0 top-0 w-[25px] h-[25px] bg-white border-[3px] rounded-full transition-transform duration-200 ease-in-out ${fullTextSearch ? 'translate-x-[25px] border-[#047957]' : 'translate-x-0 border-[#ccd4d1]'}`}></div>
            </div>
          </label>
          <label htmlFor="fullTextSearch" className="text-[13px] font-medium text-[#15372c] cursor-pointer leading-[19.5px]">
            Full Text Search
          </label>
        </div>
        <p className="text-[11.6px] text-[#909090] font-light leading-[12px] mt-1">(Includes resumes and notes)</p>
      </div>

      {/* Sort Dropdown (visual only) */}
      <div className="mt-4">
        <div className="w-full h-[36px] px-3 flex items-center justify-between border border-[#e1e1e1] bg-white rounded text-[14px] text-[#333333]">
          <span className="truncate">Last Activity (new to old)</span>
          <svg className="w-3.5 h-3.5 text-[#909090] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Filter Sections */}
      <div className="mt-6">
        <CollapsibleSection title="Application Type">
          {/* TODO: Add filter checkboxes here */}
        </CollapsibleSection>

        <CollapsibleSection title="Jobs">
          {/* TODO: Add filter checkboxes here */}
        </CollapsibleSection>

        <CollapsibleSection title="CRM">
          {/* TODO: Add filter checkboxes here */}
        </CollapsibleSection>

        <CollapsibleSection title="Profile Details">
          {/* TODO: Add filter checkboxes here */}
        </CollapsibleSection>

        <CollapsibleSection title="Source">
          {/* TODO: Add filter checkboxes here */}
        </CollapsibleSection>

        <CollapsibleSection title="Responsibility">
          {/* TODO: Add filter checkboxes here */}
        </CollapsibleSection>

        <CollapsibleSection title="Pipeline Tasks">
          {/* TODO: Add filter checkboxes here */}
        </CollapsibleSection>

        <CollapsibleSection title="Education">
          {/* TODO: Add filter checkboxes here */}
        </CollapsibleSection>
      </div>

      {/* Reset Filters Button */}
      <button className="mt-6 w-full px-4 py-2 text-[#3574d6] text-[13.9px] font-light flex items-center justify-center gap-2 hover:underline">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>Reset Filters</span>
      </button>
    </aside>
  );
};
