const Sequelize = require('sequelize');
const db = new Sequelize('null', 'null', 'null', {
  dialect: 'sqlite',
  storage: './database.sqlite'
});

module.exports = db
