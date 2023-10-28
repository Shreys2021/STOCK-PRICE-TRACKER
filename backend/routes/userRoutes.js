const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/subscribed-stocks', userController.getUserSubscriptions);
router.put('/subscribe', userController.subscribeUserToStock);

module.exports = router;
