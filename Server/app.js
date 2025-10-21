const express = require('express');
const cors= require('cors');

const app= express()

require('dotenv').config()
const PORT=process.env.PORT|| 5000

app.use(express.json())
app.use(cors())

const Router= require('./src/Routers/Login.Router')

app.use('/api',Router)

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})