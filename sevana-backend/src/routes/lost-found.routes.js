const express = require('express');
const { createPost, listPosts, resolvePost } = require('../controllers/lost-found.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const asyncHandler = require('../utils/async-handler');

const router = express.Router();

router.post('/', requireAuth, asyncHandler(createPost));
router.get('/', asyncHandler(listPosts));
router.patch('/:id/resolve', requireAuth, asyncHandler(resolvePost));

module.exports = router;
