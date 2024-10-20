const dotenv = require('dotenv');
dotenv.config();


module.exports = {
  username: process.env.user || 'postgres',
  password: process.env.password,
  database: process.env.database,
  host: process.env.host,
  port: process.env.port,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
}