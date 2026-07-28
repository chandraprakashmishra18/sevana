const express = require("express");
const {
  getMyProfile,
  updateMyProfile,
  myStats,
} = require("../controllers/user.controller");

const { requireAuth } = require("../middleware/auth.middleware");
const asyncHandler = require("../utils/async-handler");

const router = express.Router();

router.get("/me", requireAuth, asyncHandler(getMyProfile));

router.patch("/me", requireAuth, asyncHandler(updateMyProfile));

router.get("/me/stats", requireAuth, asyncHandler(myStats));

module.exports = router;