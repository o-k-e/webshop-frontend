import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../components/navbar/NavbarAdmin';

const AdminLayout = () => {
	return (
		<>
			<header className="h-60 p-4 text-gold shadow-md bg-ganesha">
				<NavbarAdmin />
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default AdminLayout;
