const dotenv = require('dotenv');
dotenv.config();


module.exports = {
  username: process.env.user || 'postgres',
  password: process.env.password || 'admin',
  database: process.env.database || "proyecto",
  host: process.env.host || "localhost",
  port: process.env.port || 5432,
  dialect: "postgres",
  logging: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
}