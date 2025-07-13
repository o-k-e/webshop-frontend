import { Outlet } from 'react-router-dom';
import NavbarUser from '../components/navbar/NavbarUser';
import Hero from '../components/hero/Hero';

const UserLayout = () => {
	return (
		<>
			<header>
				<Hero />
			</header>
			<NavbarUser />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default UserLayout;
