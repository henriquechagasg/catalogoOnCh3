const express = require('express');
const routes = express.Router();
const usersControllers = require('../controllers/users');
const { isLoggedIn } = require('../middlewares/index');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const passport = require('passport');


routes.route('/login')
    .get(usersControllers.renderLogin)
    .post(passport.authenticate(
        'local', {failureFlash: true, failureRedirect: '/login' }), 
        usersControllers.loginUser)

routes.route('/ch3Secret/update')
        .get(isLoggedIn, usersControllers.renderProductsSearch)

routes.route('/ch3Secret/update/:refer')
    .get(isLoggedIn, usersControllers.renderUpdateProduct)
    .post(isLoggedIn, upload.single('image'), usersControllers.updateProduct)
    .delete(isLoggedIn, usersControllers.deleteProduct)

routes.route('/pedidos')
    .get(usersControllers.renderOrders)

routes.route('/pedidos/:id')
    .get(usersControllers.eachOrder)


module.exports = routes