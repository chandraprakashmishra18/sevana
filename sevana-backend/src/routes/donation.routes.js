const express = require('express');
const {
  listDonations,
  getDonation,
  createDonation,
} = require('../controllers/donation.controller');

const asyncHandler = require('../utils/async-handler');

const router = express.Router();

router.get('/', asyncHandler(listDonations));
router.get('/:id', asyncHandler(getDonation));
router.post('/', asyncHandler(createDonation));

module.exports = router;