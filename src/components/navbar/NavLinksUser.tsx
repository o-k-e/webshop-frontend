import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavLinksUser = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "All Products" },
    { to: "/cart", label: "Cart" },
    isLoggedIn
      ? { to: "/profile", label: "My Profile" }
      : { to: "/login", label: "Login" },
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

export default NavLinksUser;
