const servicios = require("../controllers/servicios.controller");
const router = require("express").Router();

router.get("/getAll",
    servicios.getAll
);

router.get("/getByProvincia", servicios.getByProvincia);

router.get("/getByCliente", servicios.getByCliente);

module.exports = router;