const { Cliente, Servicios_Empresa } = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
//TODO, meter la la variable process.env.secret_key por una de configJS
const dotenv = require('dotenv');
dotenv.config();

exports.registrarUsuario = async (req, res) => {
    const { nombre, contraseña, email, direccion, provincia } = req.body;
    //Encriptamos la contraseña
    const hashedContraseña = await bcrypt.hash(contraseña, 10);

    try {
        const cliente = await Cliente.create({
            nombre: nombre,
            email: email,
            password: hashedContraseña,
            direccion: direccion,
            provincia: provincia
        })
        res.status(201).send({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).send({ error: 'Error al registrar el usuario', 'error': error.message });
    }
};

exports.login = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        const cliente = await Cliente.findOne({
            where: {
                email: email
            }
        })
        console.log(cliente)
        if (await cliente) {

            //Comparamos las contraseñas
            const isPasswordValid = await bcrypt.compare(contraseña, cliente.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            } else {

                const token = jwt.sign({ clienteId: cliente.id }, process.env.secret_key, { expiresIn: '1h' });

                return res.status(200).send({ 'token': token, 'nombre': cliente.nombre, 'provincia': cliente.provincia, 'direccion': cliente.direccion })
            }

        } else {
            throw new RangeError();
        }
    } catch (error) {
        return res.status(404).send({
            message: 'Usuario no encontrado', 'error': error.message
        });

    }



}


exports.getClienteandServicios = async (req, res) => {
    try {
        const result = await Cliente.findAll({
            include: [
                {
                    model: Servicios_Empresa,
                    //Para que no se muestre la tabla intermedia en los resultados
                    through: { attributes: [] },
                }
            ],
        });
        return res.status(200).send({ result });
    } catch (error) {
        return res.status(500).send({ message: 'Error obtener empresas y sus servicios.', 'error': error.message });
    }
}