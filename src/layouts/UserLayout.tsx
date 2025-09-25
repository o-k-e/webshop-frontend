import { Outlet, useLocation } from 'react-router-dom';
import NavbarUser from '../components/navbar/NavbarUser';
// import Hero from '../components/hero/Hero';
import HeroCarousel from '../components/hero/HeroCarousel';
import Topbar from '../components/navbar/Topbar';
import BackToTopButton from '../components/BackToTopButton';

const UserLayout = () => {
	const location = useLocation();
	const isHome = location.pathname === '/';

	return (
		<>
			<Topbar />
			<header>{isHome && <HeroCarousel />}</header>
			<NavbarUser />
			<main className='bg-[#fbf8f8cc]'>
				<Outlet />
			</main>
			<BackToTopButton />
		</>
	);
};

export default UserLayout;
