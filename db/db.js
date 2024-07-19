const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL || 'postgres://postgres:root@localhost:5432/chat_app');
module.exports = { sequelize }