'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cliente.belongsToMany(models.Servicios_Empresa, {
        through: models.Clientes_Servicios_Empresa,
        foreignKey: 'id_cliente',
        otherKey: 'id_servicio_empresa',
      });
    }
  }
  Cliente.init({
    // id: {
    //   type: DataTypes.INTEGER,
    // },
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    direccion: DataTypes.STRING,
    provincia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};