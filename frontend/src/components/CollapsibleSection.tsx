import { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#e1e1e1]">
      <button
        className="w-full flex items-center justify-between py-3 text-[14px] font-medium text-[#15372c] hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="leading-[19.5px]">{title}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? '' : 'rotate-90'}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      {isOpen && children && (
        <div className="pb-3 px-2">
          {children}
        </div>
      )}
    </div>
  );
};
