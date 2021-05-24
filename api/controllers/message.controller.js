/*
Este es el contralador de los mensajes. Desde aqui se manejara las peticiones para los mensajes
*/

//Importamos sequilize y modelos necesarios
const db = require("../sequalizeCfg.js");
const User = db.user;
const Chat = db.chat;
const Message = db.message;

//Crear mensaje nuevo
exports.create = (req, res) => {
    //Comprobamos el usuario con el token
    User.findOne({where: {
        email: req.email
    }}).then(user => {
        if(!user) return res.status(404).send({ message: "No acount" , error: "account_not_found"});
        else{
            //Comprobamos que el chat existe
            Chat.findOne({where: {
                id: req.body.chatid,
                useremail: req.email
            }}).then(chat =>{
                if(chat){
                    Message.create({
                        chatid: req.body.chatid,
                        type: req.body.type,
                        time: req.body.time,
                        status: req.body.status,
                        content: req.body.content
                    }).then(message =>{
                        if(message)res.status(200).send({message: "Message created ok" });
                        else res.status(500).send({message: "An error ocurred", error: "uknown_error" });
                    }).catch(err => {
                        res.status(500).send({message: err.message, error: "uknown_error" });
                    });
                }
                else res.status(404).send({message: err.message, error: "chat_not_found" });
            }).catch(err =>{
                res.status(500).send({message: err.message, error: "uknown_error" });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message, error: "uknown_error" });
    });
};

//Eliminar ensaje
exports.delete = (req, res) => {
    User.findOne({where: {
        email: req.email
    }}).then(user => {
        if(!user) return res.status(404).send({ message: "No acount" , error: "account_not_found"});
        else{
            Message.findOne({where: {
                chatid: req.body.chatid,
                type: req.body.type,
                time: req.body.time,
            }}).then(message =>{
                if(message){
                    message.destroy().then(n=>{
                        res.status(200).send({status: 200});
                    }).catch(err =>{
                        res.status(500).send({ message: err.message, error: "uknown_error" });
                    });
                }
                else res.status(404).send({message: err.message, error: "chat_not_found" });
            }).catch(err =>{
                res.status(500).send({message: err.message, error: "uknown_error" });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message, error: "uknown_error" });
    });
}