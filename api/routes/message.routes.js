/*
Archivo de rutas de mensajes
*/
//Importamos nuestro middle de JWT
const { authJwt } = require("../middle/whatsimMiddlewares");
//Importamos el controlador de mensajes
const controller = require("../controllers/message.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post("/api/message",
        [authJwt.verifyToken],
        controller.create
    );

    app.post("/api/message/delete",
        [authJwt.verifyToken],
        controller.delete
    );
};