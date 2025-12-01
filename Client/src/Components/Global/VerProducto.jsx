import { useState, useEffect, useContext } from 'react'
import api from '../BackEnd/api'
import { AuthContext } from '../../Context/AuthContext'
import Modal from '../Modal'
import './VerProducto.css'
import Footer from './Footer'

function VerProducto() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAdmin } = useContext(AuthContext)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [productoEditando, setProductoEditando] = useState(null)
  const [datosEdicion, setDatosEdicion] = useState({ Nombre: '', Precio: '', Cantidad: '', Descripcion: '', Categoria: '' })

  useEffect(() => {
    api.get('/ObtenerProductos').then(res => {
      setProductos(res.data || [])
      setLoading(false)
    }).catch(err => { console.error(err); setLoading(false) })
  }, [])

  const handleEditar = (p) => {
    setProductoEditando(p)
    setDatosEdicion({ Nombre: p.Nombre, Precio: p.Precio, Cantidad: p.Cantidad, Descripcion: p.Descripcion || '', Categoria: p.Categoria || '' })
    setMostrarModal(true)
  }

  const handleGuardarEdicion = async () => {
    try {
      await api.put(`/EditarProducto/${productoEditando.Codigo}`, datosEdicion)
      setProductos(productos.map(x => x.Codigo === productoEditando.Codigo ? { ...x, ...datosEdicion } : x))
      setMostrarModal(false)
      alert('Producto actualizado')
    } catch (e) { console.error(e); alert('Error al guardar') }
  }

  if (loading) return <div className="contenedor"><p>Cargando productos...</p></div>

  return (
    <div className="contenedor">
      <h1>Catálogo de Productos</h1>
      <div className="productos">
        {productos.length ? productos.map(producto => (
          <div key={producto.Codigo} className="product-card">
            {producto.Imagen && <img src={producto.Imagen} alt={producto.Nombre} className="product-image" />}
            <div className="product-content">
              <h2>{producto.Nombre}</h2>
              <p className="price">${producto.Precio}</p>
              <p className="description">{producto.Descripcion}</p>
              <p className="category"><strong>Categoría:</strong> {producto.Categoria || 'N/A'}</p>
              <p className="quantity"><strong>Stock:</strong> {producto.Cantidad}</p>
              {isAdmin && (
                <div className="admin-actions">
                  <button className="btn-edit" onClick={() => handleEditar(producto)}>Editar</button>
                  <button className="btn-delete" onClick={() => { if (confirm('Borrar?')) { api.delete(`/BorrarProducto/${producto.Codigo}`).then(()=> setProductos(productos.filter(p=>p.Codigo!==producto.Codigo))) } }}>Borrar</button>
                </div>
              )}
            </div>
          </div>
        )) : <p>No hay productos</p>}
      </div>

      <Modal isOpen={mostrarModal} onClose={() => setMostrarModal(false)}>
        <h2>Editar Producto</h2>
        <label>Nombre</label>
        <input name="Nombre" value={datosEdicion.Nombre} onChange={e=>setDatosEdicion({...datosEdicion, [e.target.name]: e.target.value})} />
        <label>Precio</label>
        <input name="Precio" value={datosEdicion.Precio} onChange={e=>setDatosEdicion({...datosEdicion, [e.target.name]: e.target.value})} />
        <label>Cantidad</label>
        <input name="Cantidad" value={datosEdicion.Cantidad} onChange={e=>setDatosEdicion({...datosEdicion, [e.target.name]: e.target.value})} />
        <label>Descripción</label>
        <textarea name="Descripcion" value={datosEdicion.Descripcion} onChange={e=>setDatosEdicion({...datosEdicion, [e.target.name]: e.target.value})} />
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button className="btn-save" onClick={handleGuardarEdicion}>Guardar Cambios</button>
          <button className="btn-cancel" onClick={()=>setMostrarModal(false)}>Cancelar</button>
        </div>
      </Modal>

      <Footer />
    </div>
  )
}

export default VerProducto
