import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom";
import Selected from "./Selected";
import Alerta from './Alerta'
import useCasos from '../hooks/useCasos'

const FormularioUno = () => {
    const { mostrarAlerta, alerta, submitFormularioUno } = useCasos()
    const [colaboradorid, setColaboradorID] = useState(-1);
    const [sucursalid, setSucursalID] = useState(-1);
    const [distancia, setDistancia] = useState('');

    const handleChangeD = (e) => {
        let valor = e.target.value;
        if (isNaN(valor) || valor <= 0 || valor > 50) {
            return;
        }
        setDistancia(valor);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (distancia.trim().length == 0) {
            mostrarAlerta(
                {
                    msg: `Campo Distancia es obligatorio`,
                    error: true
                }
            )
            return
        }
        else if (colaboradorid == -1 || colaboradorid.trim().length == 0) {
            mostrarAlerta(
                {
                    msg: `No se tiene campo Colaborador Seleccionado.`,
                    error: true
                }
            )
            return
        }
        else if (sucursalid == -1 || sucursalid.trim().length == 0) {
            mostrarAlerta(
                {
                    msg: `No se tiene campo Sucursal Seleccionado.`,
                    error: true
                }
            )
            return
        }
        else {
            await submitFormularioUno([sucursalid, colaboradorid, distancia])
            setColaboradorID(-1);
            setSucursalID(-1);
            setDistancia("");
        }
    }
    const { msg } = alerta;
    return (
        <form className="bg-white py-10 px-5 md:w-5/6 rounded-lg shadow" onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta} />}

            <div>
                <label className="text-gray-700 capitalize font-bold text-sm" htmlFor="colaboradorid">Colaborador</label>
                <Selected IDD="ColaboradorID" id="colaboradorid" name="colaboradorid" value={colaboradorid} scritpAxios={'/colaboradores/activos/'} onChange={e => setColaboradorID(e.target.value)} />
            </div>
            <div>
                <label className="text-gray-700 capitalize font-bold text-sm" htmlFor="sucursalid">Sucursal</label>
                <Selected IDD="SucursalID" id="sucursalid" name="sucursalid" value={sucursalid} scritpAxios={'/sucursales/activos/'} onChange={e => setSucursalID(e.target.value)} />
            </div>
            <div>
                <label className="text-gray-700 capitalize font-bold text-sm" htmlFor="distancia">Distancia (KM)</label>
                <input onChange={handleChangeD} value={distancia} name="distancia" id="distancia" type="number" className="border w-1/3 p-2 mt-2 mx-5 placeholder-gray-400 rounded-md" minLength={0} maxLength={50} />
            </div>
            <br></br>
            <input type="submit"
                value="Grabar Registro"
                className="mx-auto md:flex md:justify-center bg-gray-600 w-2/5 p-3 mt=10 uppercase font-bold text-white rounded cursor-pointer hoover:bg-gray-800 transition-colors" />

            {msg && <Alerta alerta={alerta} />}
        </form>
    )
}
export default FormularioUno