const { Servicios } = require("../models");

exports.getAll = async (req, res) => {
    try {
        const servicios = await Servicios.findAll({
            attributes: ['tarea'],
        });
        return res.status(200).send({ servicios });
    } catch (error) {
        return res.status(500).send({ message: 'Fallo al buscar los servicios de las empresas.', 'error': error.message });
    }
}