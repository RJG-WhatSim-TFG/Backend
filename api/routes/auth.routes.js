/*
Este es un archivo de routas, el archivo que definira las routas del login en este caso
*/
//Importamos del archivo del índice de los middlewares el middle de verificación de registro
const { verifySignup } = require("../middle/whatsimMiddlewares");
//Importamos el controlador de autentificación
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
        next();
    });

    //Definimos la ruta de registro
    app.post("/api/auth/signup",verifySignup.checkAlreadyInUse,controller.signup);
    //Definimos la ruta de logueo
    app.post("/api/auth/signin", controller.signin);
};