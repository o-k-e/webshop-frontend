import { useAdminProductQueryStore } from '../../../../stores/useAdminProductQueryStore';
import type { SortField, SortDir } from '../../../../types/sort';
import { ChevronDown, Check } from 'lucide-react';
import { useState } from 'react';

const options: { label: string; field: SortField; direction: SortDir }[] = [
  { label: 'Default', field: 'id', direction: 'desc' },
  { label: 'Ascending', field: 'price', direction: 'asc' },
  { label: 'Descending', field: 'price', direction: 'desc' },
];

const PriceSortDropdown = () => {
  const sort = useAdminProductQueryStore((s) => s.sort);
  const setSort = useAdminProductQueryStore((s) => s.setSort);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (field: SortField, direction: SortDir) => {
    setSort({ field, direction });
    setIsOpen(false);
  };

  const isSelected = (field: SortField, direction: SortDir) =>
    sort.field === field && sort.direction === direction;

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 font-semibold hover:text-[#953733]"
      >
        Price
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-1 w-40 font-medium bg-white shadow-lg rounded-md z-10">
          {options.map((option) => (
            <li
              key={option.label}
              onClick={() => handleSelect(option.field, option.direction)}
              className={`flex justify-between items-center w-full px-4 py-2 text-sm rounded-md cursor-pointer transition 
                ${isSelected(option.field, option.direction) ? 'font-semibold' : 'text-black'}
                hover:bg-gray-100
              `}
            >
              {option.label}
              {isSelected(option.field, option.direction) && (
                <Check className="w-4 h-4 ml-2" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PriceSortDropdown;