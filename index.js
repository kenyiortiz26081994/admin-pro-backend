require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config')

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use( cors( ));

//Lectura y Parseo del Boody
app.use( express.json() );

//Base de datos
dbConnection();

//Rutas
app.use( '/api/Usuarios' , require('./routes/usuarios') );
app.use( '/api/Login' , require('./routes/auth') );


app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});

