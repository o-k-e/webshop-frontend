import NavLinksUser from "./NavLinksUser"

const NavbarUser = () => {
  return (
    <header className="p-4 shadow-md bg-white">
      <div className="container mix-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">🪷 Ganesha Webshop 🪷</h1>
        <NavLinksUser />
      </div>
    </header>
  )
}

export default NavbarUser