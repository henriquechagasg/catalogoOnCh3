const dbOperations = require('./dboperations');
const express = require('express');
const path = require('path');
const { Console } = require('console');
const app = express();
const fs = require('fs')



app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')


app.get('/', async (req, res) => {
    
    let filenames = fs.readdirSync('public/imgs')
    const regex = /\//g;
    collections = await dbOperations.getCollections()
    products = await dbOperations.getAll()
    let prices = await dbOperations.getProductPrice()
    for await (product of products) {
        product['image'] = []
        filenames.forEach(file => {
            let index = file.indexOf('&')
            if (product.REFER.trim() == file.slice(0, index)) {
                product['image'].push(file)
            }
        })
    }
    res.render('home\'', { products, regex, collections, prices, filenames })    
})

app.get('/?r=:refer', async(req, res) => {
    let prices = await dbOperations.getProductPrice()
    let filenames = fs.readdirSync('public/imgs')
    const { refer } = req.params;
    const regex = /\//g;
    products = await dbOperations.getRefer(refer)
    orders = await dbOperations.getOrders(refer)
    
    res.render('refer2', { refer, products, regex, orders, filenames, prices })    
})


app.listen(3000, () => {
    console.log("Server On Port 8080.")
})