import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout.jsx';
import RutaProtegida from './layouts/RutaProtegida.jsx';
import Login from './paginas/Login.jsx';
import Dashboard from './paginas/Dashboard.jsx';
import SucursalesColaboradores from './paginas/SucursalesColaboradores.jsx';
import RegistroViajes from './paginas/RegistroViajes.jsx';
import Reporte from './paginas/Reporte.jsx';
import Usuarios from './paginas/Usuarios.jsx';
import { AuthProvider } from './context/AuthProvider.jsx'
import { CasoProvider } from './context/CasoProvider.jsx'

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <CasoProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
            </Route>
            <Route path="/Dashboard" element={<RutaProtegida />}>
              <Route index element={<Dashboard />} />
              <Route path="registros" element={<RegistroViajes />} />
              <Route path="administrar" element={<SucursalesColaboradores />} />
              <Route path="reporte-transportista" element={<Reporte />} />
              <Route path="mantenimiento-usuarios" element={<Usuarios />} />
            </Route>
          </Routes>
        </CasoProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
