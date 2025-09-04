import { useNavigate } from 'react-router-dom';
import useCategories from '../../hooks/useCategories';
import { useProductQueryStore } from '../../stores/productQueryStore';

const NavbarUser = () => {
  const navigate = useNavigate();
  const { data: categories = [] } = useCategories();
  const setCategory = useProductQueryStore(state => state.setCategory);
  const reset = useProductQueryStore(state => state.reset);
  const activeCategoryId = useProductQueryStore(state => state.categoryId);

  const handleCategoryClick = (categoryId: number) => {
    reset(); // reset minden szűrőt és keresést
    setCategory(categoryId); // új kategória beállítása
    navigate('/search');
  };

  return (
    <nav className="bg-ganesha py-2 px-4 flex justify-center flex-wrap gap-6 items-center">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`
            text-white px-3 py-1 rounded
            border 
            ${activeCategoryId === category.id ? 'border-white' : 'border-transparent'}
            hover:border-white transition-colors duration-200
          `}
        >
          {category.categoryName}
        </button>
      ))}
    </nav>
  );
};

export default NavbarUser;