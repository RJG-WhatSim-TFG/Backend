/*
Este es el contralador de la autentificación. Desde aqui se manejara el sistema de logueo y registro
*/

//Importamos sequilize y modelos necesarios
const db = require("../sequalizeCfg.js");
const config = require("../config/auth.config");
const User = db.user;
//Importamos la libreria JWT y bcrypt, para las contraseñas
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//Registro
exports.signup = (req, res) => {
    //Crear usuario nuevo
  User.create({
      displayname: req.body.displayname,
      email: req.body.email,
      pass: bcrypt.hashSync(req.body.pass, 12),
      joindate: Date.now()
  }).then(user => {
      if(user)res.send({message: "User registered suscesfully" });
      else res.status(500).send({message: "An error ocurred", error: "uknown_error" });
  }).catch(err => {
      res.status(500).send({message: err.message, error: "uknown_error" });
  });
};

//Logueo
exports.signin = (req, res) => {
    User.findOne({where: {
      email: req.body.email
    }}).then(user => {
        if (!user) {
            //No existe usuario con ese email
            return res.status(404).send({ message: "User Not found." , error: "account_not_found"});
        }
        //Comprobamos si el hash de la pass introducida, coincide con el hash que esta en la base de datos
        var passwordIsValid = bcrypt.compareSync(req.body.pass,user.pass);
        //Si los hashes no coinciden, se habrá introducido mal la contraseña
        if (!passwordIsValid) {
            return res.status(401).send({accessToken: null, message: "Invalid password", error: "account_wrong_credentials"});
        }
        //Creamos un JWT que expire en 12h
        var token = jwt.sign({ usermail: user.email }, config.secret, {expiresIn: 43200});
        res.status(200).send({
            displayname: user.displayname,
            email: user.email,
            joindate: user.joindate,
            accessToken: token
        });
    }).catch(err => {
        res.status(500).send({ message: err.message, error: "uknown_error" });
    });
};