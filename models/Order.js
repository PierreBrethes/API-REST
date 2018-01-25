const db = require('../db')
const Sequelize = require('sequelize')
const math = require('math');


const Order = db.define('Order', {
  currency : Sequelize.STRING,
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  quantity : Sequelize.INTEGER,
  price : Sequelize.INTEGER
})

// db
//  .authenticate()
//  .then(function(err) {
//    console.log('Connection has been established successfully.');
//  }, function (err) {
//    console.log('Unable to connect to the database:', err);
//  });
//
// db
//   .sync({ force: true })
//   .then(function(err) {
//     console.log('It worked!');
//   }, function (err) {
//     console.log('An error occurred while creating the table:', err);
//   });

module.exports = Order
