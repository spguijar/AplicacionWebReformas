
const cliente = require("../controllers/cliente.controller");
const router = require("express").Router();

//Rutas post
router.post("/register",
    cliente.registrarUsuario
);
router.post("/login",
    cliente.login
);
router.post("/crearClienteandServicios", cliente.crearClienteandServicios);

//Rutas get
router.get("/getClienteandServicios",
    cliente.getClienteandServicios
);

//Rutas delete
router.delete("/eliminarClienteandServicios", cliente.eliminarClienteandServicios)

module.exports = router;