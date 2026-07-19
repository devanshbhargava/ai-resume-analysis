import React from "react";
import "./jobdetail.css";


const JobDescription = ({ jobDescription, setJobDescription }) => {
  return (
    <section className="job-description">
      <div className="job-container">
        <h2>Job Description</h2>

        <p>
          Paste the job description below to compare it with your resume and
          get an ATS score.
        </p>

        <textarea
          placeholder="Paste Job Description Here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>
      </div>
    </section>
  );
};

export default JobDescription;