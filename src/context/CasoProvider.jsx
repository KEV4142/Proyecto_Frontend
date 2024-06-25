import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth"
import { UNSAFE_DataRouterStateContext, useNavigate } from "react-router-dom";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const CasoContext = createContext();

const CasoProvider = ({ children }) => {

    const [usuarios, setUsuarios] = useState([{}]);
    const [usuario, setUsuario] = useState({});
    const [alerta, setAlerta] = useState([]);
    const [cargando, setCargando] = useState(false);
    const { auth } = useAuth();
    const usuariosid = auth.usuariosid
    const navigate = useNavigate();
    const [modalUsuario, setModalUsuario] = useState(false)
    const [modalUsuarioBloqueo, setModalUsuarioBloqueo] = useState(false)
    const [colaboradoresMapa, setColaboradoresMapa] = useState([]);
    const [colaboradoresT, setColaboradoresT] = useState([]);

    useEffect(() => {
        if (auth.permisosid == 0) {
            const ObtenerUsuarios = async () => {
                try {
                    const token = localStorage.getItem('token');
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
                    const data = await clienteAxios('/gestores/listado', config)
                    const datos = JSON.parse(JSON.stringify(data.data))
                    setUsuarios(datos)
                } catch (error) {
                    console.log(error)
                }
            }
            ObtenerUsuarios()
            const ObtenerColaboradoresMapa = async () => {
                try {
                    const token = localStorage.getItem('token');
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
                    const data = await clienteAxios('/sucursalescolaboradores/listado', config)
                    const datos = JSON.parse(JSON.stringify(data.data))
                    setColaboradoresMapa(datos)
                } catch (error) {
                    console.log(error)
                }
            }
            ObtenerColaboradoresMapa()
        }
    }, [auth])


    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000)
    }

    const CerrarSesionCaso = () => {
        setAlerta([])
    }

    const submitClave = async claves => {
        const token = localStorage.getItem('token');
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
            const dataModificado = await clienteAxios.put(`/gestores/clave/${claves.usuariosid}`, claves, config)
            setAlerta({
                msg: 'Se Actualizo de forma correcta Clave Usuario',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/Dashboard')
            }, 3000);
        } catch (error) {
            console.log(error)
            setAlerta({
                msg: 'Error al Actualizar Clave!!',
                error: true
            })
        }
    }

    const handleModalUsuario = () => {
        setModalUsuario(!modalUsuario)
        setUsuario({})
    }
    const submitUsuario = async usuario => {
        const token = localStorage.getItem('token');
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
            if (usuario.usuariosid > -1) {
                const dataModificado = await clienteAxios.put(`/gestores/${usuario.usuariosid}`, usuario, config)
                setAlerta({
                    msg: 'Se Actualizo de forma correcta Usuario',
                    error: false
                })
                const data = await clienteAxios('/gestores/listado', config)
                const datos = JSON.parse(JSON.stringify(data.data))
                setUsuarios(datos)
            } else if (usuario.usuariosid === -1) {
                usuario.clave = "123456789"
                usuario.skillid = 0
                usuario.estado = "A"
                const dataAgregado = await clienteAxios.post('/gestores', usuario, config)
                const data = await clienteAxios('/gestores/listado', config)
                const datos = JSON.parse(JSON.stringify(data.data))
                setUsuarios(datos)
                setAlerta({
                    msg: 'Se registro de forma correcta Usuario con clave = 123456789',
                    error: false
                })
            }
            setTimeout(() => {
                setAlerta({})
                setUsuario({})
                setModalUsuario(false)
            }, 3000);
        } catch (error) {
            console.log(error)
            setAlerta({
                msg: 'Error al Guardar/Actualizar registro!!',
                error: true
            })
        }
    }
    const handleModalModificarUsuario = usuari => {
        setUsuario(usuari)
        setModalUsuario(true)
    }
    const handleModalBloqueoUsuario = usuari => {
        setUsuario(usuari)
        setModalUsuarioBloqueo(!modalUsuarioBloqueo)
    }
    const bloquearUsuario = async () => {
        try {
            const token = localStorage.getItem('token');
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
            usuario.Estado = "BLOQUEO"
            const dataModificado = await clienteAxios.post(`/gestores/${usuario.UsuariosID}`, usuario, config)
            setAlerta({
                msg: 'Se Bloqueo de forma correcta Usuario',
                error: false
            })
            const data = await clienteAxios('/gestores/listado', config)
            const datos = JSON.parse(JSON.stringify(data.data))
            setUsuarios(datos)
            setTimeout(() => {
                setAlerta({})
                setUsuario({})
                setModalUsuarioBloqueo(false)
            }, 3000);
        } catch (error) {
            console.log(error)
            setAlerta({
                msg: 'Error en el proceso de Bloqueo!!',
                error: true
            })
        }
    }

    const submitFormularioUno = async datos => {
        const token = localStorage.getItem('token');
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

            const colaboradorid = datos[1];
            const sucursalid = datos[0];
            const distancia = datos[2];
            const campos = { sucursalID: sucursalid, colaboradorid: colaboradorid, distancia: distancia };
            const dataAgregado = await clienteAxios.post('/sucursalescolaboradores', campos, config);
            
            const data = await clienteAxios('/sucursalescolaboradores/listado', config);
            const datos1 = JSON.parse(JSON.stringify(data.data));
            setColaboradoresMapa(datos1);

            setAlerta({
                msg: 'Se registro de forma correcta Colaborador con Sucursal.',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }
    }
    const submitFormularioDos = async datos => {
        const token = localStorage.getItem('token');
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
            const fecha = datos[0];
            const sucursalid = datos[1];
            const transportistaid = datos[2];
            let viajesdetalle = [], i = -1;
            const viajes = { fecha: fecha, sucursalid: sucursalid, transportistaid: transportistaid };
            datos[3].forEach(registro => {
                i++;
                viajesdetalle[i] = { succolid: registro }
            });
            const datas = { viajes, viajesdetalle };

            const dataAgregado = await clienteAxios.post('/registro', datas, config)
            setAlerta({
                msg: 'Se registro de forma correcta Colaborador con Sucursal.',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }
    }
    const obtenerColaboradoresUnicos = (data, sucursalId) => {
        const colaboradoresFiltrados = (sucursalId >= 0) ? data.filter(colaborador => parseInt(colaborador.SucursalID) == parseInt(sucursalId)) : data;
        if (colaboradoresFiltrados) {
            const colaboradoresUnicos = new Map();
            colaboradoresFiltrados.forEach(colaborador => {
                colaboradoresUnicos.set(colaborador.colaboradorid, {
                    colaboradorid: colaborador.colaboradorid,
                    nombre: colaborador.nombre,
                    distancia: colaborador.Distancia,
                    succolid: colaborador.SucColID
                });
            });
            return Array.from(colaboradoresUnicos.values());
        } else {
            return "";
        }
    }
    const exportToPDF = (data, fechai, fechaf, total, descripcion) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(`Reporte desde ${fechai} hasta ${fechaf}`, 14, 10);
        const tablaDatos = data.map(row => Object.values(row));
        doc.autoTable({
            head: [['Fecha', 'Sucursal', 'Nombre', 'Distancia', 'Tarifa', 'Costo Viaje']],
            body: tablaDatos
        });
        doc.setFontSize(12);
        doc.text(`Empresa: ${descripcion} Total General: ${total}`, 14, doc.autoTable.previous.finalY + 10);
        const noPagina = doc.internal.getNumberOfPages();
        for (let i = 1; i <= noPagina; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(`Página ${i} de ${noPagina}`, doc.internal.pageSize.width - 50, doc.internal.pageSize.height - 10);
        }
        doc.save(`reporte_${descripcion}.pdf`);
    };
    const submitReporte = async fechas => {
        const token = localStorage.getItem('token');
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
            const { comodin, fechai, fechaf } = fechas
            const { data } = await clienteAxios.post('/registro/reporte/', fechas, config);
            const datos = JSON.parse(JSON.stringify(data))
            let arreglo = [];
            for (let i = 0; i < Object.keys(datos[0][0]).length; i++) {
                let linea = [datos[0][0][i].Fecha, datos[0][0][i].Sucursal, datos[0][0][i].Nombre, datos[0][0][i].Distancia, datos[0][0][i].tarifa, datos[0][0][i].Total];
                arreglo[i] = linea;
            }
            const total = datos[1][0][0].Total;
            const descripcion = datos[1][0][0].Transportista;
            console.log(descripcion);
            exportToPDF(arreglo, fechai, fechaf, total, descripcion,);
            setAlerta({
                msg: 'Se Gestiono Reporte',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                //navigate('/Dashboard')
            }, 3000);
        } catch (error) {
            console.log(error)
            setAlerta({
                msg: 'Error al Gestionar Reporte!!',
                error: true
            })
        }
    }
    return (
        <CasoContext.Provider
            value={{
                mostrarAlerta,
                alerta,
                cargando,
                CerrarSesionCaso,
                modalUsuario,
                handleModalUsuario,
                submitUsuario,
                usuarios,
                usuario,
                handleModalModificarUsuario,
                handleModalBloqueoUsuario,
                modalUsuarioBloqueo,
                bloquearUsuario,
                submitClave,
                submitFormularioUno,
                colaboradoresMapa,
                obtenerColaboradoresUnicos,
                submitFormularioDos,
                submitReporte
            }}
        >{children}
        </CasoContext.Provider>
    )
}
export { CasoProvider }
export default CasoContext