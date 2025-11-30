// rfce + Enter 
import axios from 'axios'
import api  from '../BackEnd/api.js'
import { useState } from 'react'

function Registrar() {
    const [Nombre, setNombre] = useState('')
    const [Email, setEmail] = useState('')
    const [Contraseña, setContraseña] = useState('')
    const [Contraseña2, setContraseña2] = useState('')

    const [Mensaje, setMensaje] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMensaje('')

        if (Contraseña !== Contraseña2) {
            Swal.fire({
                title: "Error",
                text: "Las Contraseñas deben ser Iguales",
                icon: "Error",
                draggable: true
            });
            return
        }

        try {
            const servidor = api.post('/Registrar', {
                Nombre,
                Email,
                Contraseña
            })
            Swal.fire({
                title: "Confirmación de Usuario",
                text:"Revise su Gmail para Verificar su usuario",
                icon: "success",
                draggable: true
            });
            // ---> Limpiamos los parametros
            setContraseña('')
            setContraseña2('')
            setNombre('')
            setEmail('')
        }
        catch (Error) {

        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Nombre">Nombre:</label>
                <input type="text" name="Nombre" id="Nombre" required 
                value={Nombre} onChange={(e)=> setNombre(e.target.value)} />

                <label htmlFor="Email">Email:</label>
                <input type="email" name="Email" id="Email" required 
                 value={Email} onChange={(e)=> setEmail(e.target.value)}/>

                <label htmlFor="Contraseña">Contraseña:</label>
                <input type="password" name="Contraseña" id="Contraseña" required
                 value={Contraseña} onChange={(e)=> setContraseña(e.target.value)} />

                <label htmlFor="Contraseña2">Repetir Contraseña:</label>
                <input type="password" name="Contraseña2" id="Contraseña2" required 
                value={Contraseña2} onChange={(e)=> setContraseña2(e.target.value)}/>

                <input type="submit" value="Registrar" />

                {Mensaje && <p className='mensaje'>{Mensaje}</p>}
            </form>
        </>
    )
}

export default Registrar