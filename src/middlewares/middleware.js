const chalk = require("chalk");
const log = require("../utils/chalk");

exports.middleware = (req, res, next) => {
  log(chalk.green("No importa a que ruta o que metodo HTTP sea la petición"));
  log(chalk.green("todas las peticiones pasan por este middleware"));

  //  indicamos que puede continuar con su proceso de solicitud
  next();
};
