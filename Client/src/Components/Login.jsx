import { useState } from "react"
import axios from "axios"

function Login() {
    const[Usuario,setUsuario]=useState('')
    const[Contraseña,setContraseña]=useState('')
    const[Mensaje,setMensaje]=useState('')

    const LoginSubmit = async(e) => {
    e.preventDefault()
    setMensaje('')
    try{
        const Server= await axios.post('http://localhost:3000/api/Login', {
        Usuario,
        Contraseña
      })
    }
    catch(Error){
      setMensaje(Server.data.Mensaje || 'loggeado')
      setUsuario('')
      setContraseña('')
    }

    }
  return (
    <>
      <form onSubmit={LoginSubmit}>
        <h1>Login</h1>

        <label htmlFor="">Usuario:</label>
        <input type="text" name="User" id="Usuario" required value={Usuario} onChange={(e) => setUsuario(e.target.value)} />

        <label htmlFor="">Contraseña:</label>
        <input type="password" name="Password" id="Contraseña" required value={Contraseña} onChange={(e) => setContraseña(e.target.value)} />

        <input type="submit" value="Login" />

      </form>

      {Mensaje && <h1>{Mensaje}</h1>}
    </>
  )
}

export default Login
