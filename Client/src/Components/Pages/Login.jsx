import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import api from '../BackEnd/api'
import { AuthContext } from '../../Context/AuthContext'
import '../css/Login.css'

function Login() {
  const [Nombre, setNombre] = useState('')
  const [Contraseña, setContraseña] = useState('')
  const [Mensaje, setMensaje] = useState('')
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const LoginSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')
    try {
      const Server = await api.post('/Login', {
        Nombre,
        Contraseña
      })
      setMensaje(Server.data.Mensaje || 'Ingresado')
      setNombre('')
      setContraseña('')
      // Usar el contexto para guardar usuario
      login(Nombre)
      // Redirigir a inicio después de iniciar sesión exitosamente (después de 1.5 segundos)
      setTimeout(() => {
        navigate('/')
      }, 1500)

    }
    catch (Error) {
      console.error('Error iniciando sesión:', Error)
      const msg = Error?.response?.data?.Error || 'Error al iniciar sesión'
      setMensaje(msg)
    }

  }
  return (
    <>
      <form onSubmit={LoginSubmit}>
        <h1>Iniciar Sesión</h1>

        <label htmlFor="Nombre">Nombre de Usuario</label>
        <input type="text" name="Nombre" id="Nombre" required value={Nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: admin o Juan123" />

        <label htmlFor="Contraseña">Contraseña</label>
        <input type="password" name="Password" id="Contraseña" required value={Contraseña} onChange={(e) => setContraseña(e.target.value)} placeholder="Tu contraseña" />

        <input type="submit" value="Iniciar Sesión" />

        {Mensaje && <p className={`mensaje ${Mensaje.includes('error') || Mensaje.includes('Error') ? 'error' : 'success'}`}>{Mensaje}</p>}
      </form>
    </>
  )
}

export default Login
