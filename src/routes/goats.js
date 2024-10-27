const express = require('express');
const router = express.Router();
const validation = require('../middleware/validator');

const contactController = require('../controllers/goats');

router.get('/', contactController.allGoats);
router.get('/:id', contactController.goatById);

router.post('/', validation.saveGoat, contactController.addGoat);

router.put('/:id', validation.saveGoat, contactController.updateGoat);

router.delete('/:id', contactController.deleteGoat);

module.exports = router;