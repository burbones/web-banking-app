const mongoose = require('mongoose');

const { getRandomStartBalance, generateCode } = require('../constants/constants.js');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    creationTime: {
        type: Date,
        default: Date.now,
    },
    balance: {
        type: Number,
        default: getRandomStartBalance,
    },
    code: {
        type: Number,
        default: generateCode,
    },
    isActive: {
        type: Boolean,
        default: false,
    }
});

userSchema.index(
    {creationTime: 1},
    {expireAfterSeconds: 60, partialFilterExpression: {isActive: false}},
);

const User = mongoose.model('User', userSchema);
module.exports = User;