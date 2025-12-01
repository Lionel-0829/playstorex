const db = require('../Database/db')

// Obtener información del usuario actual (desde sesión/token si está implementado, o simulado por ahora)
// Este endpoint necesitará ser mejorado más adelante con validación de token JWT
const GetUsuario = async (req, res) => {
    // Por ahora, devolver un usuario actual simulado
    // En producción, extraer el usuario del token JWT en los encabezados de la solicitud
    
    // Verificar si hay un encabezado 'x-user-nombre' con información del usuario
    const authHeader = req.headers['x-user-nombre']
    
    if (authHeader) {
        db.get(`SELECT ID, Nombre, Email, is_admin FROM Usuarios WHERE Nombre=?`, [authHeader], (err, user) => {
            if (err || !user) {
                return res.json({ is_admin: false })
            }
            return res.json({ ...user, is_admin: user.is_admin === 1 })
        })
    } else {
        return res.json({ is_admin: false })
    }
}

module.exports = { GetUsuario }
