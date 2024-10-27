const express = require('express');
const router = express.Router();
const validation = require('../middleware/validator');

const contactController = require('../controllers/pigs');

router.get('/', contactController.allPigs);
router.get('/:id', contactController.pigById);

router.post('/', validation.savePig, contactController.addPig);

router.put('/:id', validation.savePig, contactController.updatePig);

router.delete('/:id', contactController.deletePig);

module.exports = router;