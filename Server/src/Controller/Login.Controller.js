const { hashPassword } = require("../Utils/Hash")
const { CompararContraseña, EncriptarContraseña } = require('../Utils/Hash')
const db = require("../Database/db")



const RegistroUsuario = async (req, res) => {
    const { Usuario, Contraseña, Nombre } = req.body;
    if (!Usuario || !Contraseña || !Nombre) {
        console.error('Campos Vacios')
        return res.status(404).json({ Error: 'Campos vacios' })
    }
    query = 'SELECT * FROM Usuario WHERE Usuario=?'

    db.get(query, [Usuario], (Error, Tabla) => {
        if (Error) {
            console.log('Error en la consulat')
            return res.status(500).json({ Error: 'error en server o query' })
        }
        if (Tabla) {
            console.log('Usuario Existente')
            return res.status(201).json({ Error: 'usuario existente' })
        }

    })
    const hash = await EncriptarContraseña(Contraseña)
    const query2 = 'INSERT INTO Usuario(Usuario,Contraseña,Nombre)VALUES (?,?,?)'
    db.run(query2, [Usuario, hash, Nombre], (Error) => {
        if (Error) {
            console.log('Error en la consulat')
            return res.status(500).json({ Error: 'error en server o query' })
        }
        else {
            return res.status(201).json({
                Mensaje: 'Usuario Registrado',
                Id: this.lastID,
                Usuario
            })
        }
    })
}
const Login = async (req, res) => {
    const { Usuario, Contraseña } = req.body
    const hash = hashPassword(Contraseña);

    const query = `SELECT * FROM Usuarios WHERE Usuarios=?`
    db.get(query, [Usuario], async (Error, Tabla) => {
        if (error) {
            console.error('Error en server')
            return res.status(500).json({ Error: 'error en server o query' })
        }

        if (Tabla) {
            console.log('Usuario Existente')
            return res.status(401).json({ Error: 'usuario existente' })
        }
        if (Usuario) {
            console.error('Campos Vacios')
            return res.status(404).json({ Error: 'Campos vacios' })
        }
        const hashed = await CompararContraseña(Contraseña, Tabla, Contraseña)

        res.json({
            mensaje: 'Bienvenido',
            Usuario
        })

    })
}
module.exports = { RegistroUsuario, Login }