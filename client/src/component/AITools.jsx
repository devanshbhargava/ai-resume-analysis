import "./AITools.css";

import ResumeRewrite from "./ResumeRewrite";
import InterviewQuestions from "./InterviewQuestions";
import CareerSuggestions from "./CareerSuggestions";
import CoverLetter from "./CoverLetter";
import ResumeTailor from "./ResumeTailor";

const AITools = ({
  analysis,
  resumeText,
  jobDescription,
}) => {

  if (!analysis) return null;

  return (
    <section className="ai-tools">

      <div className="ai-tools-header">
        <h2>🤖 AI Assistant</h2>
        <p>
          Enhance your resume with AI-powered career tools.
        </p>
      </div>

      <div className="tools-grid">

        <div className="tool-card">
          <ResumeRewrite resumeText={resumeText}/>
        </div>

        <div className="tool-card">
          <InterviewQuestions resumeText={resumeText}/>
        </div>

        <div className="tool-card">
          <CareerSuggestions resumeText={resumeText}/>
        </div>

        <div className="tool-card">
          <CoverLetter
            resumeText={resumeText}
            jobDescription={jobDescription}
          />
        </div>

        <div className="tool-card">
          <ResumeTailor
            resumeText={resumeText}
            jobDescription={jobDescription}
          />
        </div>

      </div>

    </section>
  );
};

export default AITools;