def build_rewrite_prompt(resume_text: str) -> str:
    """
    Build a prompt for rewriting a resume.

    Parameters
    ----------
    resume_text : str
        Extracted resume text.

    Returns
    -------
    str
        Complete prompt ready for Gemini.
    """

    prompt = f"""
You are a world-class Resume Writer and Senior Technical Recruiter with over 15 years of hiring experience at companies like Google, Microsoft, Amazon, Meta, Adobe, Atlassian, and Oracle.

Your task is to rewrite the candidate's resume into a highly professional, ATS-friendly resume.

IMPORTANT RULES:

1. Never add fake experience.
2. Never add fake companies.
3. Never add fake projects.
4. Never add fake certifications.
5. Never add fake achievements.
6. Never change factual information.
7. Improve grammar.
8. Improve readability.
9. Improve professionalism.
10. Use ATS-friendly language.
11. Keep all technical skills that already exist.
12. Improve project descriptions.
13. Improve experience descriptions.
14. Use strong action verbs.
15. Make the resume concise and impactful.

-----------------------------------------------------

Return the rewritten resume in the following structure.

# Professional Summary

Write a strong professional summary.

---

# Technical Skills

Organize skills into categories:

- Programming Languages
- Frontend
- Backend
- Database
- Cloud
- Tools
- Version Control
- Other Technologies

---

# Professional Experience

Rewrite every experience professionally.

Each experience should contain:

• Job Title

• Company

• Duration

• Responsibilities

• Achievements (Only if available)

---

# Projects

Rewrite every project professionally.

For every project include:

Project Name

Technologies Used

Description

Key Features

Outcome

---

# Education

Rewrite professionally.

---

# Certifications

Rewrite professionally.

---

# Additional Information

Include:

Languages

Soft Skills

Relevant Information

(Only if available)

---

Formatting Rules

• Use Markdown.

• Use bullet points.

• Use professional language.

• Keep proper spacing.

• Make it ATS friendly.

-----------------------------------------------------

Candidate Resume

{resume_text}

"""
    return prompt
