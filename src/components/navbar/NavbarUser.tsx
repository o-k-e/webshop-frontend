import NavLinks from './NavLinks';
import { USER_NAV_LINKS } from '../../constants/navLinks.config';

const NavbarUser = () => {
	return (
		<nav className="sticky top-0 z-50 flex items-center h-20 w-full px-6 text-gold shadow-md bg-ganesha">
			{/* Bal oldal – majd ide jön search/filter */}
			<div className="flex-1">
				{/* ide majd jön: <SearchBar />, <Filters /> */}
			</div>

			{/* Jobb oldal – linkek */}
			<div className="flex justify-end gap-x-6">
				<NavLinks links={USER_NAV_LINKS} isLoggedIn={false} />
			</div>
		</nav>
	);
};

export default NavbarUser;