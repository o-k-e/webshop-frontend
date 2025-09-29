import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../components/navbar/NavbarAdmin';
import BackToTopButton from '../components/BackToTopButton';

const AdminLayout = () => {
	return (
		<>
			<header className="sticky top-0 z-40 h-40 p-4 text-[#f6dbc3] shadow-md bg-[#a95c5c]">
				<NavbarAdmin />
			</header>
			<main>
				<Outlet />
			</main>
			<BackToTopButton />
		</>
	);
};

export default AdminLayout;
