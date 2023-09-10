const { Router } = require("express");

const route = Router();

route.get("/", (req, res) => {
  res.json("lista de usuarios");
});
route.post("/", (req, res) => {
  res.json("usuario creado");
});
route.put("/", (req, res) => {
  res.json("usuario actualizado");
});
route.delete("/", (req, res) => {
  res.json("usuario eliminado");
});

module.exports = route;
