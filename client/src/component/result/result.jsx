import "./result.css";
import ReactMarkdown from "react-markdown";
import AIReview from "../AIReview";
import AITools from "../AITools";

const Results = ({ analysisResult }) => {

  if (!analysisResult) {
    return null;
  }
  console.log("analysisResult:", analysisResult);
  console.log("resume:", analysisResult?.resume);

  const analysis = analysisResult;

  const ats = analysis.ats;

  const resume = analysis.resume;


  return (
    <section className="results-section">

      <div className="results-container">

        <h2>AI Resume Analysis</h2>
        <div className="result-box">

          <h3>Candidate Information</h3>

          <p><strong>Name:</strong> {resume.name}</p>

          <p><strong>Email:</strong> {resume.email}</p>

          <p><strong>Phone:</strong> {resume.phone}</p>

          <p><strong>College:</strong> {resume.college}</p>

          <p><strong>Degree:</strong> {resume.degree}</p>

        </div>
        <div className="result-box">

          <h3>Resume Statistics</h3>

          <p><strong>Skills:</strong> {resume.skills.length}</p>

          <p><strong>Projects:</strong> {resume.projects.length}</p>

          <p><strong>Experience:</strong> {resume.experience.length}</p>

          <p><strong>Languages:</strong> {resume.languages.length}</p>

          <p><strong>Certifications:</strong> {resume.certifications.length}</p>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>ATS Score</h3>
            <h1
              className={
                ats.ats_score >= 80
                  ? "excellent-score"
                  : ats.ats_score >= 60
                    ? "good-score"
                    : "poor-score"
              }
            >
              {ats.ats_score}%
            </h1>
          </div>

          <div className="stat-card">
            <h3>Weighted ATS Score</h3>
            <h1>{ats.weighted_ats_score}%</h1>
          </div>

          <div className="stat-card">
            <h3>Resume Grade</h3>
            <h1>{ats.resume_grade}</h1>
          </div>

          <div className="stat-card">
            <h3>Resume Completeness</h3>
            <h1>{ats.resume_completeness}%</h1>
          </div>

        </div>

        <div className="recommendation-card">
          <h3>Recruiter Recommendation</h3>
          <p>{ats.recruiter_recommendation}</p>
        </div>

        <div className="results-grid">

          <div className="result-box">
            <h3>Resume Summary</h3>
            <p>{ats.resume_summary}</p>
          </div>

          <div className="result-box">
            <h3>Matched Skills</h3>

            <div className="skills-container">

              {ats.matched_skills.map((skill, index) => (

                <span
                  key={index}
                  className="skill-chip"
                >
                  {skill}
                </span>

              ))}

            </div>
          </div>

          <div className="result-box">
            <h3>Missing Skills</h3>

            {
              ats.missing_skills.length === 0
                ? <p>No Missing Skills 🎉</p>
                : (
                  <ul>
                    {ats.missing_skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                )
            }

          </div>

          <div className="result-box">
            <h3>Strengths</h3>

            <ul>
              {ats.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="result-box">
            <h3>Weaknesses</h3>

            <ul>
              {ats.weaknesses.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="result-box">
            <h3>Suggestions</h3>

            <ul>
              {ats.suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="result-box">

            <h3>Skill Gap Analysis</h3>

            <p>{ats.skill_gap}</p>

          </div>
          <div className="result-box">



            <h3>Resume Sections</h3>

            <ul>

              {Object.entries(ats.sections).map(([section, available]) => (

                <li key={section}>

                  {available ? "✅" : "❌"} {section}

                </li>

              ))}

            </ul>

          </div>
        </div> {/* results-grid */}

        <div className="ai-review-card">

          <h2>🤖 AI Resume Review</h2>

          <div className="ai-review">
            <ReactMarkdown>
              {analysis.ai_review}
            </ReactMarkdown>
          </div>

        </div>

        <AITools
          analysis={analysis}
          resumeText={analysis.resume_text}
          jobDescription={analysis.job_description}
        />

      </div> {/* results-container */}

    </section>


  );
};

export default Results;