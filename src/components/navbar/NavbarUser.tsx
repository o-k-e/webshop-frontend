import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCategories from '../../hooks/useCategories';
import { useProductQueryStore } from '../../stores/useProductQueryStore';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NavbarUser = () => {
	const navigate = useNavigate();
	const { data: categories = [] } = useCategories();
	const setCategory = useProductQueryStore((state) => state.setCategory);
	const reset = useProductQueryStore((state) => state.reset);
	const activeCategoryId = useProductQueryStore((state) => state.categoryId);

	const [menuOpen, setMenuOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleCategoryClick = (categoryId: number) => {
		reset();
		setCategory(categoryId);
		navigate('/search');
		setMenuOpen(false);
	};

	// Bezárás, ha máshová kattintunk
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<nav className="bg-ganesha w-full px-4 py-2 relative">
			{/* Mobil hamburger */}
			<div className="flex justify-between items-center md:hidden">
				<span className="text-white font-semibold text-lg">Categories</span>
				<button
					onClick={() => setMenuOpen((prev) => !prev)}
					className="text-white focus:outline-none"
				>
					{menuOpen ? (
						<XMarkIcon className="h-6 w-6" />
					) : (
						<Bars3Icon className="h-6 w-6" />
					)}
				</button>
			</div>

			{/* Dropdown menü mobilra */}
			{menuOpen && (
				<div
					ref={dropdownRef}
					className="absolute top-full left-0 w-full bg-ganesha flex flex-col gap-2 px-4 py-2 z-50 md:hidden"
				>
					{categories.map((category) => (
						<button
							key={category.id}
							onClick={() => handleCategoryClick(category.id)}
							className={`
                text-white px-3 py-1 rounded border text-left
                ${
									activeCategoryId === category.id
										? 'border-white'
										: 'border-transparent'
								}
                hover:border-white transition-colors duration-200
              `}
						>
							{category.categoryName}
						</button>
					))}
				</div>
			)}

			{/* Asztali nézet: fix, középre igazított gombok */}
			<div className="hidden md:flex justify-center flex-wrap gap-6 items-center mt-2 md:mt-0 font-semibold">
				{categories.map((category) => (
					<button
						key={category.id}
						onClick={() => handleCategoryClick(category.id)}
						className={`
              text-white px-3 py-1 rounded border
              ${
								activeCategoryId === category.id
									? 'border-white'
									: 'border-transparent'
							}
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
