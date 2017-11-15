const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Case = require('../models/case.model');
const Person = require('../models/person.model');
const Documents = require('../models/documents.model');
const Property = require('../models/property.model');

// Route requires authentication
// get all cases without populating subdocuments
router.get('/litelist', (req, res) => {
  Case.find({})
  .then((result) => res.json(result))
  .catch(err => res.status(500).json(err))
})

// get all cases, populating most subdocuments
router.get('/fulllist', (req, res) => {
  Case.find({})
  .populate('lender lenderAtty borrower borrowerAtty')
  .populate('property documents')
  .exec()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err))
})

// get 1 case by id and fully populate all subdocuments
router.get('/:id', (req, res) => {
  Case.findOne({ _id: req.params.id })
  .populate('lender lenderAtty borrower borrowerAtty otherParties')
  .populate('property documents')
  .exec()
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err))
})

router.post('/new', (req, res) => {
  let newCase = new Case(req.body);
  newCase.setCaseNum((err, result) => {
    if (err) res.status(500).json(err);
    newCase.save()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
  })
})

router.put('/:id', (req, res) => {
  Case.findByIdAndUpdate({ _id: req.params.id}, req.body, {new: true})
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err));
})

router.delete('/:id', (req, res) => {
  Case.findByIdAndRemove(req.params.id)
  .then(result => res.json(result))
  .catch(err => {
    console.log('error: ', err)
    res.status(500).json(err);
  });
});

module.exports = router;