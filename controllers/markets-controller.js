const express = require('express')
const app = express()
const router = express.Router()
const { find } = require('lodash')

function index(res, req) {
  lol = 6;
  return lol;
}

module.exports = { index }
