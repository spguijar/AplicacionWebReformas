const { Servicios, Empresa, Cliente, Clientes_Servicios_Empresa, Servicios_Empresa } = require("../models");

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
    const { provincia } = req.query;
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

exports.getByCliente = async (req, res) => {
    const { id_cliente } = req.query;
    try {
        const servicios = await Cliente.findAll({
            attributes: [],
            where: { id: id_cliente },
            required: true,
            include: [
                {
                    model: Servicios_Empresa,
                    //Para que no se muestre la tabla intermedia en los resultados
                    attributes: ["id_servicios"],
                    through: { attributes: [] },
                    include: [
                        {
                            model: Servicios, // Incluye los datos de la empresa

                            attributes: ['tarea'], // Campos que deseas obtener
                        }
                    ],
                }
            ]
        });
        const tareas = servicios.map((item) => item.tarea);
        console.log(tareas);
        return res.status(200).send({ servicios });
    } catch (error) {
        return res.status(500).send({ message: 'Fallo al buscar los servicios de las empresas por el cliente', 'error': error.message });
    }
}