const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_URL || 'postgres://postgres:root@localhost:5432/test_db');
module.exports = { sequelize }