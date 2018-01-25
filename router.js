const express = require('express')
const router = express.Router()
const marketsController = require('./controllers/markets-controller')
const ordersController = require('./controllers/orders-controller')
const request = require('request')
const db = require('./db')
const Order = require('./models/Order')
const Sequelize = require('sequelize')

router.use(function timeLog(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  res.send('/markets, /markets/:market_name, /wallet, /orders, /orders/:order_id');
});
router.get('/markets', function(req, res, next) {
  request({
    url: "https://bittrex.com/api/v1.1/public/getMarkets",
    json: true
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body); // Print the json response
    }
  })
});
router.get('/markets/:market_name', function(req, res, next) {
  request({
    url: "https://bittrex.com/api/v1.1/public/getticker?market="+ req.params.market_name,
    json: true
  }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body); // Print the json response
    } else {
      res.send('Bad request : maybe the currency doesn\'t exist, is it indexed ? Or switch the order of currencies in the request')
    }
  })
})
router.get('/wallet', function(req, res) {
 res.send('')
})
router.get('/orders', function(req, res) {
  ordersController.index().then(function(orders) {
    res.json({
      orders: orders
    })
  })
})
router.get('/orders/:currency/:qty', function(req, res, next) {
  request({
    url: "https://bittrex.com/api/v1.1/public/getticker?market=BTC-"+ req.params.currency,
    json: true
  }, function (error, response, body) {
      const IdCreated = ordersController.generateMyId();
      if (!error && response.statusCode === 200) {
        Order.create({
          uuid : IdCreated,
          currency : req.params.currency,
          quantity : req.params.qty,
          price : body.result.Bid
        })
        res.send('You bought '+req.params.qty+' '+req.params.currency+' for '+body.result.Bid*req.params.qty+' BTC. Your ID transaction is : '+IdCreated); // Print the json response
    } else {
      res.send('Bad request : maybe the currency doesn\'t exist, is it indexed ? Or switch the order of currencies in the request')
    }
  })
})
router.get('/orders/:order_id', function(req, res) {
  ordersController.orderById(req.params.order_id).then(function(order) {
    res.json({
      order : order
    })
  })
})
router.delete('/orders/:order_id', function(req, res) {
  ordersController.deleteById(req.params.order_id).then(function(order) {
    res.send('Order : '+req.params.order_id+' has been deleted !')
  })
})

module.exports = router;
