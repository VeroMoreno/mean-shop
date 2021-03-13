const express = require("express")
const negocioUsuarios = require("../negocio/negocioUsuarios")

let router = express.Router()

// esto no es rest
router.get("/comprobarLogin", comprobarLogin)

router.post("/usuarios", altaUsuario)
router.delete("/usuarios/:id", bajaUsuario)
router.put("/usuarios/:id", modificarUsuario)

exports.router = router

function comprobarLogin(request, response){
    let login = request.query.login
    negocioUsuarios.comprobarLogin(login)
    .then(existe => {
        response.json({ existe : existe })
    })
    .catch(error => {
        response.statusCode = error.codigo
        response.json(error)
    })
}

function altaUsuario(request, response){
    let usuario = request.body
    negocioUsuarios.altaUsuario(usuario)
    .then(usrInsertado => {
        response.json(usrInsertado)
    })
    .catch(error => {
        response.statusCode = error.codigo
        response.json(error)
    })
    response.end("INSERTADO")
}

function bajaUsuario(request, response){
}

function modificarUsuario(request, response){
}