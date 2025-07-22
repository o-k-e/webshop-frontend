import { Outlet, useLocation } from 'react-router-dom';
import NavbarUser from '../components/navbar/NavbarUser';
import Hero from '../components/hero/Hero';

const UserLayout = () => {
	const location = useLocation();
	const isHome = location.pathname === '/';

	return (
		<>
			<header>{isHome && <Hero />}</header>
			<NavbarUser />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default UserLayout;
