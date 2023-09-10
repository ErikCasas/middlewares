const { default: chalk } = require("chalk");
const log = require("../utils/chalk");

exports.validateMethod = (req, res, next) => {
  const method = req.method; //los middleware tienen acceso al objeto de la solcitud "req"
  const methods = ["GET", "POST", "PUT", "DELETE"]; //lista de metodos validos
  if (methods.includes(method)) {
    log(chalk.bgGreenBright("metodo valido"));
    next(); //le decimos que puede continuar con su camino
  } else {
    log(chalk.bgRedBright("metodo no valido"));
    res.status(500).json("el metodo no es valido");
  }
};
