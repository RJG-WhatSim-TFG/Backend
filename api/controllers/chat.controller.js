/*
Este es el contralador de los chats. Desde aqui se manejara las peticiones de chats y mensajes de un usuario
*/

//Importamos sequilize y modelos necesarios
const db = require("../sequalizeCfg.js");
const User = db.user;
const Chat = db.chat;
const Message = db.message;

//Crear chat nuevo
exports.create = (req, res) => {
    //Comprobamos el usuario con el token
    User.findOne({where: {
        email: req.email
    }}).then(user => {
        if(!user) return res.status(404).send({ message: "No acount" , error: "account_not_found"});
        else{
            Chat.create({
                useremail: user.email,
                title: req.body.title,
                creationtime: Date.now(),
                profilename: req.body.profilename
            }).then(chat => {
                if(chat)res.status(200).send({message: "Chat created ok" });
                else res.status(500).send({message: "An error ocurred", error: "uknown_error" });
            }).catch(err => {
                res.status(500).send({message: err.message, error: "uknown_error" });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message, error: "uknown_error" });
    });
};

//Eliminar chat
exports.delete = (req, res) => {
    //el id pasado por parametros
    const id = req.params.id;

    User.findOne({where: {
        email: req.email
    }}).then(user => {
        if(!user) return res.status(404).send({ message: "No acount" , error: "account_not_found"});
        else{
            Chat.findOne({where: {
                id: id,
                useremail: req.email
            }}).then(chat =>{
                if(chat){
                    chat.destroy().then(n=>{
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

//Editar chat
exports.update = (req, res) => {
    //el id pasado por parametros
    const id = req.params.id;

    //Comprobamos el usuario con el token
    User.findOne({where: {
        email: req.email
    }}).then(user => {
        if(!user) return res.status(404).send({ message: "No acount" , error: "account_not_found"});
        else{
            Chat.update(req.body, {where:{
                id: id
            }}).then(num => {
                if(num==1){
                    res.status(200).send({status: 200});
                }else res.status(404).send({message: err.message, error: "chat_not_found" });
            }).catch(err => {
                res.status(500).send({message: err.message, error: "uknown_error" });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message, error: "uknown_error" });
    });
};

//Obetner (sin mensajes, solo info del chat) lista de TODOS los chats del usuario
exports.getAll = (req, res) => {
    //Comprobamos el usuario con el token
    User.findOne({where: {
        email: req.email
    }}).then(user => {
        if(!user) return res.status(404).send({ message: "No acount" , error: "account_not_found"});
        else{
            Chat.findAll({where: {
                useremail: req.email
            }}).then(chats =>{
                if(chats)res.status(200).send({chats: chats });
                else res.status(200).send({chats: null });
            }).catch(err =>{
                res.status(500).send({message: err.message, error: "uknown_error" });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message, error: "uknown_error" });
    });
};

//Obetner (sin mensajes) información de un chat por id
exports.getById = (req, res) => {
    //el id pasado por parametros
    const id = req.params.id;

    //Comprobamos el usuario con el token
    /*NOTA: Se podria hacer sin comprobar el token, pero por seguridad lo hago ya que así se obliga a que se tenga que estar logueado para obtener información de los chats y, además, solo puedas
    obetner información de tus chats y no de otros usuarios */
    User.findOne({where: {
        email: req.email
    }}).then(user => {
        if(!user) return res.status(404).send({ message: "No acount" , error: "account_not_found"});
        else{
            Chat.findOne({where: {
                id: id,
                useremail: req.email
            }}).then(chat =>{
                if(chat) res.status(200).send({chat: chat});
                else res.status(404).send({message: err.message, error: "chat_not_found" });
            }).catch(err =>{
                res.status(500).send({message: err.message, error: "uknown_error" });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message, error: "uknown_error" });
    });
};

//Obetner (con mensajes) información completa de un chat por id
exports.getDetailedById = (req, res) => {
    //el id pasado por parametros
    const id = req.params.id;

    //Comprobamos el usuario con el token
    /*NOTA: Se podria hacer sin comprobar el token, pero por seguridad lo hago ya que así se obliga a que se tenga que estar logueado para obtener información de los chats y, además, solo puedas
    obetner información de tus chats y no de otros usuarios */
    User.findOne({where: {
        email: req.email
    }}).then(user => {
        if(!user) return res.status(404).send({ message: "No acount" , error: "account_not_found"});
        else{
            Chat.findOne({where: {
                id: id,
                useremail: req.email
            }}).then(chat =>{
                if(chat){
                    //A continuación, buscaremos por los mensajes del chat
                    Message.findAll({where: {
                        chatid: chat.id
                    }, order: [
                        ['time', 'ASC']
                    ]
                    }).then(messages => {
                        let chatjson = chat.toJSON();
                        if(messages){
                            chatjson.messages = messages;
                        }else chatjson.messages = null;
                        res.status(200).send({chat: chatjson});
                    }).catch(err => {
                        res.status(500).send({message: err.message, error: "uknown_error" });
                    });

                }else res.status(404).send({message: err.message, error: "chat_not_found" });
            }).catch(err =>{
                res.status(500).send({message: err.message, error: "uknown_error" });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message, error: "uknown_error" });
    });
};