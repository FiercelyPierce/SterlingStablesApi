const validator = require('../helpers/validate');

const saveGoat = (req, res, next) => {
  const validationRule = {
    fullName: 'required|string',
    breed: 'required|string',
    gender: 'required|string',
    coatPattern: 'required|string',
    eyeColor: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const savePig = (req, res, next) => {
  const validationRule = {
    fullName: 'required|string',
    breed: 'required|string',
    gender: 'required|string',
    coloration: 'required|string',
    eyeColor: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveGoat,
  savePig
};