import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useCasos from "../hooks/useCasos"


const Sidebar = () => {
  const { auth, CerrarSesionAuth } = useAuth();
  const { CerrarSesionCaso } = useCasos();

  const handleCerrarSesion = () => {
    CerrarSesionAuth()
    CerrarSesionCaso()
    localStorage.removeItem('token')
  }
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10 capitalize">
      <Link className="text-xl font-bold" to="perfil-usuario" >{auth.nombres}</Link>
      {auth.permisosid == 0 ?
        <Link className="bg-green-800 w-full p-3 text-white capitalize font-bold block mt-5 text-center rounded-lg" to="administrar">Administrar Sucursales</Link>
        : ''}
      {auth.permisosid == 0 ?
        <Link className="bg-green-800 w-full p-3 text-white capitalize font-bold block mt-5 text-center rounded-lg" to="registros">Registro de Viajes</Link>
        : ''}
      {auth.permisosid == 0 || auth.permisosid == 1 ?
        <Link className="bg-green-800 w-full p-3 text-white capitalize font-bold block mt-5 text-center rounded-lg" to="reporte-transportista">Reporte</Link>
        : ''}
      {auth.permisosid == 0 ?
        <Link className="bg-teal-600 w-full p-1 text-white capitalize font-bold block mt-3 text-center rounded-lg" to="mantenimiento-usuarios">Administrar Usuarios</Link>
        : ''}
      <input type="button"
        value="Cerrar Sesión"
        onClick={handleCerrarSesion}
        className="bg-green-800 w-full p-3 text-white capitalize font-bold block mt-5 text-center rounded-lg cursor-pointer" />
    </aside>
  )
}

export default Sidebar