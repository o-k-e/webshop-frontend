import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import backgroundImage from '../../assets/background-7.png';

const NavLinksUser = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/cart", label: "Cart" },
    isLoggedIn
      ? { to: "/profile", label: "My Profile" }
      : { to: "/login", label: "Login" },
  ];
  
	return (
		<nav className="h-full flex items-center justify-end">
			<div className="h-full">
				<ul
					className="flex gap-6 h-full items-center pl-6 pr-0"
					style={{
						backgroundImage: `url(${backgroundImage})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: '100% 100%',
						backgroundPosition: 'center center',
						minWidth: '500px',
						height: '100%',
					}}
				>
					{links.map((link) => (
						<li key={link.to}>
							<NavLink
								to={link.to}
								className={({ isActive }) =>
									isActive ? 'text-gold font-bold' : 'text-gold'
								}
							>
								{link.label}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default NavLinksUser;
