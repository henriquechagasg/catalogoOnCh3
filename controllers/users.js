const dbOperations = require('../dboperations');
const showProductsDb = require('../models/productsToShow');
const { cloudinary } = require('../cloudinary');


function getProductSum(product$){

    if (product$.length){

        let totalResult = []
        let priceResult = []

        product$.forEach(element => {

            totalResult.push(element.P || 0);
            totalResult.push(element.M || 0);
            totalResult.push(element.G || 0);
            totalResult.push(element.GG || 0);

            priceResult.push((element.P * element.Price) || 0)
            priceResult.push((element.M * element.Price) || 0)
            priceResult.push((element.G * element.Price) || 0)
            priceResult.push((element.GG * element.GGPrice) || 0)
        });

        const total = totalResult.reduce((acc, element) => {
            return acc += element
        }, 0)
        
        const price = priceResult.reduce((acc, element) =>{
            return acc += element
        }, 0)

        totalResult = null
        priceResult = null

        return [total, Math.round(price*100)/100];

    } else {
        
        let totalResult = []
        let priceResult = []

        totalResult.push(product$.P || 0);
        totalResult.push(product$.M || 0);
        totalResult.push(product$.G || 0);
        totalResult.push(product$.GG || 0);

        priceResult.push((product$.P * product$.Price) || 0)
        priceResult.push((product$.M * product$.Price) || 0)
        priceResult.push((product$.G * product$.Price) || 0)
        priceResult.push((product$.GG *product$.GGPrice) || 0)


        const total = totalResult.reduce((acc, element) => {
            return acc += element
        }, 0)

        const price = priceResult.reduce((acc, element) =>{
            return acc += element
        }, 0)


        totalResult = null
        priceResult = null


        return [total, Math.round(price*100)/100]
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.loginUser = (req, res) => {
    const redirectUrl = req.session.returnTo || '/ch3Secret/update'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.renderProductsSearch = (req, res) => {
    res.render('search')
}

module.exports.renderUpdateProduct = async (req, res) => {
    const { refer } = req.params;
    const products = await dbOperations.getRefer(refer);
    let productToShow = await dbOperations.findProductShow();
    for await (product of products) {
        productToShow.forEach(el => {
            productName = `${product.REFER.trim()}&${product.DESCR.trim()}`
            if (productName == el.Product){
                product['isAdded'] = true
            }
        })
    }
    res.render('update', { products });
}

module.exports.updateProduct = async (req, res) => {
    const { refer } = req.params;
    const addProduct = new showProductsDb(req.body)
    addProduct.url = req.file.path;
    addProduct.filename = req.file.filename
    await addProduct.save()
    res.redirect(`/ch3Secret/update/${refer}`);
}

module.exports.deleteProduct = async (req, res) => {
    const { refer } = req.params;
    const productToDelete = await showProductsDb.findOne(req.body);
    await cloudinary.uploader.destroy(productToDelete.filename)
    await showProductsDb.findOneAndDelete(req.body);
    res.redirect(`/ch3Secret/update/${refer}`);
}

module.exports.renderOrders = async (req, res) => {
    const pedidos = await dbOperations.pedidos()
    res.render('pedidos', { pedidos })
}

module.exports.eachOrder = async (req, res) => {
    const { id } = req.params;
    const rawOrder = await dbOperations.pedidoSeparado(id);
    let pedido = rawOrder.Products
    if (typeof(pedido) == "string") {
        pedido = await JSON.parse(pedido)
    }
    const [peças, valor] = getProductSum(pedido)
    res.render('cadapedido', {rawOrder, pedido, peças, valor})
    
}
