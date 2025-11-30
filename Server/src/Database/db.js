// utilizamos la dependencia sqlite3
const SQLite = require('sqlite3')

// utilizamos la dependencia path para indicar ubicacion
const path = require('path')
const Module = require('module')

// indicamos la ubicacion de la base de datos
const dbubicacion = path.resolve(__dirname, './Sistema.db')

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
            Verificacion INTEGER NOT NULL DEFAULT 0,
            TokenEmail TEXT
        )`, (Error)=>{
            if(Error){
                console.error('Error al crear la tabla Usuarios: ⛔', Error.message);
            }
            else{
                console.log('Tabla Usuarios creada o ya existente ✅');
            }
        });
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
