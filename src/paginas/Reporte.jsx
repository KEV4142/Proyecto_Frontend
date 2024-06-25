import { useState } from "react";
import Alerta from '../components/Alerta';
import useCasos from '../hooks/useCasos';
import Selected from "../components/Selected";

const Reporte = () => {
    const [transportistaid, settransportistaID] = useState(-1);
    const [fechai, setFechaI] = useState('');
    const [fechaf, setFechaF] = useState('');
    const { mostrarAlerta, alerta, submitReporte } = useCasos();

    const handleChangeTransportista = (event) => {
        const idd = parseInt(event.target.value);
        settransportistaID(idd);
    };
    const handleSubmit = async e => {
        e.preventDefault();
        if ([fechai, fechaf].includes('')) {
            mostrarAlerta(
                {
                    msg: 'Campos Fechas vacios requeridos',
                    error: true
                }
            )
            return
        }
        const fechaInicioDate = new Date(fechai);
        const fechaFinDate = new Date(fechaf);
        const isFechaFinMayor = fechaFinDate.getTime() > fechaInicioDate.getTime();
        if (!isFechaFinMayor) {
            mostrarAlerta(
                {
                    msg: `Campo de Fecha Fin tiene que ser mayor que Fecha Inicial`,
                    error: true
                }
            )
            return
        }
        mostrarAlerta(
            {
                msg: `Espere Mientras se gestiona Por Favor`,
                error: false
            }
        )
        if (transportistaid <= -1) {
            mostrarAlerta(
                {
                    msg: `No se tiene campo Transportista Seleccionado.`,
                    error: true
                }
            )
            return
        }
        await submitReporte({ comodin: transportistaid, fechai: fechai, fechaf: fechaf })
    }
    const { msg } = alerta;
    return (
        <form className="bg-white py-10 px-5 md:w-5/6 rounded-lg shadow" onSubmit={handleSubmit}>

            <h1 className="text-2xl font-black">Reporte de Viajes.</h1>
            {msg && <Alerta alerta={alerta} />}
            <div className="mt-10 flex justify-center">
                <div>
                    <label className="text-gray-700 capitalize font-bold text-sm" htmlFor="transportistaid">Transportista</label>
                    <Selected IDD="TransportistaID" id="transportistaid" name="transportistaid" value={transportistaid} scritpAxios={'/transportista/activos/'} onChange={handleChangeTransportista} />
                </div>
                <div>
                    <label className="text-gray-700 capitalize font-bold text-sm" >Fecha Inicio</label>
                    <input onChange={e => setFechaI(e.target.value)} value={fechai} name="fechawf" type="date" className="border w-2/3 p-2 mt-2 mx-5 placeholder-gray-400 rounded-md" />
                </div>
                <div>
                    <label className="text-gray-700 capitalize font-bold text-sm" >Fecha Final</label>
                    <input onChange={e => setFechaF(e.target.value)} value={fechaf} name="fechawf" type="date" className="border w-2/3 p-2 mt-2 mx-5 placeholder-gray-400 rounded-md" />
                </div>
            </div>
            <br></br>
            <input type="submit"
                value="Generar Reporte"
                className="mx-auto md:flex md:justify-center bg-sky-600 w-2/5 p-3 mt=10 uppercase font-bold text-white rounded cursor-pointer hoover:bg-sky-800 transition-colors" />
        </form>
    )
}
export default Reporte