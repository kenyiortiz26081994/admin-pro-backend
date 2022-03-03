const { response } = require ('express');
const bcrypt = require('bcryptjs');

const Usuario  = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const login = async ( req, res = response ) => {

    const  { email, password } = req.body;

    try {
        //Verificar Email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            })
        }

        //Verificar Contraseña
        const ValidPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !ValidPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        //Generar el Token -JWT
        const token = await generarJWT ( usuarioDB.id )
    

        res.json({
            ok: true,
            token
        })
    } catch ( error ){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


module.exports = {
    login
}