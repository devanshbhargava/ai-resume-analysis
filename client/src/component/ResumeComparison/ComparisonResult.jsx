import "./ResumeComparison.css";

const ComparisonResult = ({ comparison }) => {

    const resume1 = comparison.resume1;
    const resume2 = comparison.resume2;

    const summary = comparison.comparison.summary;

    return (

        <div className="comparison-result">

            <h2>Comparison Report</h2>

            <div className="winner-card">

                <h3>🏆 Better Resume</h3>

                <h1>{comparison.comparison.winner}</h1>

            </div>

            <table className="comparison-table">

                <thead>

                    <tr>

                        <th>Metric</th>

                        <th>Resume 1</th>

                        <th>Resume 2</th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td>ATS Score</td>

                        <td>{summary.resume1.ats_score}%</td>

                        <td>{summary.resume2.ats_score}%</td>

                    </tr>

                    <tr>

                        <td>Weighted ATS</td>

                        <td>{summary.resume1.weighted_ats_score}%</td>

                        <td>{summary.resume2.weighted_ats_score}%</td>

                    </tr>

                    <tr>

                        <td>Resume Grade</td>

                        <td>{summary.resume1.resume_grade}</td>

                        <td>{summary.resume2.resume_grade}</td>

                    </tr>

                    <tr>

                        <td>Resume Completeness</td>

                        <td>{summary.resume1.resume_completeness}%</td>

                        <td>{summary.resume2.resume_completeness}%</td>

                    </tr>

                    <tr>

                        <td>Matched Skills</td>

                        <td>{summary.resume1.matched_skills}</td>

                        <td>{summary.resume2.matched_skills}</td>

                    </tr>

                    <tr>

                        <td>Missing Skills</td>

                        <td>{summary.resume1.missing_skills}</td>

                        <td>{summary.resume2.missing_skills}</td>

                    </tr>

                    <tr>

                        <td>Recruiter Recommendation</td>

                        <td>{summary.resume1.recommendation}</td>

                        <td>{summary.resume2.recommendation}</td>

                    </tr>

                </tbody>

            </table>

            <div className="details">

                <div className="resume-box">

                    <h3>Resume 1 Skills</h3>

                    <ul>

                        {resume1.ats.matched_skills.map((skill, index) => (

                            <li key={index}>{skill}</li>

                        ))}

                    </ul>

                </div>

                <div className="resume-box">

                    <h3>Resume 2 Skills</h3>

                    <ul>

                        {resume2.ats.matched_skills.map((skill, index) => (

                            <li key={index}>{skill}</li>

                        ))}

                    </ul>

                </div>

            </div>

        </div>

    );

};

export default ComparisonResult;