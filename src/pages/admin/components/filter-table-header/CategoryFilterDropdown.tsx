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

  const isSelected = (id: number | null) => selectedCategoryId === id;

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
        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow">
          <ul className="text-sm font-medium py-1">
            <li
              onClick={() => handleSelect(null)}
              className={`flex justify-between items-center w-full px-4 py-2 text-sm rounded-md cursor-pointer transition 
                ${isSelected(null) ? 'font-semibold' : 'text-black'}
                hover:bg-gray-100
              `}
            >
              All Categories
              {isSelected(null) && <Check className="w-4 h-4 ml-2" />}
            </li>

            {categories?.map((category) => (
              <li
                key={category.id}
                onClick={() => handleSelect(category.id)}
                className={`flex justify-between items-center w-full px-4 py-2 text-sm rounded-md cursor-pointer transition 
                  ${isSelected(category.id) ? 'font-semibold' : 'text-black'}
                  hover:bg-gray-100
                `}
              >
                {category.categoryName}
                {isSelected(category.id) && <Check className="w-4 h-4 ml-2" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryFilterDropdown;