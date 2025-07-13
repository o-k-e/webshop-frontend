import { NavLink } from 'react-router-dom';
import type { NavLinkItem } from '../../constants/navLinks.config';

type Props = {
	links: NavLinkItem[];
	isLoggedIn?: boolean;
	userRole?: 'user' | 'admin';
	className?: string;
};

const NavLinks = ({
	links,
	isLoggedIn = false,
	userRole,
	className = '',
}: Props) => {
	// AUTH SZŰRÉS – később bővíthető
	const filteredLinks = links.filter((link) => {
		if (link.requireAuth && !isLoggedIn) return false;
		if (link.guestOnly && isLoggedIn) return false;
		if (link.roles && (!userRole || !link.roles.includes(userRole)))
			return false;
		return true;
	});

	return (
		<ul className={`flex gap-8 items-center whitespace-nowrap ${className}`}>
			{filteredLinks.map((link) => (
				<li key={link.to}>
					<NavLink
						to={link.to}
						className={({ isActive }) =>
							`text-white px-2 py-1 transition duration-300 ease-in-out
						${
							isActive
								? 'border border-white shadow-md rounded'
								: 'hover:border hover:border-white rounded'
						}`
						}
					>
						{link.label}
					</NavLink>
				</li>
			))}
		</ul>
	);
};

export default NavLinks;
