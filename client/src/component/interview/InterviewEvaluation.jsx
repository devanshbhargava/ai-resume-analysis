import "./InterviewEvaluation.css";

const InterviewEvaluation = ({ evaluation }) => {
  if (!evaluation) return null;

  return (
    <div className="evaluation-card">

      <h2>AI Feedback</h2>

      <div className="scores">

        <div>
          <strong>Overall Score</strong>
          <span>{evaluation.score}/10</span>
        </div>

        <div>
          <strong>Technical Accuracy</strong>
          <span>{evaluation.technical_accuracy}/10</span>
        </div>

        <div>
          <strong>Communication</strong>
          <span>{evaluation.communication}/10</span>
        </div>

        <div>
          <strong>Confidence</strong>
          <span>{evaluation.confidence}/10</span>
        </div>

      </div>

      <h3>Strengths</h3>

      <ul>
        {evaluation.strengths.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Weaknesses</h3>

      <ul>
        {evaluation.weaknesses.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Improved Answer</h3>

      <p>{evaluation.improved_answer}</p>

    </div>
  );
};

export default InterviewEvaluation;