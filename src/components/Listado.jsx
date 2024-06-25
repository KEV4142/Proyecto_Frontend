import React, { useState, useEffect } from 'react';
import useCasos from '../hooks/useCasos';

const Listado = ({ colaboradoresIniciales, colaboradoresSeleccionadosIniciales, onColaboradoresSeleccionadosChange, sucursal }) => {
    const { mostrarAlerta } = useCasos()
    const [colaboradores, setColaboradores] = useState(colaboradoresIniciales);
    const [colaboradoresSeleccionados, setColaboradoresSeleccionados] = useState(colaboradoresSeleccionadosIniciales);
    const [sumaDistancias, setSumaDistancias] = useState(0);

    useEffect(() => {
        setColaboradores(colaboradoresIniciales);
    }, [colaboradoresIniciales]);

    useEffect(() => {
        setColaboradoresSeleccionados([]);
    }, [sucursal]);

    useEffect(() => {
        const total = colaboradoresSeleccionados.reduce((acumulador, colaboradorId) => {
            const colaborador = colaboradores.find(c => c.colaboradorid === colaboradorId);
            return acumulador + (colaborador ? colaborador.distancia : 0);
        }, 0);
        setSumaDistancias(total);
        onColaboradoresSeleccionadosChange(colaboradoresSeleccionados);
    }, [colaboradoresSeleccionados, colaboradores, onColaboradoresSeleccionadosChange]);


    const handleSelectColaborador = (colaboradorId) => {
        if (colaboradores) {
            const colaborador = colaboradores.find(c => c.colaboradorid === colaboradorId);
            const nuevaSuma = sumaDistancias + colaborador.distancia;
            let isSeleccionado = "";
            for (let i = 0; i < colaboradoresSeleccionados.length; i++) {
                if (colaboradoresSeleccionados[i] == colaboradorId) {
                    isSeleccionado = true;
                    break;
                } else {
                    isSeleccionado = false;
                }
            }
            if (nuevaSuma > 100 && !isSeleccionado) {
                mostrarAlerta(
                    {
                        msg: `No se pueden seleccionar colaboradores que sumen más de 100 KM.`,
                        error: true
                    }
                )
                return;
            }
            if (colaboradoresSeleccionados.includes(colaboradorId)) {
                setColaboradoresSeleccionados(colaboradoresSeleccionados.filter(colaboradorid => colaboradorid !== colaboradorId));
            } else {
                setColaboradoresSeleccionados([...colaboradoresSeleccionados, colaboradorId]);
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex gap-8">
                <div className="w-1/2 border border-gray-300 p-4">
                    <h2 className="text-lg font-bold mb-2">Lista de Colaboradores</h2>
                    <div className="overflow-y-auto max-h-40">
                        <ul className="divide-y divide-gray-200">
                            {colaboradores.map((colaborador) => (
                                <li
                                    key={colaborador.colaboradorid}
                                    onClick={() => handleSelectColaborador(colaborador.colaboradorid)}
                                    className={`cursor-pointer py-2 flex justify-between items-center ${colaboradoresSeleccionados.includes(colaborador.colaboradorid) ? 'bg-gray-200' : ''
                                        }`}
                                >
                                    <div>
                                        <span className="font-medium">{colaborador.nombre}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">{colaborador.distancia} km</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-1/2 border border-gray-300 p-4">
                    <h2 className="text-lg font-bold mb-2">Colaboradores Seleccionados</h2>
                    <div className="overflow-y-auto max-h-40">
                        <ul className="divide-y divide-gray-200">
                            {colaboradoresSeleccionados.length > 0 ? (
                                colaboradoresSeleccionados.map((colaboradorid) => (
                                    <li key={colaboradorid} className="py-2">
                                        {colaboradores.find(c => c.colaboradorid === colaboradorid)?.nombre}
                                    </li>
                                ))
                            ) : (
                                <li className="py-2 text-sm text-gray-500">Seleccione colaboradores de la lista izquierda...</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-xl text-gray-700 font-bold">
                    Distancia Total del Viaje: {sumaDistancias} KM
                </p>
            </div>
        </div>
    );
};

export default Listado;
