const dbOperations = require('../dboperations');
const showProductsDb = require('../models/productsToShow');
const { cloudinary } = require('../cloudinary');


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