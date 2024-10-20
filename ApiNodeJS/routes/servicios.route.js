const servicios = require("../controllers/servicios.controller");
const router = require("express").Router();

router.get("/getAll",
    servicios.getAll
);

module.exports = router;