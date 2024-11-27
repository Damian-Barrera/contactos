import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { useEffect, useState } from 'react'
// import Crear from './Crear';
import { Link } from 'react-router-dom';
// import Editar from './Editar';
// import Crear from './Crear';
// Para trabajar con Sweeat Alert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Home = () => {

    const [contactos, setContactos] = useState([]);

    const contacts = collection(db, 'contactos')

    const obtenerContactos = async () => {

        const datos = await getDocs(contacts)
        setContactos(
            datos.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        )
    }

    useEffect(() => {
        obtenerContactos()
    }, [])

    const confirmDelete = (id) => {
        MySwal.fire({
            title: "Estas seguro de querer eliminar el contacto?",
            text: "Esta acción no se puede revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                //LLamar a la funcion que va a eliminar
                borrarContacto(id)
                Swal.fire({
                    title: "Eliminado!",
                    text: "Su archivo ha sido eliminado con exito.",
                    icon: "success"
                });
            }
        });
    }


    const borrarContacto = async (id) => {
        const deletedContact = doc(db, "contactos", id)
        await deleteDoc(deletedContact)
        obtenerContactos()

    }

    return (
        <div>
            <Link to="crear" >
                <div className="newContact">
                    Agregar
                    <i className="fa-solid fa-address-card"></i>
                </div>
            </Link>
            <h1>Contactos</h1>
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {contactos.map((contacto) => (
                        <tr key={contacto.id} >
                            <td> {contacto.nombre} </td>
                            <td> {contacto.direccion} </td>
                            <td> {contacto.telefono} </td>
                            <td className='edit' >
                                <Link to={`editar/${contacto.nombre}/${contacto.id}`} > <i className="fa-regular fa-pen-to-square"></i> </Link>
                            </td>
                            <td className='trash' onClick={() => { confirmDelete(contacto.id) }} >
                                <i className="fa-solid fa-trash"></i>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Home
