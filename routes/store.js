const express = require('express');
const routes = express.Router();
const storeControllers = require('../controllers/store');

routes.route('/')
    .get(storeControllers.renderHome)

routes.route('/?r=:refer')
    .get(storeControllers.renderRefer)

routes.route('/?q=:category')
    .get(storeControllers.renderCategory)

routes.route('/cart')
    .get(storeControllers.renderCart)
    .post(storeControllers.sendOrder)

routes.route('/obrigado')
    .get(storeControllers.greetings)

module.exports = routes