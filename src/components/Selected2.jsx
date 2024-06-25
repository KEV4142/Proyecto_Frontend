import { useState, useEffect } from 'react'

import clienteAxios from "../config/clienteAxios"
export const Selected2 = ({ IDD, scritpAxios, onChange, value,bandera }) => {
    const token = localStorage.getItem('token');
    const [servicios, setServicios] = useState([]);
    const [tarifa, setTarifa] = useState("");

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
    useEffect(() => {
        if(bandera==-1){
            setTarifa("");
        }
    }, [bandera]);

    const handleChangeT = (event) => {
        const selectedId = parseInt(event.target.value);
        const selectedService = servicios.find(servicio => servicio[IDD] === selectedId);
        if (selectedService) {
            setTarifa(selectedService.Tarifa);
        } else {
            setTarifa('');
        }
        onChange(event); 
    };

    return (
        <div>
            <select onChange={handleChangeT} className="border w-2/3 p-2 mt-2 mx-5 placeholder-bg-400 rounded-md" value={value}>
                <option value={-1}>Selecciona una opción</option>
                {servicios.map(opcioni => (
                    <option key={opcioni[IDD]} value={opcioni[IDD]}>
                        {opcioni.Nombre}
                    </option>
                ))}
            </select>

            <div className="mt-4">
                <p className="text-xl text-gray-700 font-bold">
                    Tarifa: {tarifa}
                </p>
            </div>
        </div>
    );
};
export default Selected2