const express = require('express');
const { listVets, getVet } = require('../controllers/vetController');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(listVets));
router.get('/:id', asyncHandler(getVet));

module.exports = router;
