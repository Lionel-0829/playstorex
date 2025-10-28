const { CompararContraseña, EncriptarContraseña } = require('../Utils/Hash')
const db = require("../Database/db")



const RegistroUsuario = async (req, res) => {
    const { Usuario, Contraseña, Nombre } = req.body;
    if (!Usuario || !Contraseña || !Nombre || !Email) {
        console.error('Campos Vacios')
        return res.status(400).json({ Error: 'Campos vacios' })
    }
    const query = 'SELECT * FROM Usuario WHERE Usuario=?'
        
    db.get(query, [Usuario], (Error, Tabla) => {
        if (Error) {
            console.log('Error en la consulata')
            return res.status(500).json({ Error: 'error en server o query' })
        }
        if (!Tabla) {
            console.log('Usuario Existente')
            return res.status(201).json({ Error: 'usuario existente' })
        }

    })
    const hash = await EncriptarContraseña(Contraseña)
    const query2 = 'INSERT INTO Usuario(Usuario,Contraseña,Nombre)VALUES (?,?,?)'
    db.run(query2, [Usuario, hash, Nombre, Email], (Error) => {
        if (Error) {
            console.log('Error en la consulata')
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
    if (!Usuario || !Contraseña) {
        return res.status(400).json({ Error: 'Campos vacios' })
    }

    const query = `SELECT * FROM Usuario WHERE Usuario=?`
    db.get(query, [Usuario], async (Error, Tabla) => {
        if (Error) {
            console.error('Error en server')
            return res.status(500).json({ Error: 'error en server o query' })
        }

        if (!Tabla) {
            console.log('Usuario Existente')
            return res.status(401).json({ Error: 'usuario existente' })
        }

        try {
            const match = await CompararContraseña(Contraseña, Tabla.Contraseña)
            if (!match) {
                return res.status(401).json({ Error: 'credenciales inválidas' })
            }

            return res.json({
                Mensaje: 'Bienvenido',
                Usuario: Tabla.Usuario
            })
        } catch (Error) {
            console.error('Error comparando contraseña', Error)
            return res.status(500).json({ Error: 'error en server' })
        }
    })
}
module.exports = { RegistroUsuario, Login }