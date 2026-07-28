const express = require('express');
const { myStats } = require('../controllers/user.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const asyncHandler = require('../utils/async-handler');

const router = express.Router();

// Powers the 3 stat tiles on HomeScreen
router.get('/me/stats', requireAuth, asyncHandler(myStats));

module.exports = router;
