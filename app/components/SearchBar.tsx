'use client';

import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterSection: string;
  onFilterChange: (value: string) => void;
  sections: string[];
}

export default function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  filterSection, 
  onFilterChange,
  sections 
}: SearchBarProps) {
  return (
    <div className="space-y-3 mb-6">
      <div className="relative">
        <label htmlFor="search-input" className="sr-only">
          Search members
        </label>
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
          aria-hidden="true"
        />
        <input
          id="search-input"
          type="text"
          placeholder="Search by name, section, or status..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          aria-label="Search members by name, section, or status"
        />
      </div>
      
      <div className="relative">
        <label htmlFor="filter-select" className="sr-only">
          Filter by section
        </label>
        <Filter 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
          aria-hidden="true"
        />
        <select
          id="filter-select"
          value={filterSection}
          onChange={(e) => onFilterChange(e.target.value)}
          className="filter-select"
          aria-label="Filter members by work section"
          title="Select section to filter members"
        >
          <option value="ALL">All Sections</option>
          {sections.map((section) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}