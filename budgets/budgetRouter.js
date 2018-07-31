'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {Budget} = require('./Budget');
const passport = require('passport');
const budgetRouter = express.Router();
const jsonParser = bodyParser.json();

const jwtAuth = passport.authenticate('jwt', {session: false});

budgetRouter.get('/', jwtAuth, (req, res) => {
    return Budget.find({
        username: req.user.username
    })
    .then(Budget => res.json(Budget))
    //.catch(err => res.status(500).json({message: 'Internal server error'}));
})

budgetRouter.get('/:id', jwtAuth, (req, res) => {
    Budget.findById(req.params.id)
    .then(entry => {
        res.json(entry);
    })
    .catch(err => res.status(500).json({message: 'No entry found'}))
})

budgetRouter.post('/', jwtAuth, jsonParser, (req, res) => {

    //const requiredFields = ['month', 'year', 'amount'];

    return Budget.create({
        username: req.user.username,
        month: req.body.month,
        year: req.body.year,
        currentBalance: req.body.currentBalance,
        paycheck: req.body.paycheck,
        expenses: req.body.expenses,
        finalBalance: req.body.finalBalance
    })

    .then(entry => {
        res.json(entry);
    })
    .catch(err => res.status(500).json({message: 'Error Creating Entry'}))
})

budgetRouter.put('/:id', jsonParser, jwtAuth, (req, res) => {
    let updatedEntry = {};
    const updateableFields = ['month', 'year', 'currentBalance', 'paycheck', 'expenses', 'finalBalance'];
    updateableFields.forEach( key => {
      if (key in req.body) {
        updatedEntry[key] = req.body[key];
      };
    });
    Budget.findByIdAndUpdate(req.params.id, { $set: updatedEntry }, {new: true})
    .then(result => {
      const message = 'Sucessfully Updated Entry';
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({error: 'Error Updating Entry. Please try again.'});
    });
  });



budgetRouter.delete('/:id', jwtAuth, (req, res) => {
    Budget.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({message: 'Successfully Deleted Entry'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Error Deleting Entry. Please try again.'});
    });
  });
  
module.exports = {budgetRouter}

