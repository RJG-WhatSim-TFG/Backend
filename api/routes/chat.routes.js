/*
Archivo de rutas de chat
*/
//Importamos nuestro middle de JWT
const { authJwt } = require("../middle/whatsimMiddlewares");
//Importamos el controlador de chat
const controller = require("../controllers/chat.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post("/api/chat",
        [authJwt.verifyToken],
        controller.create
    );

    app.get("/api/chat",
        [authJwt.verifyToken],
        controller.getAll
    );

    app.get("/api/chat/:id",
        [authJwt.verifyToken],
        controller.getById
    );

    app.delete("/api/chat/:id",
        [authJwt.verifyToken],
        controller.delete
    );

    app.put("/api/chat/:id",
        [authJwt.verifyToken],
        controller.update
    );

    app.get("/api/chat/:id/detailed",
        [authJwt.verifyToken],
        controller.getDetailedById
    );
};