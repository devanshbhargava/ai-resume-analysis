def build_career_prompt(resume_text: str) -> str:
    return f"""
You are an experienced Career Coach and Senior Software Engineer.

Analyze ONLY the resume below.

Rules:
- Do not invent any information.
- Use only resume data.
- Return clean Markdown.
- Be concise but detailed.

# Candidate Profile
- Education
- Experience Level
- Technical Skills
- Strengths

# Best Career Paths
Suggest the top 5 career paths.

For each include:
- Why it matches
- Skills required
- Future scope

# Skill Gap Analysis
Include:
- Strong Skills
- Missing Skills
- Technologies to learn

# Learning Roadmap
Create a practical roadmap:
1. Programming
2. Frontend
3. Backend
4. Database
5. Cloud
6. Interview Preparation

# Resume Improvements
Suggest improvements for:
- ATS
- Projects
- Skills
- GitHub
- LinkedIn

# Final Career Advice
Include:
- Biggest Strength
- Biggest Weakness
- Next Steps

Resume:

{resume_text}
"""