//los middleware son ese intermediario entre la aplicación 
//o alguna ruta, en la que antes de ejecutar la logica definida en la ruta
//pasa por el middleware, en donde podemos validar errores, información, manipular 
//la información y demás, nuestro middleware, puede terminar con la solicitud 
//echa por el usuario diciendo por ejemplo

//  res.status(400).send("metodo invalido");

//O decir que todo esta bien y continuar con su camino, utilizando la función 
//next()
//la cual seria el tercer parametro que recibe nuestra función
// function middleware(req, res, next) //sentencia




//si se hace algún tipo de solicitud que no sea POST ni GET
//rechazará la solicitud, ya que no esta contemplada en nuestra app
const Middleware = (req, res, next) => {
  const metodo = req.method;

  //si el metodo es uno de lo contemplados, 
  //lo deja continuar a la ruta que sea que se dirija
  //de lo contrario no le deja avanzar y le responde con un error 400
  if (metodo == "POST" || metodo == "GET") {
    next();//next para continuar
  } else {
    res.status(400).send("metodo invalido");//aquí termina la solicitud del usuario 
  }
};



function validateBody(req, res, next) {
//un metodo que ingeniamos para validar si trae algo en su body
  if (Object.values(req.body).length === 0) {
    res.status(400).send("ES requirido un body");
  } else {
    next();
  }
}


// {
//  "name" :"tu nombre ;)",
//   "token": "odazirotua"
// }

//una pequeña simulación del uso de un token
//en donde todas las peticiones a las rutas de usuario "/users/..."
//ya sean GET o POST, deben traer un body con el token y este
//al ser "decodificado" debe cumplir con lo esperado, de lo contrario no 
//se le dará acceso 
function validateToken(req, res, next) {

  const { token } = req.body;

  const validate = token.split("").reverse().join("");

  if (validate == "autorizado") {
    next();
  } else {
    res.send("No estas autorizado");
  }
}

module.exports = {
  validateToken,
  validateBody,
  Middleware,
};
