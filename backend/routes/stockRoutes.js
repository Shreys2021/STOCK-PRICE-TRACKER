const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/', stockController.getStocks);
router.delete('/remove-stock', stockController.removeStock);


module.exports = router;
