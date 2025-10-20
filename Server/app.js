const express = require('express');

const app = express();

const cors= require('cors');

app.use(cors())
app.use(express.json())

const ruta= require('./src/Routers/Login.Router')
// ruta padre
app.use('/api', ruta)

require('dotenv').config()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})