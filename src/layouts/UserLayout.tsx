import { Outlet, useLocation } from 'react-router-dom';
import NavbarUser from '../components/navbar/NavbarUser';
// import Hero from '../components/hero/Hero';
import HeroCarousel from '../components/hero/HeroCarousel';

const UserLayout = () => {
	const location = useLocation();
	const isHome = location.pathname === '/';

	return (
		<>
			<header>{isHome && <HeroCarousel />}</header>
			<NavbarUser />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default UserLayout;
