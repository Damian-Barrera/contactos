    import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
    import { db } from '../firebase/firebaseConfig';
    import { useEffect, useState } from 'react';
    import { Link } from 'react-router-dom';

    // Para trabajar con Sweet Alert2
    import Swal from 'sweetalert2';
    import withReactContent from 'sweetalert2-react-content';
    const MySwal = withReactContent(Swal);

    const Home = () => {
    const [contactos, setContactos] = useState([]);

    const contactsCollection = collection(db, 'contactos');

    useEffect(() => {
        // Escucha los cambios en tiempo real
        const unsubscribe = onSnapshot(contactsCollection, (snapshot) => {
        setContactos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });

        // Limpieza para detener la escucha al desmontar el componente
        return () => unsubscribe();
    }, []);

    const confirmDelete = (id) => {
        MySwal.fire({
        title: '¿Estás seguro de querer eliminar el contacto?',
        text: 'Esta acción no se puede revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        }).then((result) => {
        if (result.isConfirmed) {
            borrarContacto(id);
            Swal.fire({
            title: '¡Eliminado!',
            text: 'El contacto ha sido eliminado con éxito.',
            icon: 'success',
            });
        }
        });
    };

    const borrarContacto = async (id) => {
        const deletedContact = doc(db, 'contactos', id);
        await deleteDoc(deletedContact);
    };

    return (
        <div>
        <Link to="crear">
            <div className="newContact">
            Agregar
            <i className="fa-solid fa-address-card"></i>
            </div>
        </Link>
        <h1>Contactos</h1>
        <table className="tabla">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Editar</th>
                <th>Borrar</th>
            </tr>
            </thead>
            <tbody>
            {contactos.map((contacto) => (
                <tr key={contacto.id}>
                <td>{contacto.nombre}</td>
                <td>{contacto.direccion}</td>
                <td>{contacto.telefono}</td>
                <td className="edit">
                    <Link to={`editar/${contacto.nombre}/${contacto.id}`}>
                    <i className="fa-regular fa-pen-to-square"></i>
                    </Link>
                </td>
                <td className="trash" onClick={() => confirmDelete(contacto.id)}>
                    <i className="fa-solid fa-trash"></i>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    };

    export default Home;
