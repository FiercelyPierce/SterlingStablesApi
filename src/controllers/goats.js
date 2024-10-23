const mongodb = require('../database/connection');
const ObjectId = require('mongodb').ObjectId;

// Get all goats
const allGoats = async (req, res) => {
  const result = await mongodb.getDb().db('sterling_stables').collection('goats').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving goats info.'
    });
  });
};

// Get a single goat by ID
const goatById = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('sterling_stables').collection('goats').find({_id: userId});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  }).catch((error) => {
    res.status(500).send({
      message: error.message || 'Some error occurred while retrieving the goat info.'
    });
  });
};

// Create a new goat
const addGoat = async (req, res) => {
  const goat = req.body;
  const result = await mongodb.getDb().db('sterling_stables').collection('goats').insertOne(goat);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the goat.');
  }
};

// Update a goat
const updateGoat = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const goat = {
    fullName: req.body.fullName,
    breed: req.body.breed,
    gender: req.body.gender,
    coatPattern: req.body.coatPattern,
    eyeColor: req.body.eyeColor,
  };
  const response = await mongodb
    .getDb()
    .db('sterling_stables')
    .collection('goats')
    .replaceOne({ _id: userId }, goat);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the goat.');
  }
};

// Delete a goat
const deleteGoat = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('sterling_stables').collection('goats').deleteOne({_id: userId});
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    message: 'Goat deleted successfully',
    result: result
  }).catch((error) => {
    res.status(500).send({
      message: error.message || 'Some error occurred while deleting the goat.'
    });
  });
};

module.exports = {
  allGoats,
  goatById,
  addGoat,
  updateGoat,
  deleteGoat
};