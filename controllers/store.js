const dbOperations = require('../dboperations');
const { mailMessage, sendEmail } = require('../modules/sendEmail');


module.exports.renderHome = async (req, res) => {
    let products = await dbOperations.getAll()
    let prices = await dbOperations.getProductPrice()
    let categorys = await dbOperations.getCategorys()
    let productToShow = await dbOperations.findProductShow();
    for await (product of products) {
        
        prices.forEach(productPrice => {
            if (productPrice.REFER == product.REFER) {
                product['pPrice'] = productPrice.P
                product['mPrice'] = productPrice.M
                product['gPrice'] = productPrice.G
                product["ggPrice"] = productPrice.GG
            }
        })

        product['image'] = []
        productToShow.forEach(el => {
            let index = el.Product.indexOf('&');
            currentProduct = el.Product.slice(0, index);
            if (product.REFER == currentProduct){
                product['isAdded'] = true
                product['image'].push(el.url);
            }
        })
    }
    
    res.render('home', { products, prices, categorys })
}

module.exports.renderRefer = async (req, res) => {
    let prices = await dbOperations.getProductPrice()
    const { refer } = req.params;
    const regex = /\//g;
    const products = await dbOperations.getRefer(refer);
    const orders = await dbOperations.getOrders(refer);
    let productToShow = await dbOperations.findProductShow();

    // Fixing Products data Based in other Tables
    for await (product of products){

        productToShow.forEach(el => {
            currentProductCompleteName = `${product.REFER.trim()}&${product.DESCR.trim()}`
            if (currentProductCompleteName == el.Product){
                product['image'] = el.url
            }
        });

        // Getting the price for each Product
        prices.forEach(productPrice => {
            if (productPrice.REFER == product.REFER) {
                product['pPrice'] = productPrice.P
                product['mPrice'] = productPrice.M
                product['gPrice'] = productPrice.G
                product["ggPrice"] = productPrice.GG
            }
        })

        // Taking out the ordered products from total
        orders.forEach(order => {
            if (order.REFER == product.REFER && order.DESCR.trim() == product.DESCR.trim()){
                if (order.P){
                    product.P = (Number(product.P) - Number(order.P))
                }
                if (order.M){
                    product.M = (Number(product.M) - Number(order.M))
                }
                if (order.G){
                    product.G = (Number(product.G) - Number(order.G))
                }
                if (order.GG){
                    product.GG = (Number(product.GG) - Number(order.GG))
                }                
            }
        })

    }
    res.render('refer', { refer, products, regex })
}

module.exports.renderCategory = async(req, res) => {

    const { category } = req.params
    products = await dbOperations.getAll(category.toUpperCase());
    let prices = await dbOperations.getProductPrice();
    let productToShow = await dbOperations.findProductShow();
    for await (product of products) {
        
        prices.forEach(productPrice => {
            if (productPrice.REFER == product.REFER) {
                product['pPrice'] = productPrice.P
                product['mPrice'] = productPrice.M
                product['gPrice'] = productPrice.G
                product["ggPrice"] = productPrice.GG
            }
        });

        product['image'] = []
        productToShow.forEach(el => {
            let index = el.Product.indexOf('&');
            currentProduct = el.Product.slice(0, index);
            if (product.REFER == currentProduct){
                product['isAdded'] = true
                product['image'].push(el.url);
            }
        });
    }

    res.render('category', { products,  prices, category })
}

module.exports.renderCart = (req, res) => {
    res.render('cart')
}

module.exports.sendOrder = async (req, res) => {
    const { name, phone, email } = req.body;
    const products = JSON.parse(req.body.clientOrder);
    const message = await mailMessage(products, name, phone);
    sendEmail(message, process.env.MAIL_DEST)
    res.redirect('/obrigado')
}

module.exports.greetings = async (req, res) => {
    res.render('greetings')
}