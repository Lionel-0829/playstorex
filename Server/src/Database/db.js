// utilizamos la dependencia sqlite3
const SQLite = require('sqlite3')

// utilizamos la dependencia path para indicar ubicacion
const path = require('path')
const Module = require('module')

// indicamos la ubicacion de la base de datos
const dbubicacion = path.resolve(__dirname, './Sistema.db')

const db = new SQLite.Database(dbubicacion, (Error) => {
    if (Error) {
        console.log(' Error en :', Error)
    } else {
        console.log('Base de datos creada o conectada')
        db.run
            (`
            CREATE TABLE IF NOT EXISTS Usuario(ID INTEGER PRIMARY KEY AUTOINCREMENT,Usuario TEXT UNIQUE, Contraseña TEXT, Nombre TEXT, Email TEXT)
            `), (Error) => {
                if (Error) {
                    console.log('no se pudo crear la tabla')
                } else {
                    console.log('tabla creada')
                }
            }
        db.run
            (`
            CREATE TABLE IF NOT EXISTS Productos
            (Codigo INTEGER PRIMARY KEY AUTOINCREMENT,
            Nombre TEXT, Precio INTEGER, Cantidad INTEGER, 
            Descripcion TEXT, 
            Categoria TEXT
            )`, (Error) => {
                if (Error) {
                    console.log('no se pudo crear la tabla')
                } else {
                    console.log('tabla creada')
                }
            })

    }
})

module.exports = db;