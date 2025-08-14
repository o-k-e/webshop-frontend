import NavLinks from './NavLinks';
import { USER_NAV_LINKS } from '../../constants/navLinks.config';
import { useAuth } from '../../auth/hooks/useAuth';

const NavbarUser = () => {
	const { isAuthenticated, user } = useAuth();
	return (
<nav className="sticky top-0 z-50 flex items-center h-20 w-full px-6 text-gold shadow-lg shadow-[#5e1f1f60] bg-ganesha transition-all duration-300 ease-in-out">			{/* Bal oldal: SearchBar + Filter */}
			<div className="flex items-center gap-x-4 flex-1">
				<input
					type="text"
					placeholder="Search products..."
					className="px-3 py-2 rounded-md bg-white text-black placeholder:text-gray-400 text-sm w-full max-w-[240px]"
				/>
				<button className="px-4 py-2 rounded-md text-white text-sm hover:bg-[#7e2e29] transition">
					Browse by Category
				</button>
			</div>

			{/* Jobb oldal: navigációs linkek */}
			<div className="flex justify-end gap-x-6">
				<NavLinks links={USER_NAV_LINKS} isLoggedIn={isAuthenticated} userRole={user?.role}/>
			</div>
		</nav>
	);
};

export default NavbarUser;