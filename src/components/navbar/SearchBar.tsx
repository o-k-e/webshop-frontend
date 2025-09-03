import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductQueryStore } from '../../stores/productQueryStore';

const MIN_Q_LEN = 3; // min. 3 karakter követelmény

const SearchBar = () => {
  const navigate = useNavigate();
  const resetStore = useProductQueryStore((s) => s.reset);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryText = input.trim();

    // min. 3 karakter – ha rövidebb, semmi nem történik
    if (queryText.length < MIN_Q_LEN) return;

    // üres keresés → reset + home
    if (!queryText) {
      resetStore();
      setInput('');
      navigate('/', { replace: true });
      return;
    }

    navigate(`/search?query=${encodeURIComponent(queryText)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-md">
      <div className="flex items-center gap-2">
        <FiSearch size={20} />
        <input
          type="text"
          placeholder={`Search products (min. ${MIN_Q_LEN} chars)…`}
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
      </div>
    </form>
  );
};

export default SearchBar;