
const ArraysProductos = [
  { codigo: "P001", nombre: "Mouse Gamer Redragon", precio: 85000 },
  { codigo: "P002", nombre: "Teclado Mecánico HyperX", precio: 120000 },
  { codigo: "P003", nombre: "Monitor Samsung 24''", precio: 250000 },
  { codigo: "P004", nombre: "Auriculares Logitech G733", precio: 210000 },
  { codigo: "P005", nombre: "codgio nombre precio cantidad descripcion y categoria ", precio: 350000 },
];

function VerProducto() {
  return (
    <div className="contenedor">
      <h1>Listado de Productos</h1>
      <div className="productos">
        {ArraysProductos.map((producto) => (
          <div key={producto.codigo} className="card">
            <p><strong>Código:</strong> {producto.codigo}</p>
            <p><strong>Nombre:</strong> {producto.nombre}</p>
            <p><strong>Precio:</strong> ${producto.precio.toLocaleString("es-AR")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerProducto;
