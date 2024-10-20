'use strict';
const {
  Model
} = require('sequelize');
const servicios = require('./servicios');
const empresa = require('./empresa');
module.exports = (sequelize, DataTypes) => {
  class Servicios_Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Servicios_Empresa.belongsTo(models.Servicios, { as: 'Servicios', foreignKey: 'id_servicios' })
      // Servicios_Empresa.belongsTo(models.Empresas, { as: 'Empresas', foreignKey: 'id_empresa' })
    }
  }
  Servicios_Empresa.init({
    id_servicio: {
      type: DataTypes.INTEGER,
      references: {
        model: servicios,
        key: "id"
      }
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      references: {
        model: empresa,
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Servicios_Empresa',
  });
  return Servicios_Empresa;
};