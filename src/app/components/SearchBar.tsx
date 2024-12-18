'use client';

import React from 'react';

interface SearchBarProps {
  searchGem: string;
  onSearchChange: (gem: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchGem, onSearchChange }) => {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search skill gems..."
        className="w-full max-w-md px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white"
        value={searchGem}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;