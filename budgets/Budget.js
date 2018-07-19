'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const BudgetSchema = mongoose.Schema({
    
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const Budget = mongoose.model('Budget', BudgetSchema);

module.exports = {Budget};