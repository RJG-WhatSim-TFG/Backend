/*
Archivo de rutas de perfil
*/
//Importamos nuestro middle de JWT
const { authJwt } = require("../middle/whatsimMiddlewares");
//Importamos el controlador de chat
const controller = require("../controllers/profile.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/profile/userinfo",
        [authJwt.verifyToken],
        controller.userinfo
    );

    app.delete("/api/profile/delete",
        [authJwt.verifyToken],
        controller.delete
    );
};