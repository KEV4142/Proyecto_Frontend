import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useCasos from '../hooks/useCasos'
import Alerta from './Alerta'
const ModalUsuario = () => {
    const { modalUsuario, handleModalUsuario, mostrarAlerta, alerta, submitUsuario,usuario } = useCasos()
    const [usuariosid, setUsuariosID] = useState(-1)
    const [nombres, setNombres] = useState('')
    const [username, setUsername] = useState('')
    const [permisosid, setPermisosID] = useState('')
    const [estado, setEstado] = useState('A')
    const PERMISO = [[0, 'Administrador'], [1, 'Reporteria'], [2, 'Operador']]
    const ESTADOO = [['A', 'Activo'], ['B', 'Bloqueado'], ['I', 'inactivo']]

    useEffect(()=>{
        if(usuario.UsuariosID>-1){
            setUsuariosID(usuario.UsuariosID)
            setNombres(usuario.Nombres)
            setUsername(usuario.UserName)
            setPermisosID(usuario.PermisosID)
            setEstado(usuario.Estadoo)
            return
        }
        setUsuariosID(-1)
        setNombres('')
        setUsername('')
        setPermisosID('')
        setEstado('A')
    },[usuario]);


    const handleSubmit =async e => {
        e.preventDefault()
        if ([usuariosid,nombres, username, permisosid,estado].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios!!',
                error: true
            })
            return
        }
        await submitUsuario({ usuariosid,nombres, username, permisosid,estado })
        setNombres('')
        setUsername('')
        setPermisosID('')
        setEstado('A')
    }
    const { msg } = alerta
    return (
        <Transition.Root show={modalUsuario} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalUsuario}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalUsuario}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        {usuariosid>-1 ? 'Modificar Usuario': 'Agregar Usuario'}
                                    </Dialog.Title>
                                    {msg && <Alerta alerta={alerta} />}
                                    <form className='my-5' onSubmit={handleSubmit}>
                                        <div className='mb-5'>
                                            <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='nombres'>
                                                Nombres de Usuario :
                                            </label>
                                            <input type="text" id='nombres' name='nombres' placeholder='Ingrese nombres de Usuario'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' maxLength={150}
                                                value={nombres} onChange={e => setNombres(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='username'>
                                                Correo de Usuario :
                                            </label>
                                            <input type="email" id='username' name='username' placeholder='Ingrese correo electronico'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' maxLength={150}
                                                value={username} onChange={e => setUsername(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='permisosid'>
                                                Permisos del Usuario :
                                            </label>
                                            <select  id='permisosid' name='permisosid'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' maxLength={150}
                                                value={permisosid} onChange={e => setPermisosID(e.target.value)}
                                            >
                                                <option value="">- Seleccionar -</option>
                                                {
                                                    PERMISO.map(option => (
                                                        <option key={option[0]} value={option[0]}>
                                                            {option[1]}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        {usuario && usuario.UsuariosID > -1 ?
                                        <div className='mb-5'>
                                            <label className='text-gray-700 uppercase font-bold text-sm' htmlFor='estado'>
                                                Estado del Usuario :
                                            </label>
                                            <select  id='estado' name='estado'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' maxLength={150}
                                                value={estado} onChange={e => setEstado(e.target.value)}
                                            >
                                                <option value="">- Seleccionar -</option>
                                                {
                                                    ESTADOO.map(option => (
                                                        <option key={option[0]} value={option[0]}>
                                                            {option[1]}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        :''}

                                        <input
                                            type='submit'
                                            className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded'
                                            value={usuariosid>-1 ? 'Modificar Usuario': 'Agregar Usuario'}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalUsuario