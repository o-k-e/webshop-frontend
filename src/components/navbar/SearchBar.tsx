import { FiSearch } from 'react-icons/fi';

const SearchBar = () => {
  return (
    <div className="flex items-center gap-2 flex-1 max-w-md">
      <FiSearch size={20} />
      <input
        type="text"
        placeholder="Search products..."
        className="
          w-28
          sm:w-full
          px-2 sm:px-3
          py-1 sm:py-1.5
          text-xs sm:text-sm
          border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-[#fdc57b]
        "
      />
    </div>
  );
};

export default SearchBar;