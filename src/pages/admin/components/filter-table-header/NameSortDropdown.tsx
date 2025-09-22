import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useAdminProductQueryStore } from '../../../../stores/useAdminProductQueryStore';

const NameSortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sort = useAdminProductQueryStore((s) => s.sort);
  const setSort = useAdminProductQueryStore((s) => s.setSort);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (field: 'id' | 'productName', direction: 'asc' | 'desc') => {
    setSort({ field, direction });
    setIsOpen(false);
  };

  const isSelected = (field: string, direction: string) =>
    sort.field === field && sort.direction === direction;

    const options: {
        label: string;
        field: 'id' | 'productName';
        direction: 'asc' | 'desc';
      }[] = [
        { label: 'Default', field: 'id', direction: 'asc' },
        { label: 'A → Z', field: 'productName', direction: 'asc' },
        { label: 'Z → A', field: 'productName', direction: 'desc' },
      ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 font-semibold hover:text-[#953733]"
      >
        Name
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow">
          <ul className="text-sm font-medium py-1">
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
        </div>
      )}
    </div>
  );
};

export default NameSortDropdown;