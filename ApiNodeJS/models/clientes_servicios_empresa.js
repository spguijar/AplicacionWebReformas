'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clientes_Servicios_Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clientes_Servicios_Empresa.belongsTo(models.Cliente, { foreignKey: 'id_cliente' });

      Clientes_Servicios_Empresa.belongsTo(models.Servicios_Empresa, { foreignKey: 'id_servicio_empresa' });
    }
  }
  Clientes_Servicios_Empresa.init({
    id_cliente: DataTypes.INTEGER,
    id_servicio_empresa: DataTypes.INTEGER,
    preciocontrat: DataTypes.DECIMAL(10, 2),
  }, {
    sequelize,
    modelName: 'Clientes_Servicios_Empresa',
  });
  return Clientes_Servicios_Empresa;
};