const express = require("express");
const userRoutes = require("./users");
const morgan = require("morgan");

const {
  validateBody,
  validateToken,
  Middleware,
} = require("./middlewares/funciones");

const app = express();
//middlewares registrados a nivel de toda la aplicación
//es decir que antes de de la ejecución de cualquier ruta
//veremos la ejecución del midleware, esto se puede usar
//para controlar errores y validaciones ==> app.use("algun middleware")


//middleware a nivel general de nuestra aplicación echo por nosotros
app.use(Middleware);

//middleware incorporado de express, es decir que express es quien los trae
//existen muchos más que podemos explorar
app.use(express.json());

//middleware de un tecero, es decir que viene de algún paquete que instalamos con npm
app.use(morgan("dev"));



//todas las rutas que vayan a las rutas de /user, deben pasar
//por una varificación, de un token
//esto seria un middleware a nivel de una instancia de express router
app.use("/users", validateToken, userRoutes);

app.get("/", (_req, res) => {
  res.status(201).send("HOLA MUNDOOOO!!!");
});

//debido a que esta ruta utiliza información que en teoria deberia mandar
//el usuario, creamos un middleware para validar que si mandó algo
//asi evitamos el error de que la ruta responda con algo como:

//hola "undefined", gracias por usar mi ruta
app.post("/", validateBody, (req, res) => {
  const { name } = req.body;
  const response = `hola ${name}, gracias por usar mi ruta`;
  res.status(200).send(response);
});

app.get("/presentacion", (_req, res) => {
  res
    .status(200)
    .send("Hola mi nombre es Erik y soy desasrrollador web full-stack");
});

//------------------------------------------------

//esto lo tenemos mas que claro
app.listen(3001, () => {
  console.log("server on port 3001");
});
