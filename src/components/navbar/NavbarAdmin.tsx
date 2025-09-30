import { useState, useRef, useEffect } from 'react';
import NavLinks from './NavLinks';
import ganeshaLogo from '../../assets/ganesha-logo-beige.png';
import { ADMIN_NAV_LINKS } from '../../constants/navLinks.config';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NavbarAdmin = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<nav className="w-full h-full">
			{/* Mobil layout */}
			<div className="flex justify-between items-center md:hidden px-4 py-2">
				{/* Bal oldal: felirat + logó */}
				<div className="flex items-center gap-3">
					<img
						src={ganeshaLogo}
						alt="Ganesha logo"
						className="w-30 h-30 object-contain"
					/>
					<span className="text-[#f6dbc3] font-semibold text-lg">
						Ganesha Shop - Admin
					</span>
				</div>

				{/* Hamburger ikon */}
				<button
					onClick={() => setMenuOpen((prev) => !prev)}
					className="text-white focus:outline-none cursor-pointer"
				>
					{menuOpen ? (
						<XMarkIcon className="h-6 w-6" />
					) : (
						<Bars3Icon className="h-6 w-6" />
					)}
				</button>
			</div>

			{/* Mobil lenyíló menü */}
			{menuOpen && (
				<div
					ref={dropdownRef}
					className="absolute top-full left-0 w-full bg-[#af5151] flex flex-col gap-2 px-4 py-2 z-50 md:hidden"
				>
					<NavLinks
						links={ADMIN_NAV_LINKS}
						isLoggedIn={true} // majd AuthContextből jön
						userRole="admin"
						className="flex-col items-start gap-2 w-full"
						onLinkClick={() => setMenuOpen(false)}
					/>
				</div>
			)}

			{/* Tablet layout */}
			<div className="hidden md:flex lg:hidden flex-col items-center gap-2 px-6">
				<div className="flex items-center gap-4">
					<div className="text-xl font-semibold">Ganesha Shop - Admin</div>
					<img
						src={ganeshaLogo}
						alt="Ganesha logo"
						className="w-40 h-40 object-contain"
					/>
				</div>
				<NavLinks links={ADMIN_NAV_LINKS} isLoggedIn={true} userRole="admin" />
			</div>

			{/* Desktop layout */}
			<div className="hidden lg:flex items-center justify-between h-full px-12">
				{/* Bal oldal: felirat */}
				<div className="text-2xl font-semibold">Ganesha Shop - Admin</div>

				{/* Közép: logó */}
				<img
					src={ganeshaLogo}
					alt="Ganesha logo"
					className="w-48 h-48 object-contain"
				/>

				{/* Jobb oldal: navlinkek */}
				<NavLinks links={ADMIN_NAV_LINKS} isLoggedIn={true} userRole="admin" />
			</div>
		</nav>
	);
};

export default NavbarAdmin;
