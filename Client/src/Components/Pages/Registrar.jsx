// Atajo para crear componentes en React
import axios from 'axios'
import api  from '../BackEnd/api.js'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

function Registrar() {
    const [Nombre, setNombre] = useState('')
    const [Email, setEmail] = useState('')
    const [Contraseña, setContraseña] = useState('')
    const [Contraseña2, setContraseña2] = useState('')

    const [Mensaje, setMensaje] = useState('')
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMensaje('')

        if (Contraseña !== Contraseña2) {
            // Mostrar mensaje simple en la UI cuando las contraseñas no coinciden
            setMensaje('Las contraseñas deben ser iguales')
            return
        }

        try {
            const response = await api.post('/Registrar', {
                Nombre,
                Email,
                Contraseña
            })

            // Mostrar éxito solo si el servidor respondió correctamente
            if (response && response.data) {
                // Mostrar mensaje simple en la UI
                setMensaje(response.data.message || 'Usuario registrado exitosamente')
                // Limpiamos los parámetros
                setContraseña('')
                setContraseña2('')
                setNombre('')
                setEmail('')
                
                // Guardar usuario en contexto y redirigir a home después de 1.5 segundos
                login(Nombre)
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            }
        }
        catch (Error) {
            console.error('Error registrando usuario:', Error)
            const msg = Error?.response?.data?.Error || 'Error al registrar usuario'
            // Mostrar error sencillo en la UI
            setMensaje(msg)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Registrarse</h1>
                
                <label htmlFor="Nombre">Nombre de Usuario</label>
                <input type="text" name="Nombre" id="Nombre" required 
                value={Nombre} onChange={(e)=> setNombre(e.target.value)} placeholder="Ej: Juan123" />

                <label htmlFor="Email">Correo Electrónico</label>
                <input type="email" name="Email" id="Email" required 
                 value={Email} onChange={(e)=> setEmail(e.target.value)} placeholder="Ej: tu@correo.com"/>

                <label htmlFor="Contraseña">Contraseña</label>
                <input type="password" name="Contraseña" id="Contraseña" required
                 value={Contraseña} onChange={(e)=> setContraseña(e.target.value)} placeholder="Mínimo 6 caracteres" />

                <label htmlFor="Contraseña2">Repetir Contraseña</label>
                <input type="password" name="Contraseña2" id="Contraseña2" required 
                value={Contraseña2} onChange={(e)=> setContraseña2(e.target.value)} placeholder="Confirma tu contraseña" />

                <input type="submit" value="Registrar" />

                <div>
                    ¿Ya tienes cuenta? <Link to="/Login">Inicia sesión aquí</Link>
                </div>

                {Mensaje && <p className={`mensaje ${Mensaje.includes('error') || Mensaje.includes('Error') ? 'error' : 'success'}`}>{Mensaje}</p>}
            </form>
        </>
    )
}

export default Registrar