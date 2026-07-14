const express = require('express');
const {
  createReport, listReports, getReport, updateStatus, respondToReport,
} = require('../controllers/animalController');
const { requireAuth } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/', requireAuth, asyncHandler(createReport));
router.get('/', asyncHandler(listReports)); // feed viewable without auth; writes require it
router.get('/:id', asyncHandler(getReport));
router.patch('/:id/status', requireAuth, asyncHandler(updateStatus));
router.post('/:id/respond', requireAuth, asyncHandler(respondToReport));

module.exports = router;
