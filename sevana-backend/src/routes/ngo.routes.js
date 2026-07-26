const express = require('express');
const { listNGOs, getNGO } = require('../controllers/ngo.controller');
const asyncHandler = require('../utils/async-handler');

const router = express.Router();

router.get('/', asyncHandler(listNGOs));
router.get('/:id', asyncHandler(getNGO));

module.exports = router;