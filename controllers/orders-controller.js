const express = require('express')
const app = express()
const router = express.Router()
const { find } = require('lodash')
const Order = require('../models/order')

function index(res, req) {
  return Order.findAll();
}

function orderById(uuid) {
  return Order.findOne({where : {
    uuid : uuid
  }})
}

function deleteById(uuid) {
  return Order.destroy({where : {
    uuid : uuid}})
}

function generateMyId(req, res) {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

module.exports = { index, generateMyId, orderById, deleteById}
