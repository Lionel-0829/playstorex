const db = require('../Database/db')
const Encriptar = require('bcryptjs')


const RegistroUsuario = async (req, res) => {
    const { Nombre, Email, Contraseña } = req.body
    if (!Nombre || !Email || !Contraseña) {
        return res.status(401).json({ Error: 'Datos Vacios - revisa que hayas llenado todos los campos' })
    }
    try {
        const hash = Encriptar.hashSync(Contraseña, 10)
        query = `INSERT INTO Usuarios(Nombre,Email,Contraseña,is_admin)VALUES(?,?,?,?)`
        db.run(query, [Nombre, Email, hash, 0], async function (Error) {
            if (Error) {
                console.error('Revisar query ⛔', Error.message)
                return res.status(400).json({ Error: 'El Usuario ya Existe!' })
            }
            // Registro de ID insertado
            try {
                console.log('Usuario insertado, id:', this.lastID)
            }
            catch (e) {
                console.log('Usuario insertado (no se obtuvo id)')
            }

            return res.json({
                message: 'Usuario Registrado Exitosamente'
            })
        })

    } catch (Error) {
        console.error('Error en RegistroUsuario:', Error)
        return res.status(500).json({ Error: 'Error en servidor' })
    }
}

const Login = async (req, res) => {
    const { Nombre, Contraseña } = req.body
    if (!Nombre || !Contraseña) {
        return res.status(400).json({ Error: 'Campos vacios' })
    }

    const query = `SELECT * FROM Usuarios WHERE Nombre=?`
    db.get(query, [Nombre], async (Error, Tabla) => {
        if (Error) {
            console.error('Error en servidor', Error)
            return res.status(500).json({ Error: 'error en servidor o query' })
        }

        if (!Tabla) {
            console.log('Usuario no encontrado')
            return res.status(401).json({ Error: 'Usuario no encontrado' })
        }

        try {
            const match = Encriptar.compareSync(Contraseña, Tabla.Contraseña)
            if (!match) {
                return res.status(401).json({ Error: 'Credenciales inválidas' })
            }

            return res.json({
                Mensaje: 'Bienvenido',
                Nombre: Tabla.Nombre
            })
        } catch (Error) {
            console.error('Error comparando contraseña', Error)
            return res.status(500).json({ Error: 'error en servidor' })
        }
    })
}
module.exports = { RegistroUsuario, Login }