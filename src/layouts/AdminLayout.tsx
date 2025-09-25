import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../components/navbar/NavbarAdmin';
import BackToTopButton from '../components/BackToTopButton';

const AdminLayout = () => {
	return (
		<>
			{/* <header
                    className="h-40 p-4 text-[#f6dbc3] shadow-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${NavbarAdminBgImage})` }}
                >
                <NavbarAdmin />
            </header>; */}
			<header className="h-40 p-4 text-[#f6dbc3] shadow-md bg-[#953733cc]">
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
