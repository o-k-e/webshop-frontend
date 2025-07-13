import NavLinks from './NavLinks';
import ganeshaLogo from '../../assets/ganesha-logo.png';
import { USER_NAV_LINKS } from '../../constants/navLinks.config';

const NavbarUser = () => {
	return (
		<nav className="flex items-center h-full w-full">
			{/* Bal oldal: Webshop felirat */}
			<div className="basis-1/4 pl-10">
				<div className="text-2xl font-semibold text-gold leading-tight text-left">
					Ganesha
				</div>
			</div>

			{/* Közép: Ganesha logó */}
			<div className="basis-1/2 flex justify-center">
				<img
					src={ganeshaLogo}
					alt="Ganesha logo"
					className="w-48 h-48 object-contain"
				/>
			</div>

			{/* Jobb oldal: navlinkek */}
			<div className="basis-1/4 pr-10 flex justify-end">
				<NavLinks links={USER_NAV_LINKS} isLoggedIn={false} />
			</div>
		</nav>
	);
};

export default NavbarUser;