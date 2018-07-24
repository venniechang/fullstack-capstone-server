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
    currentBalance: {
        type: Number,
        required: true
    },
    paycheck: {
        type: Number,
        required: true
    },
    expenses: {
        type: Number,
        required: true
    },
    finalBalance: {
        type: Number,
        required: true
    }
});

const Budget = mongoose.model('Budget', BudgetSchema);

module.exports = {Budget};