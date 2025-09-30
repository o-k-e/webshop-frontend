import { NavLink } from 'react-router-dom';
import type { NavLinkItem } from '../../constants/navLinks.config';

type Props = {
	links: NavLinkItem[];
	isLoggedIn?: boolean;
	userRole?: 'user' | 'admin' | null;
	className?: string;
	onLinkClick?: () => void;
};

const NavLinks = ({
	links,
	isLoggedIn = false,
	userRole,
	className = '',
	onLinkClick,
}: Props) => {
	const filteredLinks = links.filter((link) => {
		if (link.requireAuth && !isLoggedIn) return false;
		if (link.guestOnly && isLoggedIn) return false;
		if (link.role && userRole !== link.role) return false;
		return true;
	});

	return (
		<ul className={`flex gap-8 items-center whitespace-nowrap ${className}`}>
			{filteredLinks.map((link) => (
				<li key={link.to}>
					<NavLink
						to={link.to}
						end={true}
						onClick={onLinkClick}   // ha van onLinkClick, itt lefut
						className={({ isActive }) =>
							`text-[#f6dbc3] px-2 py-1 transition duration-300 ease-in-out
						${
							isActive
								? 'border border-[#f6dbc3] bg-[#953633f1] shadow-md rounded drop-shadow-lg'
								: 'hover:border hover:border-[#f6dbc3] hover:bg-[#953633f1] rounded drop-shadow-lg'
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
