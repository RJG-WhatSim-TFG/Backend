//Exportamos la configuración de conexión a la base de datos que utilizara el modlu sequilize para conectarse a la base de datos
module.exports = {
    HOST: "localhost",
    USER: "whatsim",
    PASSWORD: "?",
    DB: "whatsim",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };