'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Servicios_Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Servicios_Empresa.belongsToMany(models.Cliente, {
        through: models.Clientes_Servicios_Empresa,
        foreignKey: 'id_servicio_empresa',
        otherKey: 'id_cliente',
      });

      Servicios_Empresa.belongsTo(models.Empresa, { foreignKey: 'id_empresa' });

      Servicios_Empresa.belongsTo(models.Servicios, { foreignKey: 'id_servicios' });
    }
  }
  Servicios_Empresa.init({
    id_servicios: {
      type: DataTypes.INTEGER
    },
    id_empresa: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Servicios_Empresa',
    tableName: 'Servicios_Empresas'
  });
  return Servicios_Empresa;
};