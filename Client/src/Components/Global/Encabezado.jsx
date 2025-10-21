import { useState } from "react";
import { GiAbstract023 } from "react-icons/gi";
import axios from "axios";

function Encabezado() {
  const [User, setUser] = useState('')
  const [Password, setPassword] = useState('')
  const [Name, setName] = useState('')

  const [Mensaje, setMensaje] = useState('')

  const RegistroSubmit = async (e) => {
    e.preventDefault();
    setMensaje('')
    try {
      const Server = await axios.post('http://localhost:3001/registro', {
        User,
        Password,
        Name
      })
      setMensaje(Server.data.Mensaje || 'Registrado')
      setName('')
      setUser('')
      setPassword('')
    }
    catch (Error) {

    }
  }
  return (
    <>
      <header className="encabezado">
        <h1 > <GiAbstract023 /> </h1>
        <nav className="menu">
          <a href="">Login</a>
          <a href="">Registrar Usuario</a>
          <a href="">Eliminar Usuario</a>
        </nav>
      </header>

      <form onSubmit={RegistroSubmit}>
        <h1>Registro De Usuario</h1>

  <label htmlFor="">Usuario:</label>
  <input type="text" name="User" id="User" required value={User} onChange={(e)  => setUser(e.target.value)} />

  <label htmlFor="">Contraseña:</label>
  <input type="password" name="Password" id="Password" required value={Password} onChange={(e) => setPassword(e.target.value)} />

  <label htmlFor="">Nombre:</label>
  <input type="text" name="Name" id="Name" required value={Name} onChange={(e) => setName(e.target.value)} />

        <input type="submit" value="Registrar" />

      </form>

      {Mensaje && <h1>{Mensaje}</h1>}

    </>
  )
}

export default Encabezado
