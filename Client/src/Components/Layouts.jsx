
import Encabezado from './Global/Encabezado'
import './Layouts.css'
import VerProducto from './Global/VerProducto'
import Home from './Global/Home'
import AgregarProducto from '../Components/Pages/AgregarProducto'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registrar from './Pages/Registrar';
import Login from './Pages/Login';

function Layouts() {
  return (
    <>
      <Router>
        <Encabezado />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/VerProducto" element={<VerProducto />} />
          <Route path="/AgregarProducto" element={<AgregarProducto />} />
          <Route path="/Registrar" element={<Registrar />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>

    </>
  )
}

export default Layouts
