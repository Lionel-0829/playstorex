// libreria para encriptar 
const Encriptar= require('bcrypt');

// metodo de seguridad
const salto= 10;

// funcion para encriptar
const EncriptarContraseña=async(Contraseña)=>{
    const Seguridad = await Encriptar.genSalt(salto)
    return Encriptar.hash(Contraseña, Seguridad)
}


const CompararContraseña=async (Contraseña, parametro)=>{
    if (!Contraseña || !parametro) return false;
    return   Encriptar.compare(Contraseña,parametro)
}

module.exports = { EncriptarContraseña, CompararContraseña }
