// libreria para encriptar 
const Encriptar= require('bcrypt');

// metodo de seguridad
const salto= 10;

// funcion para encriptar
const EncriptarContraseña=async(Contraseña)=>{
    const Seguridad = await Encriptar.genSalt(salto)
    
}


const comparePassword=async (Contraseña, parametro)=>{
    const Seguridad = await Encriptar.compare(Contraseña,parametro)
}

module.exports={hashPassword, comparePassword}
