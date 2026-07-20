import { useState } from "react";
import { careerSuggestions } from "../services/aiservices";
import ReactMarkdown from "react-markdown";
import LoadingSpinner from "./LoadingSpinner";

const CareerSuggestions = ({ resumeText }) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");

  const generateSuggestions = async () => {
    if (!resumeText) {
      alert("Resume text not found.");
      return;
    }

    try {
      setLoading(true);

      const response = await careerSuggestions(resumeText);

      console.log("Career Suggestions Response:", response);

      setSuggestions(response?.career_suggestions || "No suggestions generated.");
    } catch (error) {
      console.error("Career Suggestions Error:", error);

      setSuggestions(
        "❌ Failed to generate career suggestions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="career-container">
      <button
        className="career-btn"
        onClick={generateSuggestions}
        disabled={loading}
      >
        📈 Generate Career Suggestions
      </button>

      {loading && <LoadingSpinner />}

      {suggestions && (
        <div className="markdown-content">
          <ReactMarkdown>{suggestions}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default CareerSuggestions;