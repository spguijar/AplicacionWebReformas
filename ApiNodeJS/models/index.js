'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const dbConfig = require("../config/config.js");
const db = {};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'postgres',
  define: {
    timestamps: false
  },
  logging: console.log
})

//const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/proyecto?')



fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// db.empresa = require("./empresa.js")(sequelize, Sequelize);
// db.servicios = require("./servicios.js")(sequelize, Sequelize);
// db.cliente = require("./cliente.js")(sequelize, Sequelize);
// db.serviciosempresas = require("./servicios_empresa.js")(sequelize, Sequelize);


// db.servicios.belongsToMany(db.empresa, {
//   through: db.serviciosempresas,
//   foreignKey: 'id_servicios',
//   otherKey: 'id_empresa',
// });



// db.empresa.belongsToMany(db.servicios, {
//   through: db.serviciosempresas,
//   foreignKey: 'id_empresa',
//   otherKey: 'id_servicios',
// });
console.log('RELACIONES CONFIGURADAS:');
console.log('RELACION EMPRESA:', db.Empresa.associations);
console.log('RELACION SERVICIOS:', db.Servicios.associations);

// console.log('RELACION EMPRESA', db.empresa.associations);
// console.log('RELACION SERVICIO', db.servicios.associations);


// Many-To-Many Relationship
// db.serviciosempresas.belongsToMany(db.servicios, { through: 'servicioEmpresa_', as: "servicios", foreignKey: "id_servicio", sourceKey: "id" });
// db.serviciosempresas.belongsToMany(db.empresa, { through: 'servicioEmpresa_', as: "empresas", foreignKey: "id_empresa", sourceKey: "id" });


module.exports = db;
