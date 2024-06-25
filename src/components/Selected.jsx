import { useState, useEffect } from 'react'
import clienteAxios from "../config/clienteAxios"

export const Selected = ({ IDD, scritpAxios, onChange,value }) => {
    const token = localStorage.getItem('token');
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        const ServicioData = async () => {
            if (!token) {
                setCargando(false);
                return;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios(scritpAxios, config)
                setServicios(JSON.parse(JSON.stringify(data)));
            } catch (error) {
                console.log(error)
            }
        }
        ServicioData()
    }, []);
    return (
        <select onChange={onChange} className="border w-2/3 p-2 mt-2 mx-5 placeholder-bg-400 rounded-md" value={value}>
            <option value={-1}>Selecciona una opción</option>
            {servicios.map(opcioni => (
                <option key={opcioni[IDD]} value={opcioni[IDD]}>
                    {opcioni.Nombre}
                </option>
            ))}
        </select>
    );
};
export default Selected