import { useState } from "react";

import ReactMarkdown from "react-markdown";

import LoadingSpinner from "./LoadingSpinner";

import { interviewQuestions } from "../services/aiservices";

import "./InterviewQuestions.css";

const InterviewQuestions = ({ resumeText }) => {

    const [loading, setLoading] = useState(false);

    const [questions, setQuestions] = useState("");

    const generateQuestions = async () => {

        try{

            setLoading(true);

            const response = await interviewQuestions(resumeText);

            setQuestions(response.questions);

        }

        catch(err){

            alert(err.message);

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <div className="question-card">

            <button

                className="question-btn"

                onClick={generateQuestions}

            >

                🎤 Generate Interview Questions

            </button>

            {loading && <LoadingSpinner/>}

            {

                questions &&

                <div className="question-result">

                    <ReactMarkdown>

                        {questions}

                    </ReactMarkdown>

                </div>

            }

        </div>

    );

};

export default InterviewQuestions;