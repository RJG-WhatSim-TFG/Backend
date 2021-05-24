/*
Este middlewere se utilizara para comprobar cosas referentes al registro de nuevos usuarios
, tales como si la dirección de email o el nombre de usuario estan repetidos
*/
const db = require("../sequalizeCfg.js");
const User = db.user;

//Comprobar duplicados
checkDuplicate = (req, res, next) => {
    //Comprobar si el email existe
    User.findOne({
        where:{
            email: req.body.email
        }
    }).then(user =>{
        if(user){
            //Si se ha encontrado un usuario con ese email (ya existe)
            res.status(400).send({message: "Email already registered", error: "account_already_exsists"});
            return;
        }
        //El email no existe, se continua con la validación del nombre de usuario
        //Comprobar si el nombre de usuario existe
        User.findOne({
            where:{
                displayname: req.body.displayname
            }
        }).then(user =>{
            if(user){
                //Si se ha encontrado un usuario con ese displayname (ya existe)
                res.status(400).send({message: "Displayname already in use", error: "displayname_already_exsists"});
                return;
            }
            next();
        });
    });
};

const verifySignup = {
  checkAlreadyInUse: checkDuplicate
};

module.exports = verifySignup;