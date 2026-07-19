const axios = require("axios");

const AI_SERVICE = "http://127.0.0.1:5001";




exports.reviewResume = async (req, res) => {

    try {

        const { resumeText } = req.body;

        const response = await axios.post(
            `${AI_SERVICE}/review-resume`,
            { resumeText }
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
exports.generateInterviewReport = async (req, res) => {
    try {
        const { evaluations } = req.body;

        const report = await generateInterviewReport(evaluations);

        res.json({
            success: true,
            report
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate interview report."
        });
    }
};



exports.rewriteResume = async (req, res) => {

    try {

        const { resumeText } = req.body;

        const response = await axios.post(
            `${AI_SERVICE}/rewrite-resume`,
            { resumeText }
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




exports.interviewQuestions = async (req, res) => {

    try {

        const { resumeText } = req.body;

        const response = await axios.post(
            `${AI_SERVICE}/interview-questions`,
            { resumeText }
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



exports.careerSuggestions = async (req, res) => {

    try {

        const { resumeText } = req.body;

        const response = await axios.post(
            `${AI_SERVICE}/career-suggestions`,
            { resumeText }
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




exports.coverLetter = async (req, res) => {

    try {

        const { resumeText, jobDescription } = req.body;

        const response = await axios.post(
            `${AI_SERVICE}/cover-letter`,
            {
                resumeText,
                jobDescription
            }
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



exports.tailorResume = async (req, res) => {

    try {

        const {
            resumeText,
            jobDescription
        } = req.body;

        const response = await axios.post(
            `${AI_SERVICE}/tailor-resume`,
            {
                resumeText,
                jobDescription
            }
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};