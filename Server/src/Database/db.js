// Utilizamos la dependencia sqlite3
const SQLite = require('sqlite3')

// Utilizamos la dependencia path para indicar ubicación
const path = require('path')
const Module = require('module')

// Indicamos la ubicación de la base de datos
const dbUbicacion = path.resolve(__dirname, './Sistema.db')

const db= new SQLite.Database(dbUbicacion, (Error)=>{
    if(Error){
        console.error('Error al conectar con la base de datos: ⛔', Error.message);
    }
    else{
        console.log('Conexión exitosa a la base de datos SQLite ✅');
        db.run(`CREATE TABLE IF NOT EXISTS Usuarios(
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Nombre TEXT NOT NULL,
            Email TEXT NOT NULL UNIQUE,
            Contraseña TEXT NOT NULL,
            is_admin INTEGER NOT NULL DEFAULT 0
        )`, (Error)=>{
            if(Error){
                console.error('Error al crear la tabla Usuarios: ⛔', Error.message);
            }
            else{
                console.log('Tabla Usuarios creada o ya existente ✅');
                // Insertar usuario admin si no existe
                const Encriptar = require('bcryptjs')
                const adminHash = Encriptar.hashSync('12345', 10)
                db.run(`INSERT OR IGNORE INTO Usuarios(Nombre, Email, Contraseña, is_admin) 
                        VALUES('admin', 'admin@playstorex.com', ?, 1)`, [adminHash], (err) => {
                    if (!err) console.log('Usuario admin verificado ✅')
                })
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS Productos(
            Codigo INTEGER PRIMARY KEY AUTOINCREMENT,
            Nombre TEXT NOT NULL, 
            Precio INTEGER NOT NULL, 
            Cantidad INTEGER NOT NULL, 
            Descripcion TEXT, 
            Categoria TEXT,
            Imagen TEXT
        )`, (Error) => {
            if (Error) {
                console.error('Error al crear tabla Productos:', Error.message)
            } else {
                console.log('Tabla Productos creada o ya existente ✅')
            }
        })
    }
})

module.exports = db;
