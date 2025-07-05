import { Outlet } from 'react-router-dom';
import NavbarUser from '../components/navbar/NavbarUser';

const UserLayout = () => {
	return (
		<div>
			<div>
				<NavbarUser />
			</div>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default UserLayout;
