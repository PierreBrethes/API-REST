const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const bodyParser = require('body-parser')
const marketsRouter = require('./controllers/markets-controller')
const ordersRouter = require('./controllers/orders-controller')
const routes = require('./router')
const db = require('./db')
const Order = require('./models/Order')
const Sequelize = require('sequelize')


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes)
app.use('/markets', routes)
app.use('/wallet', routes)
app.use('/markets/:market_name', routes)
app.use('/orders', routes)
app.use('/orders/:order_id', routes)
// app.get('/users/:userId', (req, res) => {
// res.send('User to load is: ' + req.params.userId)
// })

app.use((req, res) => {
  res.send(404, 'Not Found')
})

app.listen(PORT, () => {
  console.log('Serveur sur port : ', PORT)
})
