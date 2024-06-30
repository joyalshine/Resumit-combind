const express = require("express");
const resumeController = require("./../controllers/resumeController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(protect, resumeController.getAllResume)
  .post(protect, resumeController.createResume);

router
  .route("/:userId/userId")
  .get(protect, resumeController.getResumebyUserId);
router.route("/:id/resumeId").get(protect, resumeController.getResumebyId);

router.route("/:id/update").patch(protect, resumeController.updateDetails);

module.exports = router;
