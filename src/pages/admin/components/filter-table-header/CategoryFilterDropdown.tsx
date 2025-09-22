import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import useCategories from '../../../../hooks/useCategories';
import { useAdminProductQueryStore } from '../../../../stores/useAdminProductQueryStore';

const CategoryFilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: categories } = useCategories();
  const selectedCategoryId = useAdminProductQueryStore((s) => s.categoryId);
  const setCategory = useAdminProductQueryStore((s) => s.setCategory);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (id: number | null) => {
    setCategory(id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 font-semibold hover:text-[#953733]"
      >
        Categories
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded shadow">
          <ul className="text-sm font-medium">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
              onClick={() => handleSelect(null)}
            >
              All Categories
              {selectedCategoryId === null && <Check size={16} />}
            </li>
            {categories?.map((category) => (
              <li
                key={category.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                onClick={() => handleSelect(category.id)}
              >
                {category.categoryName}
                {selectedCategoryId === category.id && <Check size={16} />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryFilterDropdown;