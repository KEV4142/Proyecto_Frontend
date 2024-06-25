import clienteAxios from '../config/clienteAxios.jsx'
import Alerta from '../components/Alerta.jsx'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth.jsx'

const Login = () => {
    const [username, setUsername] = useState('');
    const [clave, setClave] = useState('');
    const [alerta, setAlerta] = useState({});
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        if ([username, clave].includes('')) {
            setAlerta({
                msg: 'Se validan campos vacios y son obligatorios!!',
                error: true
            });
            return;
        }
        try {
            const { data } = await clienteAxios.post('/gestores/login', { username, clave });
            setAlerta({});
            localStorage.setItem('token', data.token);
            setAuth(data);
            navigate('/Dashboard');
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alerta;
    return (
        <>
            <h1 className="text-lime-900 font-black text-xl capitalize md:flex md:justify-center">Inicio de sesión</h1>
            {msg && <Alerta alerta={alerta} />}
            <form className="my-10 bg-white shadow rounded-lg px-10 py-5" onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="username">Usuario</label>
                    <input type="email" placeholder="Ingrese el correo electronico" className="w-full mt-2 p-3 border rounded-xl bg-gray-50" id="username" value={username} onChange={e => setUsername(e.target.value)}></input>
                </div>
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="clave">Contraseña</label>
                    <input type="password" placeholder="Ingrese la contraseña" className="w-full mt-2 p-3 border rounded-xl bg-gray-50" id="clave" value={clave} onChange={e => setClave(e.target.value)}></input>
                </div>
                <input type="submit" value="Ingresar" className="hover:bg-green-950 transition-colors bg-green-900 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer" />
            </form>
        </>
    )
}

export default Login