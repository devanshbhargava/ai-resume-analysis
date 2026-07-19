const fs = require("fs");
const pdfParse = require("pdf-parse");
const axios = require("axios");

const compareResumes = async (req, res) => {

    try {

        if (
            !req.files ||
            !req.files.resume1 ||
            !req.files.resume2
        ) {

            return res.status(400).json({
                success: false,
                message: "Please upload both resumes."
            });

        }

        const jobDescription =
            req.body.jobDescription || "";

        //-----------------------------
        // Resume 1
        //-----------------------------

        const resume1Buffer = fs.readFileSync(
            req.files.resume1[0].path
        );

        const resume1Pdf = await pdfParse(
            resume1Buffer
        );

        //-----------------------------
        // Resume 2
        //-----------------------------

        const resume2Buffer = fs.readFileSync(
            req.files.resume2[0].path
        );

        const resume2Pdf = await pdfParse(
            resume2Buffer
        );

        //-----------------------------
        // Flask API
        //-----------------------------

        const flaskResponse = await axios.post(

            `${process.env.AI_SERVICE_URL}/compare-resumes`,

            {

                resumeText1: resume1Pdf.text,

                resumeText2: resume2Pdf.text,

                jobDescription

            }

        );

        //-----------------------------
        // Delete Uploaded Files
        //-----------------------------

        fs.unlinkSync(req.files.resume1[0].path);

        fs.unlinkSync(req.files.resume2[0].path);

        //-----------------------------
        // Return Response
        //-----------------------------

        return res.status(200).json(
            flaskResponse.data
        );

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Resume comparison failed.",

            error: error.message

        });

    }

};

module.exports = {
    compareResumes
};