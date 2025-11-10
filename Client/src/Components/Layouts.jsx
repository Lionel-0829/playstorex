
import Encabezado from './Global/Encabezado'
import './Layouts.css'
import VerProducto from '../Components/Pages/VerProducto'
import AgregarProducto from '../Components/Pages/AgregarProducto'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Layouts() {
  return (
    <>
      <Router>
        <Encabezado />
        <Routes>
          <Route path="/VerProducto" element={<VerProducto />} />
          <Route path="/AgregarProducto" element={<AgregarProducto />} />
        </Routes>
      </Router>

    </>
  )
}

export default Layouts
