const https = require('https')
const fs = require('fs')
const express = require('express')
const mongoDBUtil = require('./util/MongoDBUtil')
const usuariosRouter = require('./rest/usuariosRest').router
const authRouter = require('./autenticacion/authRouter').router
const interceptorJWT = require('./autenticacion/interceptorJWT').interceptorJWT


mongoDBUtil.conectarBBDD()
.then((arrancarServidor))
.catch( function(error){
    console.log(error)
})

function arrancarServidor(){
    let app = express()
    app.use(express.json());
    // logica de control CRUD
    app.use(usuariosRouter)
    // Autenticación jwt
    app.use(authRouter)
    app.use(interceptorJWT)
    console.log("Arrancando el servidor...")
    //Creamos el server utilizando el módulo 'https' y le proporcionamos
    //la función express y el certificado
    let cert = {
        key  : fs.readFileSync("./certificado/server.key"),
        cert : fs.readFileSync("./certificado/server.cert")
    }
    https.createServer(cert, app).listen(6001, function(){
        console.log("Esperando peticiones en el puerto 6001")
    })
}

// DUDAS
// porque no me aparece la insertar usuario lo de __v ??????
