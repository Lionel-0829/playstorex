const { hashPassword } = require("../Utils/Hash")
const {CompararContraseña,EncriptarContraseña}= require
const db = require("../Database/db")

const Login = async (req, res) => {
        const { Usuario, Contraseña} = req.body
        const hash = hashPassword(Contraseña);

        const query = `SELECT * FROM Usuarios WHERE Usuarios=?`
        db.get(query,[Usuario],(Error,Tabla)=>{
            if(error){
                console.error('Error en server')
                return res.status(500).json({Error:'error en server o query'})
            }
            if(Tabla){
                console.log('Usuario Existente')
                return res.status(401).json({Error:'usuario existente'})
            }
            if(Usuario){
                console.error('Campos Vacios')
                return res.status(404).json({Error:'Campos vacios'})
            }
            const hashed= CompararContraseña(Contraseña,Tabla,Contraseña)
        })
}