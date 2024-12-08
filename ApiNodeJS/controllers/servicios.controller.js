const { Servicios, Empresa } = require("../models");

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

exports.getByProvincia = async (req, res) => {
    const { provincia } = req.body;
    try {
        const servicios = await Servicios.findAll({
            attributes: ['tarea'],
            include: [
                {
                    model: Empresa,
                    attributes: [],
                    where: { provincia: provincia },
                    required: true,
                    //Para que no se muestre la tabla intermedia en los resultados
                    through: { attributes: [] },
                }
            ]
        });
        return res.status(200).send({ servicios });
    } catch (error) {
        return res.status(500).send({ message: 'Fallo al buscar los servicios de las empresas por provincia', 'error': error.message });
    }
}