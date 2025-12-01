
import { useState, useEffect, useContext } from 'react'
import api from '../BackEnd/api'
import { AuthContext } from '../../Context/AuthContext'
import './AgregarProducto.css'

function AgregarProducto() {
  const [Nombre, setNombre] = useState('')
  const [Precio, setPrecio] = useState('')
  const [Cantidad, setCantidad] = useState('')
  const [Descripcion, setDescripcion] = useState('')
  const [Categoria, setCategoria] = useState('')
  const [Imagen, setImagen] = useState('')
  const [Mensaje, setMensaje] = useState('')
  const { isAdmin } = useContext(AuthContext)

  useEffect(() => {
    // Verificar si es administrador
    if (!isAdmin) {
      setMensaje('Solo administradores pueden agregar productos')
    }
  }, [])

  const handleImagenChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        // Comprimir imagen antes de guardarla
        const img = new Image()
        img.src = event.target.result
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          // Reducir tamaño de imagen
          const maxWidth = 800
          const maxHeight = 600
          let width = img.width
          let height = img.height
          
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height
              height = maxHeight
            }
          }
          
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0, width, height)
          
          // Convertir a base64 con compresión
          const compressedImage = canvas.toDataURL('image/jpeg', 0.7) // 70% de calidad
          setImagen(compressedImage)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')

    if (!Nombre || Precio === '' || Cantidad === '') {
      setMensaje('Por favor complete los campos obligatorios')
      return
    }

    try {
      await api.post('/AgregarProducto', {
        Nombre,
        Precio: Number(Precio),
        Cantidad: Number(Cantidad),
        Descripcion,
        Categoria,
        Imagen
      })
      setMensaje('Producto registrado correctamente')
      // Limpiar formulario
      setNombre('')
      setPrecio('')
      setCantidad('')
      setDescripcion('')
      setCategoria('')
      setImagen('')
    } catch (Error) {
      console.error(Error)
      setMensaje('Error al registrar el producto')
    }
  }

  if (!isAdmin) {
    return (
      <div className="acceso-denegado">
        <h2>Acceso Denegado</h2>
        <p>{Mensaje}</p>
      </div>
    )
  }

  return (
    <div className="form-container">
      <h1>Agregar Producto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Nombre">Nombre del Producto</label>
          <input type="text" id="Nombre" value={Nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Ej: Camiseta Premium" />
        </div>

        <div className="form-group">
          <label htmlFor="Precio">Precio</label>
          <input type="number" id="Precio" value={Precio} onChange={(e) => setPrecio(e.target.value)} required placeholder="Ej: 99.99" />
        </div>

        <div className="form-group">
          <label htmlFor="Cantidad">Cantidad en Stock</label>
          <input type="number" id="Cantidad" value={Cantidad} onChange={(e) => setCantidad(e.target.value)} required placeholder="Ej: 50" />
        </div>

        <div className="form-group">
          <label htmlFor="Descripcion">Descripción</label>
          <textarea id="Descripcion" value={Descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Describe el producto..." />
        </div>

        <div className="form-group">
          <label htmlFor="Categoria">Categoría</label>
          <input type="text" id="Categoria" value={Categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Ej: Ropa, Accesorios" />
        </div>

        <div className="form-group">
          <label htmlFor="Imagen">Imagen del Producto</label>
          <div className="file-input-wrapper">
            <input type="file" id="Imagen" accept="image/*" onChange={handleImagenChange} />
            <label htmlFor="Imagen" className="file-input-label">
              📷 Haz clic para seleccionar una imagen
            </label>
          </div>
          {Imagen && <div className="image-preview">✓ Imagen seleccionada</div>}
        </div>

        <div className="form-submit">
          <button type="submit" className="btn-submit">Registrar Producto</button>
        </div>

        {Mensaje && <p className={`mensaje ${Mensaje.includes('error') || Mensaje.includes('Error') ? 'error' : 'success'}`}>{Mensaje}</p>}
      </form>
    </div>
  )
}

export default AgregarProducto