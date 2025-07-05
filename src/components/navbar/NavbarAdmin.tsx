import NavLinksAdmin from "./NavLinksAdmin"

const NavbarAdmin = () => {
  return (
    <header className="p-4 shadow-md bg-white">
      <div className="container mix-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">🪷 Ganesha Webshop Admin Panel 🪷</h1>
        <NavLinksAdmin />
      </div>
    </header>
  )
}

export default NavbarAdmin