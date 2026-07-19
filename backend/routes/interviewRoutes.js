const express = require("express");

const router = express.Router();

const {
    evaluateAnswer,
    generateInterviewSummary,
} = require("../controler/interviewController");

// Evaluate a single interview answer
router.post(
    "/evaluate-answer",
    evaluateAnswer
);

// Generate final AI interview summary
router.post(
    "/generate-summary",
    generateInterviewSummary
);

module.exports = router;