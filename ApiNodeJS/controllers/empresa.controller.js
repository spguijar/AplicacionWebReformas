const { Empresa, Servicios } = require("../models");
const empresa = require("../models/empresa");
const servicios = require("../models/servicios");
const { Servicios_Empresa } = require("../models")
const relacion = require("../models/index.js");


exports.getEmpresawithServicio = async (req, res) => {
    try {
        const result = await Servicios.findAll({
            include: [
                {
                    model: Empresa,
                    //Para que no se muestre la tabla intermedia en los resultados
                    through: { attributes: [] },
                }
            ],
        });
        return res.status(200).send({ result });
    } catch (error) {
        return res.status(500).send({ message: 'Error crear empresas y sus servicios.', 'error': error.message });
    }
}

exports.getAll = async (req, res) => {
    try {
        const empresa = await Empresa.findAll();
        return res.status(200).send({ empresa });
    } catch (error) {
        return res.status(500).send({ message: 'Fallo al buscar las empresas.', 'error': error.message });
    }
}
exports.getByProvincia = async (req, res) => {
    try {
        const provincia = req.params.provincia;
        const empresas = await Empresa.findAll({
            where: {
                provincia: provincia
            }
        })
        return res.status(200).send({ empresas });
    } catch (error) {
        return res.status(500).send({ message: 'Fallo al buscar las empresas.', 'error': error.message });
    }
}