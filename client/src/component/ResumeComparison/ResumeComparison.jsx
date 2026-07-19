import { useState } from "react";

import "./ResumeComparison.css";

import { compareResumes } from "../../services/comparisonService";

import ComparisonResult from "./ComparisonResult";

const ResumeComparison = () => {

    const [resume1, setResume1] = useState(null);

    const [resume2, setResume2] = useState(null);

    const [jobDescription, setJobDescription] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [comparison, setComparison] =
        useState(null);

    const handleCompare = async () => {

        if (!resume1 || !resume2) {

            alert("Upload both resumes.");

            return;

        }

        try {

            setLoading(true);

            const data = await compareResumes(

                resume1,

                resume2,

                jobDescription

            );

            setComparison(data.comparison);

        }

        catch (error) {

            console.error(error);

            alert("Comparison failed.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="comparison-container">

            <h2>

                Resume Comparison

            </h2>

            <input

                type="file"

                accept=".pdf"

                onChange={(e)=>

                    setResume1(

                        e.target.files[0]

                    )

                }

            />

            <input

                type="file"

                accept=".pdf"

                onChange={(e)=>

                    setResume2(

                        e.target.files[0]

                    )

                }

            />

            <textarea

                placeholder="Job Description"

                value={jobDescription}

                onChange={(e)=>

                    setJobDescription(

                        e.target.value

                    )

                }

            />

            <button

                onClick={handleCompare}

            >

                {

                    loading

                        ?

                        "Comparing..."

                        :

                        "Compare"

                }

            </button>

            {

                comparison && (

                    <ComparisonResult

                        comparison={comparison}

                    />

                )

            }

        </div>

    );

};

export default ResumeComparison;