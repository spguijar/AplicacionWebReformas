const { Cliente } = require("../models");
const bcrypt = require("bcryptjs");
//const { bcrypt } = require("bcryptjs");

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