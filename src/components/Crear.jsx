import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Atras from './Atras';
import estilos from '../styles/formulario.module.css'




const Crear = () => {

    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')

    const navigate = useNavigate()

    const contacts = collection(db, 'contactos')

    const agregarUsuario = async (e) => {
        e.preventDefault();
        await addDoc(contacts, { nombre, direccion, telefono })
        navigate('/')
    }

 
    return (
        <>
            <Atras />
             <h1>Agregar Usuarios</h1>
            <form className={estilos.form} onSubmit={agregarUsuario}>
                <label htmlFor="">Nombre</label>
                <input type="text" name="nombre" value={nombre} placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
                <label htmlFor="">Direccion</label>
                <input type="text" name="direccion" value={direccion} placeholder="Direccción" onChange={e => setDireccion(e.target.value)} />
                <label htmlFor="">Telefono</label>
                <input type="tel" name="telefono" value={telefono} placeholder="Telefono" onChange={e => setTelefono(e.target.value)} />
                <button type="submit" > Agregar </button>
            </form>
        </>
    )
}

export default Crear
