import { Routes, Route, Navigate } from 'react-router-dom'
import Crear from '../components/Crear'
import Home from '../components/Home'
import Editar from '../components/Editar'


const Rutas = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} ></Route>
                <Route path='/crear' element={<Crear />} >  </Route>
                <Route path ="/editar/:nombre/:id" element={<Editar/>} ></Route>
                <Route path='*' element={<Navigate to='/' />} ></Route>
            </Routes>
        </>
    )
}

export default Rutas
