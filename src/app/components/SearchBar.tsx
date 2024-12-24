'use client';

import React from 'react';

interface SearchBarProps {
  searchValue: string;
  placeholder: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchValue, placeholder, onSearchChange }) => {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full max-w-md px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
