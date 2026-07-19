import axios from "axios";
import "./analysis.css";
const API = import.meta.env.VITE_API_URL;
const AnalyzeButton = ({
  resumeFile,
  jobDescription,
  setAnalysisResult
}) => {

  const handleAnalyze = async () => {

    if (!resumeFile) {
      alert("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("resume", resumeFile);

      formData.append(
        "jobDescription",
        jobDescription
      );


      const response = await axios.post(
        `${API}/resume/upload`,
        formData
      );


      console.log("Backend Response:");
      console.log(response.data);
      console.log("Resume:", response.data.analysis?.resume);
      setAnalysisResult(response.data.analysis);

      localStorage.setItem(
        "resumeText",
        response.data.analysis.resume_text
      );
      alert("Analysis completed successfully!");

    } catch (error) {

      console.error(error);

      alert("Analysis failed.");
    }
  };

  return (
    <section className="analyze-section">
      <button
        className="analyze-btn"
        onClick={handleAnalyze}
      >
        Analyze Resume
      </button>
    </section>
  );
};

export default AnalyzeButton;