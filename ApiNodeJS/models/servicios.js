'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servicios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Servicios.belongsToMany(models.Empresa, {
        through: models.Servicios_Empresa, // Modelo intermedio
        foreignKey: 'id_servicios',       // Clave foránea en la tabla intermedia
        otherKey: 'id_empresa',           // Otra clave foránea
      });
    }

  }
  Servicios.init({
    tarea: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Servicios',
    tableName: 'Servicios'
  });

  // Servicios.associate = (models) => {
  //   Servicios.belongsToMany(models.Empresa, {
  //     through: models.Servicios_Empresa,
  //     foreignKey: 'id_servicios',
  //     otherKey: 'id_empresa',
  //   });
  // };

  return Servicios;
};