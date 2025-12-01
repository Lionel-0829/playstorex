const db = require('../Database/db')

const RegistrarProducto = async (req, res) => {
    const { Nombre, Precio, Cantidad, Descripcion, Categoria, Imagen } = req.body
    if (!Nombre || Precio == null || Cantidad == null) {
        return res.status(400).json({ Error: 'Campos obligatorios faltantes' })
    }

    try {
        const query = `INSERT INTO Productos(Nombre,Precio,Cantidad,Descripcion,Categoria,Imagen) VALUES(?,?,?,?,?,?)`
        db.run(query, [Nombre, Precio, Cantidad, Descripcion || '', Categoria || '', Imagen || ''], (Error) => {
            if (Error) {
                console.error('Error al insertar producto:', Error.message)
                return res.status(500).json({ Error: 'No se pudo registrar el producto' })
            }
            return res.json({ message: 'Producto registrado correctamente' })
        })
    }
    catch (Error) {
        console.error('Error en servidor:', Error)
        return res.status(500).json({ Error: 'Error en servidor' })
    }
}

const ObtenerProductos = async (req, res) => {
    try {
        db.all(`SELECT * FROM Productos`, (Error, productos) => {
            if (Error) {
                console.error('Error al obtener productos:', Error.message)
                return res.status(500).json({ Error: 'Error al obtener productos' })
            }
            return res.json(productos || [])
        })
    } catch (Error) {
        console.error('Error en servidor:', Error)
        return res.status(500).json({ Error: 'Error en servidor' })
    }
}

const BorrarProducto = async (req, res) => {
    const { Codigo } = req.params
    try {
        const query = `DELETE FROM Productos WHERE Codigo=?`
        db.run(query, [Codigo], (Error) => {
            if (Error) {
                console.error('Error al borrar producto:', Error.message)
                return res.status(500).json({ Error: 'Error al borrar producto' })
            }
            return res.json({ message: 'Producto borrado correctamente' })
        })
    } catch (Error) {
        console.error('Error en servidor:', Error)
        return res.status(500).json({ Error: 'Error en servidor' })
    }
}

const EditarProducto = async (req, res) => {
    const { Codigo } = req.params
    const { Nombre, Precio, Cantidad, Descripcion, Categoria, Imagen } = req.body
    
    try {
        const query = `UPDATE Productos SET Nombre=?, Precio=?, Cantidad=?, Descripcion=?, Categoria=?, Imagen=? WHERE Codigo=?`
        db.run(query, [Nombre, Precio, Cantidad, Descripcion || '', Categoria || '', Imagen || '', Codigo], (Error) => {
            if (Error) {
                console.error('Error al editar producto:', Error.message)
                return res.status(500).json({ Error: 'Error al editar producto' })
            }
            return res.json({ message: 'Producto editado correctamente' })
        })
    } catch (Error) {
        console.error('Error en servidor:', Error)
        return res.status(500).json({ Error: 'Error en servidor' })
    }
}

module.exports = { RegistrarProducto, ObtenerProductos, BorrarProducto, EditarProducto }
