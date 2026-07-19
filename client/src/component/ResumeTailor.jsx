import { useState } from "react";
import ReactMarkdown from "react-markdown";
import LoadingSpinner from "./LoadingSpinner";
import { tailorResume } from "../services/aiservices";
import "./ResumeTailor.css";

const ResumeTailor = ({ resumeText, jobDescription }) => {
  const [loading, setLoading] = useState(false);
  const [tailoredResume, setTailoredResume] = useState("");

  const generateTailoredResume = async () => {
    try {
      setLoading(true);

      const response = await tailorResume(
        resumeText,
        jobDescription
      );

      setTailoredResume(response.tailored_resume);

    } catch (error) {
      console.error(error);
      alert("Failed to tailor resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-tailor">
      <button onClick={generateTailoredResume}>
        Tailor Resume
      </button>

      {loading && <LoadingSpinner />}

      {tailoredResume && (
        <div className="tailored-output">
          <ReactMarkdown>
            {tailoredResume}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default ResumeTailor;