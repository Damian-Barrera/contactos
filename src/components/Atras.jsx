import { useNavigate } from "react-router-dom"
import estilo from '../styles/atras.module.css'

const Atras = () => {

  const navigate = useNavigate()

  const getBack = () => {
    navigate(-1)
  }


  return (
    <div className={estilo.back} onClick={getBack} title="volver" >
      <i className="fa-solid fa-circle-arrow-left" ></i>
    </div>
  )
}

export default Atras
