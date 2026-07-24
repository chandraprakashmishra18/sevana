const express = require('express');
const { createAlert, nearbyAlerts } = require('../controllers/raise-hand.controller');
const { requireAuth } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/', requireAuth, asyncHandler(createAlert));
router.get('/nearby', asyncHandler(nearbyAlerts));

module.exports = router;
