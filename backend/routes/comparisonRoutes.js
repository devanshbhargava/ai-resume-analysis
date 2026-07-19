const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
    compareResumes
} = require("../controler/comparisonController");

router.post(

    "/",

    upload.fields([

        {
            name: "resume1",
            maxCount: 1
        },

        {
            name: "resume2",
            maxCount: 1
        }

    ]),

    compareResumes

);

module.exports = router;