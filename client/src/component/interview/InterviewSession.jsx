import { useEffect, useState } from "react";
import "./InterviewSession.css";
import { interviewQuestions, evaluateAnswer } from "../../services/aiservices";
import InterviewEvaluation from "./InterviewEvaluation";
import InterviewSummary from "./InterviewSummary";


const InterviewSession = () => {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [evaluation, setEvaluation] = useState(null);
    const [evaluating, setEvaluating] = useState(false);

    // NEW: Stores evaluation of every answered question
    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    // Optional: Remove after testing
    useEffect(() => {
        console.log("Interview Evaluations:", evaluations);
    }, [evaluations]);

    const fetchQuestions = async () => {
        try {
            const resumeText = localStorage.getItem("resumeText");

            if (!resumeText) {
                alert("Please analyze your resume first.");
                setLoading(false);
                return;
            }

            const response = await interviewQuestions(resumeText);

            console.log("Interview API Response:", response);

            let generatedQuestions = [];

            if (Array.isArray(response.questions)) {
                generatedQuestions = response.questions;
            } else if (typeof response.questions === "string") {
                generatedQuestions = response.questions
                    .split("\n")
                    .filter((q) => q.trim() !== "");
            } else if (typeof response === "string") {
                generatedQuestions = response
                    .split("\n")
                    .filter((q) => q.trim() !== "");
            }

            setQuestions(generatedQuestions);
            setAnswers(Array(generatedQuestions.length).fill(""));
        } catch (error) {
            console.error(error);
            alert("Failed to generate interview questions.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (e) => {
        const updated = [...answers];
        updated[currentQuestion] = e.target.value;
        setAnswers(updated);
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setEvaluation(null);
        }
    };

    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
            setEvaluation(null);
        }
    };

    const submitAnswer = async () => {
        if (!answers[currentQuestion].trim()) {
            alert("Please enter your answer.");
            return;
        }

        try {
            setEvaluating(true);

            const response = await evaluateAnswer(
                questions[currentQuestion],
                answers[currentQuestion]
            );

            setEvaluation(response.evaluation);

            // Save evaluation history
            setEvaluations((prev) => {
                const updated = [...prev];

                updated[currentQuestion] = {
                    question: questions[currentQuestion],
                    answer: answers[currentQuestion],
                    evaluation: response.evaluation,
                };

                return updated;
            });
        } catch (error) {
            console.error(error);
            alert("Evaluation failed.");
        } finally {
            setEvaluating(false);
        }
    };
    const calculateScores = () => {
        if (evaluations.length === 0) {
            return {
                overallScore: 0,
                technicalScore: 0,
                communicationScore: 0,
                confidenceScore: 0,
            };
        }

        let technical = 0;
        let communication = 0;
        let confidence = 0;
        let total = 0;

        evaluations.forEach((item) => {
            if (!item || !item.evaluation) return;

            const tech =
                Number(item.evaluation.technical_score) ||
                Number(item.evaluation.technical) ||
                0;

            const comm =
                Number(item.evaluation.communication) || 0;

            const conf =
                Number(item.evaluation.confidence) || 0;

            technical += tech;
            communication += comm;
            confidence += conf;
            total += tech + comm + conf;
        });

        const count = evaluations.length;

        const technicalScore = +(technical / count).toFixed(1);
        const communicationScore = +(communication / count).toFixed(1);
        const confidenceScore = +(confidence / count).toFixed(1);

        const overallScore = +(
            (technicalScore +
                communicationScore +
                confidenceScore) / 3
        ).toFixed(1);

        return {
            overallScore,
            technicalScore,
            communicationScore,
            confidenceScore,
        };
    };

    if (loading) {
        return (
            <div className="interview-container">
                <h2>Generating Interview Questions...</h2>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="interview-container">
                <h2>No Interview Questions Found</h2>
            </div>
        );
    }
    const scores = calculateScores();

    return (
        <div className="interview-container">
            <h2>AI Mock Interview</h2>
            <InterviewSummary
                scores={scores}
                evaluations={evaluations}
                totalQuestions={questions.length}
            />
            <div className="score-card">
                <h3>Interview Progress</h3>

                <p>
                    <strong>Overall:</strong> {scores.overallScore}/10
                </p>

                <p>
                    <strong>Technical:</strong> {scores.technicalScore}/10
                </p>

                <p>
                    <strong>Communication:</strong> {scores.communicationScore}/10
                </p>

                <p>
                    <strong>Confidence:</strong> {scores.confidenceScore}/10
                </p>
            </div>

            <div className="question-card">
                <h4>
                    Question {currentQuestion + 1} of {questions.length}
                </h4>

                <p className="question">
                    {questions[currentQuestion]}
                </p>

                <textarea
                    rows="8"
                    placeholder="Type your answer here..."
                    value={answers[currentQuestion]}
                    onChange={handleAnswerChange}
                />

                <div className="button-group">
                    <button
                        onClick={previousQuestion}
                        disabled={currentQuestion === 0}
                    >
                        Previous
                    </button>

                    <button
                        onClick={submitAnswer}
                        disabled={evaluating}
                    >
                        {evaluating ? "Evaluating..." : "Submit Answer"}
                    </button>

                    <button
                        onClick={nextQuestion}
                        disabled={currentQuestion === questions.length - 1}
                    >
                        Next
                    </button>
                </div>

                <InterviewEvaluation evaluation={evaluation} />
            </div>
        </div>
    );
};

export default InterviewSession;