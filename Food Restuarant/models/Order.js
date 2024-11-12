const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: String,
    customerContact: String,
    items: [{ name: String, quantity: Number }],
    totalAmount: Number,
    status: { type: String, default: 'in progress' },
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);