const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rawOrdersSchema = new Schema ({
    orderID: String,
    Client: String,
    Phone: String,
    Email: String,
    Products: String,
    date: Date,
    sended: Boolean
});

module.exports = mongoose.model('rawOrders', rawOrdersSchema);