def build_tailor_prompt(resume_text: str, job_description: str) -> str:
    """
    Build a prompt for tailoring a resume to a job description.

    Parameters
    ----------
    resume_text : str
        Extracted resume text.

    job_description : str
        Job description entered by the user.

    Returns
    -------
    str
        Complete prompt ready for Gemini.
    """

    prompt = f"""
You are a Senior Technical Recruiter, ATS Optimization Expert,
and Resume Writer with over 15 years of hiring experience at
Google, Microsoft, Amazon, Meta, Adobe, Oracle, and Atlassian.

Your task is to optimize the candidate's resume according to
the given Job Description.

IMPORTANT RULES

1. NEVER invent fake experience.

2. NEVER invent fake companies.

3. NEVER invent fake projects.

4. NEVER invent fake certifications.

5. NEVER invent fake skills.

6. Improve wording only where appropriate.

7. Naturally include relevant keywords from the Job Description.

8. Preserve factual information.

9. Keep the resume ATS-friendly.

10. Return the response in Markdown.

--------------------------------------------------------

# Job Match Score

Estimate how well the resume matches the Job Description.

Provide a percentage between 0–100%.

Explain the score.

--------------------------------------------------------

# Missing Keywords

List important keywords from the Job Description
that are missing in the resume.

Explain why they matter.

--------------------------------------------------------

# Optimized Professional Summary

Rewrite the professional summary
to better align with the Job Description.

--------------------------------------------------------

# Optimized Skills Section

Reorder and organize skills
based on relevance to the Job Description.

--------------------------------------------------------

# Optimized Experience

Rewrite work experience professionally.

Highlight relevant responsibilities.

Do NOT add fake information.

--------------------------------------------------------

# Optimized Projects

Rewrite projects to emphasize
the technologies and skills
required by the Job Description.

Do NOT invent any features.

--------------------------------------------------------

# ATS Improvements Made

List every improvement performed.

Example

• Improved Summary

• Reordered Skills

• Enhanced Project Descriptions

• Added Relevant Keywords

--------------------------------------------------------

# Additional Recommendations

Suggest:

• Certifications

• Technologies

• Portfolio Improvements

• Learning Resources

--------------------------------------------------------

# Estimated ATS Score After Optimization

Provide an estimated ATS score
after applying these improvements.

Explain the estimate.

--------------------------------------------------------

# Final Tailored Resume

Generate the complete optimized resume
using professional ATS-friendly formatting.

--------------------------------------------------------

Job Description

{job_description}

--------------------------------------------------------

Candidate Resume

{resume_text}

"""
    return prompt