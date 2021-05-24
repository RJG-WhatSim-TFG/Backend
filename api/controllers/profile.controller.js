/*
Este es el contralador de los perfiles, las cuentas. Desde aqui se manejara las peticiones información del perfil y cambio de datos.
*/

//Importamos sequilize y modelos necesarios
const db = require("../sequalizeCfg.js");
const User = db.user;

exports.userinfo = (req, res) => {
    User.findOne({where: {
        email: req.email
    }}).then(user => {
        if(!user) return res.status(404).send({ message: "No acount" , error: "account_not_found"});
        else{
            var usrJson = user.toJSON();
            delete usrJson["pass"];
            res.status(200).send({user: usrJson});
        }
    }).catch(err => {
        res.status(500).send({ message: err.message, error: "uknown_error" });
    });
}

exports.delete = (req, res) => {
    User.findOne({where: {
        email: req.email
    }}).then(user => {
        if(!user) return res.status(404).send({ message: "No acount" , error: "account_not_found"});
        else{
            user.destroy().then(n=>{
                res.status(200).send({status: 200});
            }).catch(err =>{
                res.status(500).send({ message: err.message, error: "uknown_error" });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message, error: "uknown_error" });
    });
}