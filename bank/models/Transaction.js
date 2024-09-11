const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

transactionSchema.plugin(mongoosePaginate);

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;