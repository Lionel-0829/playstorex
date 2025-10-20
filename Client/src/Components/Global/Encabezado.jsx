import { GiAbstract023 } from "react-icons/gi";

function Encabezado() {
  return (
    <>
      <header className="encabezado">
        <h1> <GiAbstract023 /> </h1>
        <nav className="menu">
            <a href="">Login</a>
            <a href="">Registrar Usuario</a>
            <a href="">Eliminar Usuario</a>
        </nav>
      </header>
    </>
  )
}

export default Encabezado
