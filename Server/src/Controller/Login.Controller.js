const db = require('../DataBase/db')
const { GenerarToken } = require('../Utils/Token')
const { EnviarCorreo } = require('../Utils/EnviarEmails')
const Encriptar = require('bcryptjs')


const RegistroUsuario = async (req, res) => {
    const { Nombre, Email, Contraseña } = req.body
    console.log(req.body)
    if (!Nombre || !Email || !Contraseña) {
        console.error('Revisar Datos Vacios ⛔')
        return res.status(401).json({ Error: 'Datos Vacios' })
    }
    try {
        const hash = Encriptar.hashSync(Contraseña, 10)
        const Token = GenerarToken(Email)
        query = `INSERT INTO Usuarios(Nombre,Email,Contraseña,Verificacion,TokenEmail)VALUES(?,?,?,?,?)`
        db.run(query, [Nombre, Email, hash,0,Token], async (Error) => {
            if (Error) {
                console.error('Revisar query ⛔', Error.message)
                return res.status(400).json({ Error: 'El Usuario ya Existe!' })
            }
            await EnviarCorreo(Nombre, Email, Token)
            res.json({
                message: 'Usuario Registrado Exitosamente , revise su email para terminar el proceso de validacion ⚠'
            })
        })

    }
    catch (Error) {

    }
}

const Login = async (req, res) => {
    const { Usuario, Contraseña, Email } = req.body
    if (!Usuario || !Contraseña ||!Email) {
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