const axios = require("axios");

/**
 * Evaluate a single interview answer
 */
const evaluateAnswer = async (req, res) => {
    try {
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({
                success: false,
                message: "Question and answer are required.",
            });
        }

        const flaskResponse = await axios.post(
            "http://127.0.0.1:5001/evaluate-answer",
            {
                question,
                answer,
            }
        );

        return res.status(200).json(flaskResponse.data);
    } catch (error) {
        console.error("Interview Evaluation Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to evaluate answer.",
        });
    }
};

/**
 * Generate final AI interview summary
 */
const generateInterviewSummary = async (req, res) => {
    try {
        const { evaluations } = req.body;

        if (
            !evaluations ||
            !Array.isArray(evaluations) ||
            evaluations.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Interview evaluations are required.",
            });
        }

        const flaskResponse = await axios.post(
            "http://127.0.0.1:5001/interview-summary",
            {
                evaluations,
            }
        );

        return res.status(200).json(flaskResponse.data);
    } catch (error) {
        console.error(
            "Interview Summary Error:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to generate interview summary.",
        });
    }
};

module.exports = {
    evaluateAnswer,
    generateInterviewSummary,
};