import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";


function Encabezado() {
  const { usuarioActual, isAdmin, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleCerrarSesion = () => {
    logout()
    navigate('/')
  }
  
  return (
    <>
      <header className="encabezado">
        <img src="./assets/logo.jpg" alt="Logo" className="logo" />
         <nav className="menu">
                <Link to="/">Inicio</Link>
                <Link to="/VerProducto">Ver Productos</Link>
                
                {/* Mostrar solo para administradores */}
                {isAdmin && (
                  <Link to="/AgregarProducto">Agregar Productos</Link>
                )}

                {/* Si NO está loggeado, mostrar Registrarse y Login */}
                {!usuarioActual && (
                  <>
                    <Link to="/Registrar">Registrarse</Link>
                    <Link to="/Login">Iniciar Sesión</Link>
                  </>
                )}

                {/* Si está loggeado, mostrar nombre y opción cerrar sesión */}
                {usuarioActual && (
                  <>
                    <span style={{ color: '#C8ACD6', fontWeight: 'bold' }}>
                      Hola, {usuarioActual}
                    </span>
                    <button 
                      onClick={handleCerrarSesion}
                      style={{
                        background: 'linear-gradient(135deg, #433D8B, #2E236C)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '15px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(67, 61, 139, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #17153B, #433D8B)'
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 6px 16px rgba(67, 61, 139, 0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #433D8B, #2E236C)'
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = '0 4px 12px rgba(67, 61, 139, 0.3)'
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </>
                )}
            </nav>
      </header>

    </>
  )
}

export default Encabezado
