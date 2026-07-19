def build_cover_letter_prompt(resume_text: str, job_description: str = "") -> str:
    """
    Build a prompt for generating a professional cover letter.

    Parameters
    ----------
    resume_text : str
        Extracted resume text.

    job_description : str, optional
        Job description provided by the user.

    Returns
    -------
    str
        Complete prompt ready for Gemini.
    """

    prompt = f"""
You are a Senior HR Manager and Professional Resume & Cover Letter Writer
with over 15 years of experience hiring Software Engineers at companies
such as Google, Microsoft, Amazon, Meta, Adobe, Oracle and Atlassian.

Your task is to generate a professional ATS-friendly cover letter.

IMPORTANT RULES

1. Never invent fake experience.

2. Never invent fake projects.

3. Never invent fake companies.

4. Never invent fake certifications.

5. Use only the information available in the resume.

6. If a Job Description is provided,
tailor the cover letter accordingly.

7. Keep the language professional,
natural and confident.

8. Return the response in Markdown.

--------------------------------------------------------

# Cover Letter Format

Date

Hiring Manager

Company Name

Subject

Greeting

Professional Introduction

Technical Skills

Professional Experience

Projects

Why I am a Good Fit

Closing Paragraph

Professional Signature

--------------------------------------------------------

Writing Guidelines

• Keep the cover letter between 300–500 words.

• Highlight the candidate's strongest skills.

• Mention relevant projects.

• Mention enthusiasm for the role.

• Show willingness to learn.

• Keep the tone confident but humble.

• Make it ATS friendly.

• Use professional business English.

--------------------------------------------------------

Job Description

{job_description}

--------------------------------------------------------

Candidate Resume

{resume_text}

"""
    return prompt