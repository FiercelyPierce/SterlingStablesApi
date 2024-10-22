const mongodb = require('../database/connection');
const ObjectId = require('mongodb').ObjectId;

// Get all pigs
const allPigs = async (req, res) => {
  const result = await mongodb.getDb().db('sterling_stables').collection('pigs').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// Get a single pig by ID
const pigById = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('sterling_stables').collection('pigs').find({_id: userId});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// Create a new pig
const addPig = async (req, res) => {
  const pig = req.body;
  const result = await mongodb.getDb().db('sterling_stables').collection('pigs').insertOne(pig);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the pig.');
  }
};

// Update a pig
const updatePig = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const pig = {
    fullName: req.body.fullName,
    breed: req.body.breed,
    gender: req.body.gender,
    coloration: req.body.coloration,
    eyeColor: req.body.eyeColor,
  };
  const response = await mongodb
    .getDb()
    .db('sterling_stables')
    .collection('pigs')
    .replaceOne({ _id: userId }, pig);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the pig.');
  }
};

// Delete a pig
const deletePig = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('sterling_stables').collection('pigs').deleteOne({_id: userId});
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    message: 'Pig deleted successfully',
    result: result
  });
};

module.exports = {
  allPigs,
  pigById,
  addPig,
  updatePig,
  deletePig
};