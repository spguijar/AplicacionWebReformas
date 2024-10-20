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
      // define association here
      //Empresa.hasMany(models.Servicios);
    }
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
  });
  return Empresa;
};