const mongoose = require('mongoose');

const debtSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    user_id:{type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true},
    debtor: {type: String,
        required: true},
    reason: {type: String,
        required: true},
    description: {type: String,
        required: false},
    amount: {type: Number, 
        equired: true},
    date: {type: Date,
        default: Date.now }
});

module.exports = mongoose.model('Debt', debtSchema);