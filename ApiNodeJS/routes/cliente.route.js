
const cliente = require("../controllers/cliente.controller");
const router = require("express").Router();

router.post("/register",
    cliente.registrarUsuario
);

module.exports = router;