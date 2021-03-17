//npm install validatorjs
const Validator = require('validatorjs')
const mongoDBUtil = require("../util/MongoDBUtil")

let reglasUsrInsercion = {
  nombre : 'required|min:3|max:40',
  login  : 'required|min:5|max:15',
  pw     : 'required|min:5|max:15',
  correoE: 'required|email',
}


// POST /login con body login + pw
exports.buscarPorLoginYPw = function(login, pw){
  return new Promise(function(resolve, reject) {
    criterio = {
      login: login,
      pw : pw
    }
      mongoDBUtil.esquema.collection("usuarios").findOne(criterio)
      .then(usuario => {
        if(!usuario) {
          reject({codigo:404, mensaje: "Autentication: No existe un usuario con esas credenciales!"})
          return
        }
        resolve(usuario)
      })
      .catch(error => {
        reject({codigo:500, mensaje: "Error en la bbdd!"})
      })
  })
}

// GET /comprobarLogin?login=valor
exports.comprobarLogin = function (login) {
  return new Promise(function(resolve, reject){
    mongoDBUtil.esquema.collection("usuarios").findOne({ login : login })
    .then( resultado => {
        if(resultado){
            resolve(true)
        } else {
            resolve(false)
        }
    })
    .catch( error => {
        reject( { codigo:500, mensaje:'¡Error con la base de datos!' })
    })
})
}

// POST /usuarios - res: {json}
exports.altaUsuario = function(usuario) {
  return new Promise(function(resolve,reject) {
    Validator.useLang('es')
    let validador = new Validator(usuario, reglasUsrInsercion)
    if (validador.fails()) {
      console.log(validador.errors.errors)
      reject({ codigo:400, mensaje: 'los datos del cliente son incorrectos'})
      return
    }

    let coleccionUsuarios = mongoDBUtil.esquema.collection('usuarios')
    exports.comprobarLogin(usuario.login)
    .then(existe => {
      if(existe) {
        reject( { codigo:400, mensaje:'Ya existe un usuario con el mismo login' })
        return
      }
      return coleccionUsuarios.insertOne(usuario)
    })
    .then(resultado => {
        resolve(resultado.ops[0])
    })
    .catch(error => {
      console.log(error)
      reject({ codigo:500, mensaje: 'Error con la bbdd!'})
    })
  })
}








