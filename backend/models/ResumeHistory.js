const mongoose = require("mongoose");

const ResumeHistorySchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true,
        },

        resumeText: {
            type: String,
            required: true,
        },

        jobDescription: {
            type: String,
            default: "",
        },

        ats: {
            score: {
                type: Number,
                default: 0,
            },

            weightedScore: {
                type: Number,
                default: 0,
            },

            grade: {
                type: String,
                default: "",
            },

            completeness: {
                type: Number,
                default: 0,
            },

            summary: {
                type: String,
                default: "",
            },

            recruiterRecommendation: {
                type: String,
                default: "",
            },

            matchedSkills: {
                type: [String],
                default: [],
            },

            missingSkills: {
                type: [String],
                default: [],
            },

            strengths: {
                type: [String],
                default: [],
            },

            weaknesses: {
                type: [String],
                default: [],
            },

            suggestions: {
                type: [String],
                default: [],
            },
        },

        aiReview: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("ResumeHistory", ResumeHistorySchema);