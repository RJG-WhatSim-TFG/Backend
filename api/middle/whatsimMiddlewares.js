/*
Este es el 'índioe' de todos los middleweres que hemos creado, será este el archivo que importaremos en el servidor
*/
const authJwt = require("./authJwt");
const verifySignup = require("./verifySignup");

module.exports = {
  authJwt,
  verifySignup
};