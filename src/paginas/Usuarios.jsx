import useCasos from '../hooks/useCasos';
import ModalUsuario from '../components/ModalUsuario';
import ModalUsuarioBloqueo from '../components/ModalUsuarioBloqueo';
import PresentacionItem from '../components/PresentacionItem';
import { useState } from 'react';

const Usuarios = () => {
    const { usuarios, handleModalUsuario } = useCasos()
    const itemsPerPage = 5
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = usuarios.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(usuarios.length / itemsPerPage);

    const handlePreviousClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    return (
        <>
            <h1 className="text-2xl font-black">Administrar Usuarios</h1>
            <button
                onClick={handleModalUsuario}
                type='button'
                className='text-sm px-5 py-5 w-full md:w-auto rounded-lg uppercase font-bold bg-teal-600 text-white text-center mt-5 flex gap-2'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Agregar Usuario
            </button>
            <div className="bg-white shadow mt-10 rounded-lg">
                {usuarios.length && usuarios[0].UsuariosID > -1 ?
                    (
                        <>
                            {currentItems.map(usuario => (
                                <PresentacionItem
                                    key={usuario.UsuariosID}
                                    usuario={usuario}
                                />
                            ))}
                            < div className="flex justify-between mt-4">
                                <button
                                    onClick={handlePreviousClick}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                                >
                                    Anterior
                                </button>
                                <button
                                    onClick={handleNextClick}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                                >
                                    Siguiente
                                </button>
                            </div>
                        </>
                    )
                    : <p className='text-center text-gray-600 uppercase p-5'>No se tienen Usuarios registrados.</p>}

            </div >

            <ModalUsuario />
            <ModalUsuarioBloqueo />
        </>
    )
}

export default Usuarios