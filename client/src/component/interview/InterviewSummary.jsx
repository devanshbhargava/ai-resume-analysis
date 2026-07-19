import { useEffect, useState } from "react";
import "./InterviewSummary.css";
import { generateInterviewSummary } from "../../services/aiservices";
import InterviewScoreChart from "./InterviewScoreChart";
import DownloadInterviewReport from "./DownloadInterviewReport";

const InterviewSummary = ({
    scores,
    evaluations,
    totalQuestions
}) => {

    const [summary, setSummary] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchSummary = async () => {

            if (evaluations.length < 3) return;

            try {

                setLoading(true);

                setError("");

                const response =
                    await generateInterviewSummary(
                        evaluations
                    );

                if (response.success) {

                    setSummary(
                        response.summary
                    );

                }

            }

            catch (err) {

                console.error(err);

                setError(
                    "Failed to generate AI Interview Summary."
                );

            }

            finally {

                setLoading(false);

            }

        };

        fetchSummary();

    }, [evaluations]);

    const attemptedQuestions =
        evaluations.filter(
            item => item && item.evaluation
        ).length;

    const remainingQuestions =
        totalQuestions - attemptedQuestions;

    const progress =
        totalQuestions === 0
            ? 0
            : Math.round(
                (attemptedQuestions /
                    totalQuestions) * 100
            );

    return (

        <div
            className="summary-card"
            id="interview-report"
        >

            <h2>
                AI Interview Report
            </h2>

            {/* ========================= */}
            {/* Score Cards */}
            {/* ========================= */}

            <div className="summary-grid">

                <div className="summary-item">

                    <h3>
                        {scores.overallScore}
                    </h3>

                    <span>
                        Overall
                    </span>

                </div>

                <div className="summary-item">

                    <h3>
                        {scores.technicalScore}
                    </h3>

                    <span>
                        Technical
                    </span>

                </div>

                <div className="summary-item">

                    <h3>
                        {scores.communicationScore}
                    </h3>

                    <span>
                        Communication
                    </span>

                </div>

                <div className="summary-item">

                    <h3>
                        {scores.confidenceScore}
                    </h3>

                    <span>
                        Confidence
                    </span>

                </div>

            </div>

            {/* ========================= */}
            {/* Progress */}
            {/* ========================= */}

            <div className="progress-section">

                <h3>
                    Interview Progress
                </h3>

                <div className="progress-bar">

                    <div
                        className="progress-fill"
                        style={{
                            width:
                                `${progress}%`
                        }}
                    />

                </div>

                <p>

                    <strong>

                        {progress}%

                    </strong>

                    {" "}Completed

                </p>

                <div className="progress-stats">

                    <div>

                        <strong>

                            {attemptedQuestions}

                        </strong>

                        <span>

                            Attempted

                        </span>

                    </div>

                    <div>

                        <strong>

                            {remainingQuestions}

                        </strong>

                        <span>

                            Remaining

                        </span>

                    </div>

                    <div>

                        <strong>

                            {totalQuestions}

                        </strong>

                        <span>

                            Total

                        </span>

                    </div>

                </div>

            </div>

            {/* ========================= */}
            {/* AI Summary */}
            {/* ========================= */}

            <div className="skill-section">

                <h3>

                    AI Interview Summary

                </h3>

                {

                    loading &&

                    <p>

                        Generating AI Report...

                    </p>

                }

                {

                    error &&

                    <p>

                        {error}

                    </p>

                }

                {

                    summary &&

                    <>

                        <h4>

                            Overall Summary

                        </h4>

                        <p>

                            {

                                summary.overall_summary

                            }

                        </p>

                        <h4>

                            Technical Analysis

                        </h4>

                        <p>

                            {

                                summary.technical_analysis

                            }

                        </p>

                        <h4>

                            Communication Analysis

                        </h4>

                        <p>

                            {

                                summary.communication_analysis

                            }

                        </p>

                        <h4>

                            Confidence Analysis

                        </h4>

                        <p>

                            {

                                summary.confidence_analysis

                            }

                        </p>

                    </>

                }

            </div>

            {/* ========================= */}
            {/* Next Feature */}
            {/* ========================= */}

            <InterviewScoreChart
                scores={scores}
            />

            <DownloadInterviewReport />
            

        </div>

    );

};

export default InterviewSummary;