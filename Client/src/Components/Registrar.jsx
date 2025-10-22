import { useState } from "react";
import { GiAbstract023 } from "react-icons/gi";
import axios from "axios";

function Registrar() {
    const [Usuario, setUsuario] = useState('')
  const [Contraseña, setContraseña] = useState('')
  const [Nombre, setNombre] = useState('')

  const [Mensaje, setMensaje] = useState('')

  const RegistroSubmit = async (e) => {
    e.preventDefault();
    setMensaje('')
    try {
      const Server = await axios.post('http://localhost:3000/api/Registrar', {
        Usuario,
        Contraseña,
        Nombre
      })
      setMensaje(Server.data.Mensaje || 'Registrado')
      setNombre('')
      setUsuario('')
      setContraseña('')
    }
    catch (Error) {

    }
  }
  return (
    <>
      <form onSubmit={RegistroSubmit}>
        <h1>Registro De Usuario</h1>

        <label htmlFor="">Usuario:</label>
        <input type="text" name="User" id="Usuario" required value={Usuario} onChange={(e) => setUsuario(e.target.value)} />

        <label htmlFor="">Contraseña:</label>
        <input type="password" name="Password" id="Contraseña" required value={Contraseña} onChange={(e) => setContraseña(e.target.value)} />

        <label htmlFor="">Nombre:</label>
        <input type="text" name="Name" id="Nombre" required value={Nombre} onChange={(e) => setNombre(e.target.value)} />

        <input type="submit" value="Registrar" />

      </form>

      {Mensaje && <h1>{Mensaje}</h1>}
    </>
  )
}

export default Registrar
