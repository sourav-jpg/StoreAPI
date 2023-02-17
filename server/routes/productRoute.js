const express = require('express');
const route = express.Router();
const controller = require('../controller/products')


route.get('/',controller.getAllproducts)
route.get('/static',controller.getAllproductsStatic);

module.exports = route
