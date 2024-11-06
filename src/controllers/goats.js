const mongodb = require('../database/connection');
const ObjectId = require('mongodb').ObjectId;

// Get all goats
const allGoats = (req, res) => {
  mongodb
    .getDb()
    .db('sterling_stables')
    .collection('goats')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

// Get a single goat by ID
const goatById = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const goatId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db('sterling_stables')
    .collection('goats')
    .find({ _id: goatId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

// Create a new goat
const createGoat = async (req, res) => {
  const goats = {
    fullName: req.body.fullName,
    breed: req.body.breed,
    gender: req.body.gender,
    coatPattern: req.body.coatPattern,
    eyeColor: req.body.eyeColor,
  };
  const response = await mongodb.getDb().db('sterling_stables').collection('goats').insertOne(goats);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

// Update a goat
const updateGoat = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
  }
  const goatId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db('sterling_stables')
    .collection('goats')
    .replaceOne({ _id: goatId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

// Delete a goat
const deleteGoat = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }
  const goatId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('sterling_stables').collection('goats').remove({ _id: goatId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  allGoats,
  goatById,
  createGoat,
  updateGoat,
  deleteGoat
};