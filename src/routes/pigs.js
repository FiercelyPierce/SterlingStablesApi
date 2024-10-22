const express = require('express');
const router = express.Router();

const contactController = require('../controllers/pigs');

router.get('/', contactController.allPigs);
router.get('/:id', contactController.pigById);

router.post('/', contactController.addPig);

router.put('/:id', contactController.updatePig);

router.delete('/:id', contactController.deletePig);

module.exports = router;