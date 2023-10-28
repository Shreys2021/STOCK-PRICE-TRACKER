const mongoose = require('mongoose');
const Schema = mongoose.Schema

const stockSchema = new Schema({
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    stockName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const Stock = mongoose.model('Stock', stockSchema);


module.exports = Stock;