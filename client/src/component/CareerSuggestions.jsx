import { useState } from "react";
import { careerSuggestions } from "../services/aiservices";
import ReactMarkdown from "react-markdown";
import LoadingSpinner from "./LoadingSpinner";

const CareerSuggestions = ({ resumeText }) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");

  const generateSuggestions = async () => {
    try {
      setLoading(true);

      const response = await careerSuggestions(resumeText);

      setSuggestions(response.career_suggestions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="career-btn"
        onClick={generateSuggestions}
      >
        📈 Generate Career Suggestions
      </button>

      {loading && <LoadingSpinner />}

      {suggestions && (
        <ReactMarkdown>{suggestions}</ReactMarkdown>
      )}
    </div>
  );
};

export default CareerSuggestions;