import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./component/navbar/navbar";
import Hero from "./component/hero/hero";
import ResumeUpload from "./component/resumeUploding/resume";
import JobDescription from "./component/jobDiscripstion/jobdetaiil";
import AnalyzeButton from "./component/analysis/analysis";
import Results from "./component/result/result";
import ResumeComparison from "./component/ResumeComparison/ResumeComparison";
import InterviewSession from "./component/interview/InterviewSession";




function Home() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  return (
    <>
      <Hero />

      <ResumeUpload
        resumeFile={resumeFile}
        setResumeFile={setResumeFile}
      />


      <JobDescription
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
      />

      <AnalyzeButton
        resumeFile={resumeFile}
        jobDescription={jobDescription}
        setAnalysisResult={setAnalysisResult}
      />

      <Results analysisResult={analysisResult} />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/resume-comparison"
          element={<ResumeComparison />}
        />
        <Route
          path="/mock-interview"
          element={<InterviewSession />}
        />
      </Routes>
    </>
  );
}

export default App;