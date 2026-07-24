const express = require('express');
const { myStats } = require('../controllers/report.controller');
const { requireAuth } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Powers the 3 stat tiles on HomeScreen
router.get('/me/stats', requireAuth, asyncHandler(myStats));

module.exports = router;
