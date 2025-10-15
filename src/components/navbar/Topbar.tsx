import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import {
	FiUser,
	FiLogIn,
	FiLogOut,
	FiHome,
} from 'react-icons/fi';
import { USER_NAV_LINKS } from '../../constants/navLinks.config';
import type { JSX } from 'react';
import SearchBar from './SearchBar';
import { useProductQueryStore } from '../../stores/useProductQueryStore';
import CartLinkWithBadge from '../../pages/cart/CartLinkWithBadge';

const iconMap: Record<string, JSX.Element> = {
	Home: <FiHome size={18} />,
	Cart: <CartLinkWithBadge />,
	'My Profile': <FiUser size={18} />,
	Login: <FiLogIn size={18} />,
	Logout: <FiLogOut size={18} />,
};

const Topbar = () => {
	const { isAuthenticated, logout, user } = useAuth();
	const navigate = useNavigate();

	const handleLogoutClick = () => {
		logout();
		navigate('/');
	};

	const filteredLinks = USER_NAV_LINKS.filter((link) => {
		if (link.requireAuth && !isAuthenticated) return false;
		if (link.guestOnly && isAuthenticated) return false;
		if (link.role && user?.role !== link.role) return false;
		return true;
	});

	return (
		<nav className="w-full bg-[#fbf8f8] shadow-sm px-6 py-3 flex items-center justify-between">
			{/* Bal oldal: Search */}
			<SearchBar />

			{/* Jobb oldal: Navigációs linkek */}
			<div className="flex items-center gap-10 text-sm">
				{filteredLinks.map((link) => (
					<NavLink
						key={link.to}
						to={link.to}
						onClick={
							link.label === 'Logout'
								? handleLogoutClick
								: link.label === 'Home'
								? () => useProductQueryStore.getState().reset() // store reset
								: undefined
						}
						className="flex items-center gap-2 hover:text-[#7e2e29] transition"
					>
						{iconMap[link.label]}
						<span className="hidden sm:inline">{link.label}</span>
					</NavLink>
				))}
			</div>
		</nav>
	);
};

export default Topbar;
