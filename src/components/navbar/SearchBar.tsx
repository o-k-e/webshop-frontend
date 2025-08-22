import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductQueryStore } from '../../stores/productQueryStore';

const SearchBar = () => {
  const navigate = useNavigate();
  const resetStore = useProductQueryStore((s) => s.reset);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();

    if (!q) {
      // üres keresés → vissza Home + store reset + input ürítés
      resetStore();
      setInput('');
      navigate('/', { replace: true });
      return;
    }

    // nem üres → dedikált kereső oldal
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 max-w-md">
      <FiSearch size={20} />
      <input
        type="text"
        placeholder="Search products..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="
          w-28 sm:w-full
          px-2 sm:px-3
          py-1 sm:py-1.5
          text-xs sm:text-sm
          border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-[#fdc57b]
        "
      />
    </form>
  );
};

export default SearchBar;