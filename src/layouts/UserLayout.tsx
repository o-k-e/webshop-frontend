import { Outlet } from 'react-router-dom';
import NavbarUser from '../components/navbar/NavbarUser';

const UserLayout = () => {
	return (
		<>
			<header className="h-60 p-4 text-gold shadow-md bg-ganesha">
				<NavbarUser />
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default UserLayout;
