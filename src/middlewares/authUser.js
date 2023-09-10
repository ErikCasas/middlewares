exports.authUser = (req, res, next) => {
  const { permiso } = req.body;

  permiso == "si"
    ? next()
    : res
        .status(400)
        .json("no tienes permiso para acceder a las rutas de usuario");
};
