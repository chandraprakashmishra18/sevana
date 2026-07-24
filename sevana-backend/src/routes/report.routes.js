const express = require('express');
const {
  createReport, listReports, getReport, updateStatus, respondToReport,
} = require('../controllers/report.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const asyncHandler = require('../utils/async-handler');

const router = express.Router();

router.post('/', requireAuth, asyncHandler(createReport));
router.get('/', asyncHandler(listReports)); // feed viewable without auth; writes require it
router.get('/:id', asyncHandler(getReport));
router.patch('/:id/status', requireAuth, asyncHandler(updateStatus));
router.post('/:id/respond', requireAuth, asyncHandler(respondToReport));

module.exports = router;
