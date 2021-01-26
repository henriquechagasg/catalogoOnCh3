const dbOperations = require('./dboperations');
const express = require('express');
const path = require('path');
const { Console } = require('console');
const app = express();

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

// dbOperations.getOrders().then(result => {
//     console.log(result);
// })

app.get('/', async (req, res) => {
    const regex = /\//g;
    collections = await dbOperations.getCollections()
    products = await dbOperations.getAll()
    let prices = await dbOperations.getProductPrice()
    res.render('home\'', { products, regex, collections, prices })
})

app.get('/?r=:refer', async(req, res) => {
    const { refer } = req.params;
    const regex = /\//g;
    products = await dbOperations.getRefer(refer)
    orders = await dbOperations.getOrders(refer)
    res.render('refer2', { refer, products, regex, orders })    
})


app.listen(8080, () => {
    console.log("Server On Port 8080.")
})