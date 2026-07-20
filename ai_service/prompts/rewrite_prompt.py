def build_rewrite_prompt(resume_text: str) -> str:
    """
    Build a prompt for rewriting a resume.
    """

    return f"""
You are a Senior Technical Recruiter and Professional Resume Writer.

Rewrite the resume into a modern ATS-friendly resume.

Rules:
- Never invent experience, projects, companies, certifications or achievements.
- Use only the information available in the resume.
- Improve grammar and readability.
- Use professional action verbs.
- Return clean Markdown.

Generate the resume in the following format:

# Professional Summary

Write a concise professional summary.

# Technical Skills

Group skills into:
- Programming Languages
- Frontend
- Backend
- Database
- Tools
- Other Skills

# Projects

For each project include:
- Project Name
- Technologies
- Description
- Key Features

# Education

Rewrite professionally.

# Certifications

Include only if present.

# Additional Information

Include:
- Soft Skills
- Languages
- GitHub
- LinkedIn
- Portfolio (if available)

Resume:

{resume_text}
"""