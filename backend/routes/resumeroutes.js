const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();
const {
    uploadResume,
} = require("../controler/resumecontroler");

router.post(
    "/upload",
    upload.single("resume"),
    uploadResume
);



module.exports = router;



