
const empresa = require("../controllers/empresa.controller");
const router = require("express").Router();

router.get("/getAll",
    empresa.getAll
);

router.get("/getByProvincia/:provincia",
    empresa.getByProvincia
);

router.get("/getEmpresawithServicio",
    empresa.getEmpresawithServicio);


module.exports = router;

