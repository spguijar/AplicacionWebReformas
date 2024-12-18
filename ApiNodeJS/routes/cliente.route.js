
const cliente = require("../controllers/cliente.controller");
const router = require("express").Router();

router.post("/register",
    cliente.registrarUsuario
);

router.post("/login",
    cliente.login
);

router.post("/crearClienteandServicios", cliente.crearClienteandServicios)
router.get("/getClienteandServicios",
    cliente.getClienteandServicios
);

module.exports = router;