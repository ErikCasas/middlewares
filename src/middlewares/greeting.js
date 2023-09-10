const { default: chalk } = require("chalk");
const log = require("../utils/chalk");

exports.greeting = (req, res, next) => {
  log(chalk.bgWhiteBright("validando que sea un idioma valido"));
  const greetings = {
    fra: "Bonjour chère classe",
    nor: "Hei kjære klasse",
    cat: "Hola volguda classe",
  };
  const { lang } = req.params;
  if (greetings.hasOwnProperty(lang)) {
    req.lang = greetings[lang];
    next();
  } else {
    res.status(400).json("idioma no valido");
  }
};