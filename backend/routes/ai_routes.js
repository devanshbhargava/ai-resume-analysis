const express = require("express");

const router = express.Router();

const {

    reviewResume,

    rewriteResume,

    interviewQuestions,

    careerSuggestions,

    coverLetter,

    tailorResume

} = require("../controler/ai_controler");


router.post("/review", reviewResume);

router.post("/rewrite", rewriteResume);

router.post("/interview", interviewQuestions);

router.post("/career", careerSuggestions);

router.post("/cover-letter", coverLetter);

router.post("/tailor-resume", tailorResume);


module.exports = router;