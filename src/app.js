const log = require("./utils/chalk");
const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk");
const route = require("./routes/user.routes");
const { isLang } = require("./middlewares/isLang");
const { greeting } = require("./middlewares/greeting");
const { authUser } = require("./middlewares/authUser");
const { middleware } = require("./middlewares/middleware");
const { errorHandler } = require("./middlewares/errHandler");
const { validateMethod } = require("./middlewares/validateMethod");

const app = express();

//------------------------------------
//middlewares registrados a nivel de toda nuestra aplicación
//es decir que toda petción pasara "por estos controles de migración"
//antes que cualquier ruta
app.use(middleware);
app.use(validateMethod);
app.use(errorHandler); //middleware para manejo de errores

//------------------------------------
//otro middleware resgistrado a nivel de aplicación, con la diferencia
//de que este es un modulo de un tercero, es decir que tuvimos que
//instalarlo por aparte "npm i morgan"
app.use(morgan("dev"));

//------------------------------------
//al instalar express este trae consigo una serie de middlewares incorporados
//listos para usar
app.use(express.json()); //lo veremos en la siguiente sesión

//------------------------------------
// middleware a nivel de una instancia de express express
// este se utiliza para validar o proteger todo lo relacionado
// a cierto grupo de rutas creadas con express.Router
app.use("/users", authUser, route);
//------------------------------------
// middleware para manejo de errores
app.get("/error", (_req, _res, next) => {
  const error = new Error("Esto es un error de ejemplo");
  next(error); //le  el error al errorhanlder el error (linea 21)
});

//------------------------------------
//middleware a nivel de enrutador
//los middlewares tambien pueden ser implementados solo en x ruta
//especifica

//como vemos aquí se puede crear la logíca del middleware directamente
//sobre la creación de la ruta, sin embargo esto hace menos legible el código
//es por ello que lo mejor es modularizar, extrayendo la logica y creando cada madulo
//como se ve en la ruta "/mas-saludos"

app.get(
  "/saludo/:lang",
  (req, res, next) => {
    const { lang } = req.params;
    parseInt(lang)
      ? res.status(400).json("se debe pedir por lo menos algun idioma")
      : next();
  },
  (req, res, next) => {
    log(chalk.bgWhiteBright("validando que sea un idioma valido"));
    const greetings = {
      es: "Hola querida clase",
      en: "Hi dear class",
      ger: "Hallo liebe Klasse",
    };
    const { lang } = req.params;
    if (greetings.hasOwnProperty(lang)) {
      req.lang = greetings[lang];
      next();
    } else {
      res.status(400).json("idioma no valido");
    }
  },
  (req, res) => {
    const { lang } = req;
    res.status(200).json(lang);
  }
);

//como vemos, tenemos una ruta que tiene exactamente la misma logica
//pero mas legible y limpio en su código
app.get("/mas-saludos/:lang", isLang, greeting, (req, res) => {
  const saludo = req.lang;
  res.status(200).json(saludo);
});
module.exports = app;
