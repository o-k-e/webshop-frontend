import { Outlet } from "react-router-dom"
import NavbarAdmin from "../components/NavbarAdmin"

const AdminLayout = () => {
  return (
    <div>
        <header>
            <NavbarAdmin />
        </header>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default AdminLayout