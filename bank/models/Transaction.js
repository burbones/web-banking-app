const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    issuer: {
        type: String,
        required: true,
        index: true,
    },
    acquirer: {
        type: String,
        index: true,
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;