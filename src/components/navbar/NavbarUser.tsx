import NavLinksUser from './NavLinksUser';
import ganeshaLogo from '../../assets/ganesha-logo.png';

const NavbarUser = () => {
	return (
    <div className="flex items-center h-full w-full">
    {/* Bal oldal: Ganesha Admin */}
    <div className="basis-1/4 pl-10">
      <div className="text-2xl font-semibold text-gold leading-tight text-right">
        Ganesha
      </div>
    </div>

    {/* Középső: Ganesha logó – szélesebb */}
    <div className="basis-1/2 flex justify-center">
      <img
        src={ganeshaLogo}
        alt="Ganesha logo"
        className="w-48 h-48 object-contain"
      />
    </div>

    {/* Jobb oldal: linkek */}
    <div className="basis-1/4 pr-10 flex justify-end">
      <NavLinksUser />
    </div>
  </div>
	);
};

export default NavbarUser;
