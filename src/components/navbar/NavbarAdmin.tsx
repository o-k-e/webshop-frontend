import NavLinks from './NavLinks';
import ganeshaLogo from '../../assets/ganesha-logo-removebg.png';
import { ADMIN_NAV_LINKS } from '../../constants/navLinks.config';

const NavbarAdmin = () => {
    return (
        <nav className="flex items-center h-full w-full">
            {/* Bal oldal: Ganesha Admin felirat */}
            {/* <div className="basis-1/4 pl-10">
                <div className="text-2xl font-semibold text-gold leading-tight text-right whitespace-nowrap">
                    Ganesha Admin
                </div>
            </div> */}

            {/* Közép: Ganesha logó */}
            <div className="basis-1/4 flex justify-center">
                <img
                    src={ganeshaLogo}
                    alt="Ganesha logo"
                    className="w-48 h-48 object-contain"
                />
            </div>

            {/* Jobb oldal: navlinkek */}
            <div className="basis-1/4 pr-10 flex justify-end">
                <NavLinks links={ADMIN_NAV_LINKS} isLoggedIn={true} userRole="admin" />
            </div>
        </nav>
    );
};

export default NavbarAdmin;
