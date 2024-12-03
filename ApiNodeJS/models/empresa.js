'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Empresa.associate = (models) => {
      Empresa.belongsToMany(models.Servicios, {
        through: models.Servicios_Empresa,
        foreignKey: 'id_empresa',
        otherKey: 'id_servicios',
      });
    };
    // }
  }
  Empresa.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    direccion: DataTypes.STRING,
    provincia: DataTypes.STRING,
    preciohora: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Empresa',
    tableName: 'Empresas'
  });



  return Empresa;
};