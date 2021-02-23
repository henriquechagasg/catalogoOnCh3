const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsToShowSchema = new Schema ({
    Product: String,
    url: String,
    filename: String
});

module.exports = mongoose.model('showProducts', ProductsToShowSchema);