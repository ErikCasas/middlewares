const {Router} = require('express')
const { validateBody } = require('./middlewares/funciones')
// const validateBody = require('./app')
const userRoutes = Router()

userRoutes.get("/", (req, res)=>{
res.send("Hola esta es la ruta de usuarios")
})

userRoutes.get("/:name",(req,res)=>{
    const {name} = req.params
    res.status(200).send("hola "+name)
})



//tenemos un middleware para validar que todas las peticiones 
//de tipo POST tengan un body, asi que lo usamos
//esto es un middleware a nivel de una sub-ruta de express==> users/"alguna otra ruta"
userRoutes.post("/logIn",validateBody, (req, res)=>{
    const { name } = req.body;

    res.status(200).send(`${name} esta autorizado para las rutas de usario`)

})



module.exports = userRoutes