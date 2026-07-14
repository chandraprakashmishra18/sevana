const express = require('express');
const { uploadPhoto } = require('../controllers/uploadController');
const { upload } = require('../middleware/upload');
const { requireAuth } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/', requireAuth, upload.single('photo'), asyncHandler(uploadPhoto));

module.exports = router;
