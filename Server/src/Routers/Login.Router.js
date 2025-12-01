const express= require('express')
const Router= express.Router()

const {Login,RegistroUsuario}= require('../Controller/Login.Controller')

Router.post('/Login',Login)
Router.post('/Registrar',RegistroUsuario)

module.exports=Router;