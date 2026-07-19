import { useState } from "react";
import { coverLetter } from "../services/aiservices";
import ReactMarkdown from "react-markdown";
import LoadingSpinner from "./LoadingSpinner";

const CoverLetter = ({ resumeText, jobDescription }) => {
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState("");

  const generateCoverLetter = async () => {
    try {
      setLoading(true);

      const response = await coverLetter(
        resumeText,
        jobDescription
      );

      setLetter(response.cover_letter);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cover-letter">
      <button
        className="cover-btn"
        onClick={generateCoverLetter}
      >
        📄 Generate Cover Letter
      </button>

      {loading && <LoadingSpinner />}

      {letter && (
        <ReactMarkdown>{letter}</ReactMarkdown>
      )}
    </div>
  );
};

export default CoverLetter;