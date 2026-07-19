import "./AIReview.css";

import ReactMarkdown from "react-markdown";

const AIReview = ({ review }) => {

    if (!review) return null;

    return (

        <div className="ai-review-card">

            <h2>

                🤖 AI Resume Review

            </h2>

            <ReactMarkdown>

                {review}

            </ReactMarkdown>

        </div>

    );

};

export default AIReview;