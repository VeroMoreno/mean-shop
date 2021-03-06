//npm install validatorjs
const Validator = require('validatorjs')
const mongoDBUtil = require("../util/MongoDBUtil")
const ObjectID = require("mongodb").ObjectID

let reglasUsrInsercion = {
  nombre : 'required|min:3|max:40',
  login  : 'required|min:5|max:15',
  pw     : 'required|min:5|max:15',
  correoE: 'required|email',
}

let reglasUsrModificacion = {
  nombre    : 'required|min:3|max:40',
  pw        : 'required|min:5|max:15',
  direccion : 'required|min:5|max:200',
  telefono  : 'required|min:5|max:20',
  correoE   : 'required|email',
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
    if(!validadorUtil.validarObjeto(usuario, reglasUsrInsercion)){
      return
  }
    //Le asignamos el rol al usuario
    usuario.rol = 'CLIENTE'

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

function validarObjeto(objeto, reglas, funcion){
  Validator.useLang('es')
  let validador = new Validator(objeto, reglas)
  if(validador.fails()){
      console.log(validador.errors.errors)
      funcion( { codigo:400,
          mensaje:'Los datos del objeto son incorrectos',
          errores: validador.errors.errors } ) //Mal
      return false
  }
  return true
}

//Autorización:
//-los ADMIN pueden modificar a cualquier usuario
//-los CLIENTE solo puededn modificarse a si mismos
exports.modificarUsuario = function(usuario, autoridad) {
  return new Promise(function(resolve, reject) {

    if (autoridad.rol == 'ADMIN') {
      if (autoridad._id != usuario._id) {
        reject({ codigo:403, mensaje: "Los clientes solo pueden modificarse a si mismos"})
        return
      }
    }

    if (!validarObjeto(usuario, reglasUsrModificacion, reject)){
      return
    }

    mongoDBUtil.esquema.collection('usuarios')
    .findOneAndUpdate(
      { _id : new ObjectID(usuario._id) },
      {
          $set : {
              nombre    : usuario.nombre,
              pw        : usuario.pw,
              direccion : usuario.direccion,
              correoE   : usuario.correoE,
              telefono  : usuario.telefono,
              idioma    : usuario.idioma,
          }
      },
      {
          returnOriginal : false,
      })
    .then(result => {
      if(!result.value){
        reject({ codigo:404, mensaje:"No existe un usuario con el id " + usuario._id})
        return
      }
      resolve(result.value)
      })
    .catch( () => {
      reject({ codigo:500, mensaje: 'Error con la bbdd!'})
    })
  })
}








