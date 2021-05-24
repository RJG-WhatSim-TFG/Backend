//Importación de todos los módulos necesarios
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

/*var corsOptions = {
  origin: "http://localhost:80"
};*/

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Conectamos sequilize
const db = require("./api/sequalizeCfg.js");
db.sequelize.sync({force: false, alter: false}).then(() => {
  console.log('Connected to Database');
});

app.get("/", (req, res) => {
  res.json({ message: "Whatsim API Rest" });
});

//Importamos las rutas que hemos creado
require('./api/routes/auth.routes')(app);
require('./api/routes/profile.routes')(app);
require('./api/routes/chat.routes')(app);
require('./api/routes/message.routes')(app);

//Definimos numero de puerto para poder manipularlo más facilmente
const PORT = 8080;
app.listen(PORT, () => {
  console.log("Whatsim Rest API Server running on port "+PORT);
});