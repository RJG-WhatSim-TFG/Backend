/*
Este middlewere será el encargado de la autentificación con Json Web Tokens
*/
//Necesitamos importar la librería
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

//Comprobamos el token (si lo hay) en el request
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  //Existe el token ?
  if (!token) {
    return res.status(403).send({
      message: "No token",
      error: "invalid_webtoken"
    });
  }

  //Comprobamos si el token es correcto y se lo asignamos al request
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Forbidden",
        error: "invalid_webtoken"
      });
    }
    req.email = decoded.usermail;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;