const express = require('express');
const cors= require('cors');

const app= express()

require('dotenv').config()
const PORT=process.env.PORT|| 5000

// Aumentar límite de tamaño para envío de imágenes
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())

const Router= require('./src/Routers/Login.Router')
const ProductoRouter = require('./src/Routers/Producto.Router')

app.use('/api',Router)
app.use('/api', ProductoRouter)

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})