def build_cover_letter_prompt(resume_text: str, job_description: str = "") -> str:
    """
    Build a concise prompt for generating a professional ATS-friendly cover letter.
    """

    return f"""
You are a professional HR Manager and expert Cover Letter Writer.

Write a complete ATS-friendly cover letter using ONLY the information available in the resume and job description.

Rules:
- Do NOT invent any skills, projects, companies, certifications or experience.
- Use only the information present in the resume.
- If the resume lacks information, simply omit it.
- Return clean Markdown.
- Complete the entire cover letter.
- Length: 350-450 words.

Use the following format:

# Cover Letter

**Date:** [Current Date]

**Hiring Manager**

**Company Name**

**Subject:** Application for the position

Dear Hiring Manager,

Write a strong introduction.

Explain why the candidate is a good fit.

Highlight technical skills.

Mention relevant projects from the resume.

Explain enthusiasm for the company.

Write a professional closing paragraph.

Sincerely,

**Candidate Name**

---

## Job Description

{job_description}

---

## Candidate Resume

{resume_text}
"""