// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense_tracker', 'root', 'Geeta@6204', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
