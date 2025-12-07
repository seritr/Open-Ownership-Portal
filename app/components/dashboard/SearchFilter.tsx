// components/dashboard/SearchFilter.tsx
import React from 'react';
import type { Dispatch, SetStateAction } from 'react';

export interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
  applications: Array<{
    id: string;
    type: string;
    submittedBy: string;
    status: string;
    priority?: string;
    amount?: number;
    daysInProcess?: number;
  }>;
  showFilters?: boolean; // <-- added optional prop
}

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  applications,
  showFilters = true, // default to true
}: SearchFilterProps) {
  // minimal example UI — only render filters when showFilters is true
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search applications..."
          className="px-3 py-2 border rounded w-full"
          aria-label="Search applications"
        />

        {showFilters && (
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded"
            aria-label="Filter by status"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="review">In Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        )}
      </div>

      {/* optional summary */}
      <p className="text-sm text-gray-500 mt-2">
        Showing {applications.length} application{applications.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}
