import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../../services/api-client';
import { useAdminProductQueryStore } from '../../stores/useAdminProductQueryStore';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const AdminSearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const search = useAdminProductQueryStore((s) => s.search);
  const setSearch = useAdminProductQueryStore((s) => s.setSearch);

  // ⏱️ Debounce logic for suggestion fetching
  useEffect(() => {
    if (searchInput.trim().length < 2) {
      setSuggestions([]);
      setIsDropdownVisible(false);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      apiClient
        .get<string[]>('/products/suggestions', {
          params: { query: searchInput.trim() },
        })
        .then((res) => {
          setSuggestions(res.data);
          setIsDropdownVisible(true);
        })
        .catch(() => {
          setSuggestions([]);
          setIsDropdownVisible(false);
        });
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchInput]);

  // Navigálás a search oldalra és query param frissítése
  useEffect(() => {
    const trimmed = searchInput.trim();
    if (trimmed.length >= 2) {
      const encoded = encodeURIComponent(trimmed);
      if (location.pathname !== '/admin/products/search') {
        navigate(`/admin/products/search?query=${encoded}`);
      } else {
        navigate(`/admin/products/search?query=${encoded}`, { replace: true });
      }
      setSearch(trimmed);
    }
  }, [searchInput]);

  // URL-ből olvassa be a kezdeti értéket
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('query') || '';
    setSearch(q);
    setSearchInput(q);
  }, [location.search]);

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchInput(suggestion);
    setSearch(suggestion);
    setIsDropdownVisible(false);
  };

  return (
    <div className="relative w-full max-w-md pb-5">
      <div className="relative">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          className="w-full p-2 pl-9 pr-10 border rounded"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setIsDropdownVisible(true);
          }}
          onBlur={() => {
            setTimeout(() => setIsDropdownVisible(false), 100);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const encoded = encodeURIComponent(searchInput.trim());
              navigate(`/admin/products/search?query=${encoded}`);
              setSearch(searchInput.trim());
              setIsDropdownVisible(false);
            }
          }}
        />
        {searchInput.length > 0 && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#953733]"
            onClick={() => {
              setSearch('');
              setSearchInput('');
              navigate('/admin/products');
            }}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {isDropdownVisible && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full border bg-white rounded shadow max-h-60 overflow-y-auto mt-1">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => handleSelectSuggestion(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminSearchBar;