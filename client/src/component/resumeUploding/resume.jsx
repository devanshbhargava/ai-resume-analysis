import "./resume.css";

function ResumeUpload({
  resumeFile,
  setResumeFile,
}) {

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setResumeFile(selectedFile);
  };

  return (
    <section className="upload-section">

      <h2>Upload Your Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />

      <p>
        {
          resumeFile
            ? `Selected File: ${resumeFile.name}`
            : "No File Selected"
        }
      </p>

    </section>
  );
}

export default ResumeUpload;