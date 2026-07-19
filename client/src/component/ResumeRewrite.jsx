import { useState } from "react";
import { rewriteResume } from "../services/aiservices";
import ReactMarkdown from "react-markdown";
import LoadingSpinner from "./LoadingSpinner";
import "./ResumeRewrite.css";
const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Copied successfully!");
};

const downloadResume = () => {
    const blob = new Blob([result], { type: "text/plain" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "Rewritten_Resume.txt";

    a.click();

    window.URL.revokeObjectURL(url);
};

const ResumeRewrite = ({ resumeText }) => {

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const handleRewrite = async () => {

        try {

            setLoading(true);

            const response = await rewriteResume(resumeText);

            setResult(response.rewritten_resume);

        }

        catch (error) {

            alert(error.message);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="rewrite-card">

            <button
                className="rewrite-btn"
                onClick={handleRewrite}
            >
                ✨ Rewrite Resume
            </button>

            {loading && <LoadingSpinner />}

            {

                result &&

                <div className="rewrite-result">

                    <ReactMarkdown>

                        {result}

                    </ReactMarkdown>
                    <div className="rewrite-actions">

                        <button onClick={copyToClipboard}>
                            📋 Copy
                        </button>

                        <button onClick={downloadResume}>
                            📥 Download
                        </button>

                    </div>

                </div>

            }

        </div>

    );

};

export default ResumeRewrite;