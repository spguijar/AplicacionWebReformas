const { Empresa } = require("../models");
//const servicios_empresa = require("../models/servicios_empresa");


// exports.postEmpresawithServicio = async (req, res, nex) => {
//     try {
//         const empresa = await Empresa.create(req.body);

//         const relacion = await servicios_empresa({
//             id_servicio: req.body.id_servicio,
//             id_empresa: empresa.id
//         })
//         return res.status(200).send({ message: "empresa creada con exito", empresa });
//     } catch (error) {
//         return res.status(500).send({ message: 'Error crear empresas y sus servicios.', 'error': error.message });
//     }
// }
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
        console.log(provincia)
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

// exports.getEmpresasServicios = async (req, res) => {
//     try {
//         const empresas = await Empresa.findAll(include: [{
//             model: User, as: 'userRate',
//             include: [{
//                 model: Status, as: 'userStatus',
//             }],)
//     } catch (error) {
//         return res.status(500).send({ message: 'Fallo al buscar las empresas y servicios.', 'error': error.message });
//     }

// }




// module.exports = list();
// exports.list = (req, res) => {
//     return res.status(500).send('hola');
// }
