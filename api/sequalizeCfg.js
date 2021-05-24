const config = require("./config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./models/user.model.js")(sequelize, Sequelize);
db.chat = require("./models/chat.model.js")(sequelize, Sequelize);
db.message = require("./models/message.model.js")(sequelize, Sequelize);

/*CREAMOS LAS RELACIONES ENTRE USUARIO Y CHAT (OneToMany) */
//Un usuario tiene varios chats
db.user.hasMany(db.chat, {
  foreignKey: "useremail",
  sourceKey: "email",
  as: 'Chats'
});
//Un chat pertenece a un usuario
db.chat.belongsTo(db.user, {
  foreignKey: "useremail",
  targetKey: "email"
});

/*CREAMOS LAS RELACIONES ENTRE CHAT Y MENSAJE (OneToMany) */
//Un chat tiene varios mensajes
db.chat.hasMany(db.message, {
  foreignKey: "chatid",
  sourceKey: "id",
  as: 'Messages'
});
//Un mensaje pertenece a un chat
db.message.belongsTo(db.chat, {
  foreignKey: "chatid",
  targetKey: "id"
});


module.exports = db;