const express = require('express')
const Router = express.Router()

const { RegistrarProducto, ObtenerProductos, BorrarProducto, EditarProducto } = require('../Controller/Producto.Controller')

Router.post('/AgregarProducto', RegistrarProducto)
Router.get('/ObtenerProductos', ObtenerProductos)
Router.delete('/BorrarProducto/:Codigo', BorrarProducto)
Router.put('/EditarProducto/:Codigo', EditarProducto)

module.exports = Router
