import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavLinksAdmin = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const links = [
		{ to: '/admin', label: 'Dashboard' },
		{ to: '/admin/products', label: 'Manage Products' },
		{ to: '/admin/users', label: 'Manage Users' },
		isLoggedIn
			? { to: '/logout', label: 'Logout' }
			: { to: '/login', label: 'Login' },
	];

	return (
		<nav>
			<ul className="flex gap-4">
				{links.map((link) => (
					<li key={link.to}>
						<NavLink
							to={link.to}
							className={({ isActive }) =>
								isActive ? 'text-orange-400 font-bold' : 'text-gray-700'
							}
						>
							{link.label}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavLinksAdmin;
