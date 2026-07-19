const fs = require("fs");
const pdfParse = require("pdf-parse");
const axios = require("axios");

const uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No resume uploaded"
            });
        }

        // Read uploaded PDF
        const pdfBuffer = fs.readFileSync(req.file.path);

        // Extract text
        const pdfData = await pdfParse(pdfBuffer);

        const resumeText = pdfData.text;
        const jobDescription = req.body.jobDescription || "";

        // Send to Flask AI Service
        const flaskResponse = await axios.post(
            `${process.env.AI_SERVICE_URL}/analyze`,
            {
                resumeText,
                jobDescription
            }
        );

        // Delete uploaded file
        fs.unlinkSync(req.file.path);

        console.log("========== FLASK RESPONSE ==========");
        console.log(JSON.stringify(flaskResponse.data, null, 2));

        // Return Flask response
        return res.status(200).json(flaskResponse.data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Resume analysis failed",
            error: error.message
        });

    }
};

module.exports = {
    uploadResume
};