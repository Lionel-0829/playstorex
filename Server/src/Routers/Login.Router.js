const controller = require('../Controller/Login.Controller');

const express = require('express');
const ruta= express.Router()

ruta.post('/Registrar', controller.registrarUsuario)

module.exports = ruta;