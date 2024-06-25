
import useCasos from '../hooks/useCasos';
const PresentacionItem = ({usuario}) => {
    const {UsuariosID,Nombres,UserName,Permisos,Estado}=usuario
    const { handleModalModificarUsuario,handleModalBloqueoUsuario } = useCasos()
  return (
    <div className='border-b p-5 flex justify-between items-center'>
        <div>
            <p className="text-lg capitalize font-bold">{Nombres}</p>
            <p className="text-lg capitalize">{Permisos}</p>
            <p className="text-lg capitalize">{Estado}</p>
        </div>
        <div className="flex gap-4">
            <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={()=>handleModalModificarUsuario(usuario)}
            >
                Modificar Usuario
            </button>
            <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={()=>handleModalBloqueoUsuario(usuario)}
            >
                Bloquear Usuario
            </button>
        </div>
        
    </div>
  )
}

export default PresentacionItem