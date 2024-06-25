import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Selected from "./Selected";
import Selected2 from "./Selected2";
import Listado from "./Listado";
import Fecha from "./Fecha";
import Alerta from './Alerta';
import useCasos from '../hooks/useCasos';

const FormularioDos = () => {
    const { mostrarAlerta, alerta, submitFormularioDos, colaboradoresMapa, obtenerColaboradoresUnicos } = useCasos()
    const [sucursalid, setSucursalID] = useState('');
    const [transportistaid, setTransportistaID] = useState(-1);
    const [colaboradores1, setColaboradores1] = useState([]);
    const [colaboradoresSeleccionados, setColaboradoresSeleccionados] = useState([]);
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();
    const fechaFormateada = `${año}-${mes}-${dia}`;
    const actual = new Date(fechaFormateada).toISOString().split('T')[0];
    const [fecha, setFecha] = useState(actual);

    useEffect(() => {
        const actualizarColaboradores = async () => {
            const colaboradoresUnicosActualizados = obtenerColaboradoresUnicos(colaboradoresMapa, sucursalid);
            setColaboradores1(colaboradoresUnicosActualizados);
        };
        actualizarColaboradores();
    }, [sucursalid, colaboradoresMapa, obtenerColaboradoresUnicos]);

    const handleChangeSucursal = (event) => {
        const idd = parseInt(event.target.value);
        setSucursalID(idd);
    };

    const handleColaboradoresSeleccionadosChange = (nuevosColaboradoresSeleccionados) => {
        setColaboradoresSeleccionados(nuevosColaboradoresSeleccionados);
    };


    const handleSubmit = async e => {
        e.preventDefault();
        const fechaSeleccionada = new Date(fecha);
        const actual1 = new Date(actual);
        const isFechaFinMenor = fechaSeleccionada.getTime() < actual1.getTime();

        if (fecha.trim().length == 0) {
            mostrarAlerta(
                {
                    msg: 'Campo Fecha invalido.',
                    error: true
                }
            )
            return
        }
        else if (isFechaFinMenor) {
            mostrarAlerta(
                {
                    msg: `Fecha invalida, es anterior a la fecha Actual!!`,
                    error: true
                }
            )
            return
        }
        else if (sucursalid <= -1 ) {
            mostrarAlerta(
                {
                    msg: `No se tiene campo Sucursal Seleccionado.`,
                    error: true
                }
            )
            return
        }
        else if (colaboradoresSeleccionados.length==0) {
            mostrarAlerta(
                {
                    msg: 'No se tiene Colaboradores Seleccionados!!',
                    error: true
                }
            )
            return
        }
        else if (transportistaid <=-1) {
            mostrarAlerta(
                {
                    msg: `No se tiene campo Transportista Seleccionado.`,
                    error: true
                }
            )
            return
        }else{
            let colaboradoresFiltrados=[],viajesdetalle=[],i=-1;
            colaboradoresSeleccionados.forEach(registro => {
                i++;
                colaboradoresFiltrados = colaboradores1.find(colaborador => colaborador.colaboradorid === parseInt(registro));
                const sucColID = colaboradoresFiltrados ? colaboradoresFiltrados.succolid : null;
                viajesdetalle[i]=sucColID
            });

            await submitFormularioDos([fecha,sucursalid, transportistaid, viajesdetalle])
            setTransportistaID(-1);
            setSucursalID(-1);
            setFecha(actual);
        }
    }
    const { msg } = alerta;
    return (
        <form className="bg-white py-10 px-5 md:w-5/6 rounded-lg shadow" onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta} />}


            <div>
                <Fecha onChange={e => setFecha(e.target.value)} id="fecha" fecha={fecha} setFecha={setFecha} name="fecha" />
            </div>
            <div>
                <label className="text-gray-700 capitalize font-bold text-sm" htmlFor="sucursalid">Sucursal</label>
                <Selected IDD="SucursalID" id="sucursalid" name="sucursalid" value={sucursalid} scritpAxios={'/sucursales/activos/'} onChange={handleChangeSucursal} />
            </div>
            <br></br>
            <div>
                <Listado
                    colaboradoresIniciales={colaboradores1}
                    colaboradoresSeleccionadosIniciales={colaboradoresSeleccionados}
                    onColaboradoresSeleccionadosChange={handleColaboradoresSeleccionadosChange}
                    sucursal={sucursalid}
                />
            </div>
            <br></br>
            <div>
                <label className="text-gray-700 capitalize font-bold text-sm" htmlFor="transportistaid">Transportista</label>
                <Selected2 IDD="TransportistaID" id="transportistaid" name="transportistaid" value={transportistaid} scritpAxios={'/transportista/activos/'} onChange={e => setTransportistaID(e.target.value)} bandera={transportistaid}/>
            </div>
            <br></br>
            <input type="submit"
                value="Grabar Registro"
                className="mx-auto md:flex md:justify-center bg-gray-600 w-2/5 p-3 mt=10 uppercase font-bold text-white rounded cursor-pointer hoover:bg-gray-800 transition-colors" />

            {msg && <Alerta alerta={alerta} />}
        </form>
    )
}
export default FormularioDos