import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import estilos from '../../src/styles/formulario.module.css'
import Atras from "./Atras";


const Editar = () => {

  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')

  const navigate = useNavigate()
  const { id } = useParams();


  const update = async (e) => {
    e.preventDefault()
    const contact = doc(db, "contactos", id)
    const data = { nombre, direccion, telefono }
    await updateDoc(contact, data)
    navigate('/')
  }

  const getContacts = async (id) => {
    const contact = await getDoc(doc(db, "contactos", id))

    if (contact.exists()) {
      // console.log(contact.data())
      setNombre(contact.data().nombre)
      setDireccion(contact.data().direccion)
      setTelefono(contact.data().telefono)

    } else {
      console.log('No hubo suerte')
    }


  }

  useEffect(() => {
    getContacts(id)
  }, [])


  return (
    <div>
      <Atras />
      <h1 >Editar Usuario</h1>
      <form className={estilos.form} onSubmit={update}>
        <label htmlFor="">Nombre</label>
        <input type="text" name="nombre" value={nombre} placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
        <label htmlFor="">Direccion</label>
        <input type="text" name="direccion" value={direccion} placeholder="Direccción" onChange={e => setDireccion(e.target.value)} />
        <label htmlFor="">Telefono</label>
        <input type="tel" name="telefono" value={telefono} placeholder="Telefono" onChange={e => setTelefono(e.target.value)} />
        <button type="submit" > Actualizar </button>
      </form>
    </div>
  )
}

export default Editar
