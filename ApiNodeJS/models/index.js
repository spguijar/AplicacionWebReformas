'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const dbConfig = require("../config/config.js");
const db = {};

// const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
//   host: dbConfig.host,
//   dialect: 'postgres',
//   define: {
//     timestamps: false
//   }
// })

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/proyecto?')



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

module.exports = db;
