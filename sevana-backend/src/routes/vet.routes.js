const express = require('express');
const { listVets, getVet } = require('../controllers/vet.controller');
const asyncHandler = require('../utils/async-handler');

const router = express.Router();

router.get('/', asyncHandler(listVets));
router.get('/:id', asyncHandler(getVet));

module.exports = router;
