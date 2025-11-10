import { useState } from "react";
import { GiAbstract023 } from "react-icons/gi";
import { Link } from "react-router-dom";


function Encabezado() {
  
  return (
    <>
      <header className="encabezado">
        <h1 > <GiAbstract023 /> </h1>
         <nav className="menu">
                <Link to="/">Home</Link>
                <Link to="/VerProducto">Ver Productos</Link>
                <Link to="/AgregarProducto">Agregar Productos </Link>
            </nav>
      </header>

    </>
  )
}

export default Encabezado
