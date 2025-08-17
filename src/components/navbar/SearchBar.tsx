// FILE: src/components/navbar/SearchBar.tsx

import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import apiClient from '../../services/api-client';

// [CHANGED] onSearchResults opcionális lett
interface SearchBarProps {
  onSearchResults?: (results: any[]) => void;
}

const SearchBar = ({ onSearchResults }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    //ha nincs prop átadva, csak térjünk vissza — később Zustandot fogunk használni
    if (!onSearchResults) return;

    if (value.trim().length < 2) {
      onSearchResults([]); //rövid lekérdezésre ürítjük az eredményt
      return;
    }

    try {
      const response = await apiClient.get('/products/search', {
        params: { query: value },
      });
      onSearchResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      onSearchResults([]); //hiba esetén ürítsük
    }
  };

  return (
    <div className="flex items-center gap-2 flex-1 max-w-md">
      <FiSearch size={20} />
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleSearch}
        className="
          w-28 sm:w-full
          px-2 sm:px-3
          py-1 sm:py-1.5
          text-xs sm:text-sm
          bg-white
          border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-[#fdc57b]
        "
      />
    </div>
  );
};

export default SearchBar;