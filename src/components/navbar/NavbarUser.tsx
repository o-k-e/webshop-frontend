import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCategories from '../../hooks/useCategories';
import { useProductQueryStore } from '../../stores/productQueryStore';

const NavbarUser = () => {
  const navigate = useNavigate();
  const { data: categories = [] } = useCategories();
  const setCategory = useProductQueryStore(state => state.setCategory);
  const reset = useProductQueryStore(state => state.reset);
  const activeCategoryId = useProductQueryStore(state => state.categoryId);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleCategoryClick = (categoryId: number) => {
    reset();
    setCategory(categoryId);
    navigate('/search');
    setMenuOpen(false); // mobilmenü bezárása
  };

  return (
    <nav className="bg-ganesha w-full px-4 py-2">
      {/* Mobil hamburger gomb */}
      <div className="flex justify-between items-center md:hidden">
        <span className="text-white font-semibold text-lg">Kategóriák</span>
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="text-white text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Gombok – mobil: feltételes megjelenítés, desktop: mindig látszik */}
      <div
        className={`
          ${menuOpen ? 'block' : 'hidden'} 
          md:flex justify-center flex-wrap gap-4 items-center mt-2 md:mt-0
        `}
      >
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`
              text-white px-3 py-1 rounded border
              ${activeCategoryId === category.id ? 'border-white' : 'border-transparent'}
              hover:border-white transition-colors duration-200
            `}
          >
            {category.categoryName}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavbarUser;