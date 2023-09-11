# Middlewares

un middleware es una función que se ejecuta en medio del proceso de la solicitud (Request),estas funciones pueden realizar diversas tareas, como la manipulación de la solicitud (Response), validación de datos, manejo de errores, etc.. Los middlewares permiten hacer aplicaciones con mayor eficiencia, reduciendo la redundancia al poder ser reusables.

Los middlewares en express no son mas que funciones que tienen acceso al objeto Request (res) y Response (res), gracias a esto puede manipular la información contenida en el objeto Request o agregar propiedades, y en base a los criterios que definamos, un middleware puede o no dar fin a la solicitud con el objeto Response(res), evitando que se ejecute código de forma inecesaria

```javascript
const middleware = (req, res, next) => {
  const permiso = req.authorization; //accedemos al objeto Request
  if (permiso === "si") {
    next(); //le decimos que puede seguir con su camino
  } else {
    res.status(400).json("no tienes permisos"); //damos una respuesta desde el middleware
  }
};
```

---

## Tipos de middlewares

Los middleware deben ser registrados en nuestra aplicación a distintos niveles y con distintos propositos, tales como: autorización, autenticación, validaciones, manejo de la solicitud, manejo de errores, etc. Y según nuestros intereses, estos serán registrados en su respectivo nivel

---

#### Middleware a nivel de apliación

Un middleware a nivel de aplicación es una función que se ejecutara ante cualquier solicitud, puedes pensarlo como una especie de control migratorio, en donde antes de pasar por la lógica que hayas definido en la ruta de tu servidor, pasará por este middleware, ejemplo:

```javascript
const validate = (req, res, next) => {
  console.log("el middleware esta validando información...");
  next(); //le decimos que continue
};
```

cons el middleware ya creado, ahora solo debemos registrar el middleware a nivel de toda nuestra aplicación

```javascript
// Una vez creado el middleware, debemos registrarlo a nivel de toda nuestra aplicación.
const app = express();

app.use(validate); // Registramos el middleware

app.get("/users", (req, res) => {
  // Lógica de respuesta para la ruta "/users"
});

app.post("/lista-tareas", (req, res) => {
  // Lógica de respuesta para la ruta "/lista-tareas"
});

app.get("/clients", (req, res) => {
  // Lógica de respuesta para la ruta "/clients"
});
```

como podemos observar, para registrar un middleware a nivel de de toda nuestra aplicación se hace a traves de la instancia de express (app), para finalmente solo decirle que use ese middleware y ahora no importa a que ruta se dirija el cliente, siempre veremos por consola el mensaje que dejamos definido en el middleware

---

#### Middleware a nivel de direccionador

Un middleware a nivel de direccionador es aquel que solo se ejecuta en una sola ruta o rutas donde lo implementemos, para asi evitar que valide cosas que en otras rutas no existen o realizar acciones especificas de esa ruta

```javascript
const validateBody = (req, res, next) => {
  const info = req.body;
  //validamo que hayan enviado información
  if (Object.values(info).length === 0) {
    req.info = info; //agregamos una propiedad al objeto req para que sea usada mas adelante
    next(); //le decimos que puede continuar
  } else {
    res.json("se necesitan datos para ejecutar esta ruta");
  }
};
```

ahora solo debemos registrar el middleware en cada ruta en la que debamos validar que se envio información para así no realizar acciones como agregar un objeto vacío a nuestra base de datos

```javascript
app.post("/crear", validateBody, (req, res) => {
  const newInfo = req.info; //accedo a esa propiedad que se agrego con el middleware
  //logica para crear un elemento en la base de datos o array
  res.json("creación exitosa");
});
```

como vimos, para registrar un middleware a nivel de direccionador, solo se debe hacer el llamado de la función entre la creación de la ruta ("/crear") y la función controladora que nos dará la respuesta final, esto es muy util y puede ser mejor al usarlo junto con una instancia de express.Router:

```javascript
app.use("/users", anotherMiddleware, userRoutes);
```

Ahora todas las rutas que partan de "/users" pasaran por un mismo middleware

---

#### Middleware incorporado de express

al instalar express este traer consigo una serie de middleware listos para ser usados, normalmente se registran a nivel de aplicación, como por ejemplo **express.json()** el cual añade una propiedad body para asi tener acceso a esa información que es enviada por body en formato json

```javascript
const express = require("express");

const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  const info = req.body; //info será un objeto con los valores que envie el cliente
});
```

existen muchos mas middlewares que trae incorporado express que puedes explorar y utilizar según tus necesidades. Algunos ejemplos adicionales de middlewares incorporados en Express son:

- _express.urlencoded()_ : Analiza los datos de formularios enviados en las solicitudes HTTP.
- _express.static()_: Sirve archivos estáticos, como CSS, JavaScript e imágenes, desde un directorio específico en tu servidor.
- _express.cookieParser()_: Parsea las cookies enviadas por el cliente y las hace accesibles en el objeto Request.

---

#### Middlewares de terceros

Del mismo modo en que podemos crear nuestros propios middlewares y en que al instalar express este trae una serie de middlewares listos para usarse, podemos instalar middlewares echos por terceros, los cuales facilitan distintas acciones, un ejemplo es _morgan_, el cual es un middleware que te mostrará por consola información sobre las soolicitudes que se hagan a tu servidor, lo primero es instalar morgan con el comando **_npm install morgan_**, para luego registrarlo a nivel de aplicación

```javascript
app.use(morgan("dev")); //le indicamos que estamos en modo desarrollo
```

para asi tener por consola un mensaje con detalles sobre las peticiones que se realicen a tu servidor

<img src ="https://media.geeksforgeeks.org/wp-content/uploads/20210730163327/Screenshot262.png">

---

#### Middleware para manejo de errores

Los middlewares para el manejo de errores se crean con el fin de capturar y gestionar errores de manera controlada, a diferencia de los demás middlewares estos, se deben registrar al final de la cadena, para que de este modo se pueda hacer llamado de la función next y pasarle error, esto quiere decir que un middleware para contro de errores reciben 4 argumentos, (err,req,res,next) para asi manejar el error de forma adecuada

```javascript
const errHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.json("algo salio mal");
};
```

```javascript
app.get("/err"(req,res, next)=>{
  const err = new Error("este es un error")
  next(err)
})

app.use(errHandler) //registramos el middleware al final de todo
```
