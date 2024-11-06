const express = require('express');
const router = express.Router();
const { userValidationRules, validate } = require('../middleware/validator');

const contactController = require('../controllers/goats');

router.get('/', contactController.allGoats);
router.get('/:id', contactController.goatById);

router.post('/', contactController.createGoat);

router.put('/:id', contactController.updateGoat);

router.delete('/:id', contactController.deleteGoat);

module.exports = router;