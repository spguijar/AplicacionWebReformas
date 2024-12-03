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
      // models.Servicios_Empresa.belongsToMany(models.Servicios, { through: 'Servicios', as: "servicios", foreignKey: "id", otherKey: "id" });
      // models.Servicios_Empresa.belongsToMany(models.Empresa, { through: 'Empresa', as: "empresas", foreignKey: "id", otherKey: "id" });
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