from ats_engine import analyze_ats

resume_data = {
    "name": "Devansh Bhargava",

    "email": "devansh@gmail.com",

    "phone": "9876543210",

    "skills": [
        "python",
        "react",
        "mongodb",
        "html",
        "css"
    ],

    "education": [
        "B.Tech"
    ],

    "projects": [
        "AI Resume Analyzer"
    ],

    "experience": [
        "Intern"
    ],

    "certifications": [
        "AWS Cloud"
    ],

    "languages": [
        "English",
        "Hindi"
    ]
}

job_description = """
We are looking for a Python Developer.

Required Skills:

Python
React
Node
MongoDB
Docker
AWS
"""

result = analyze_ats(resume_data, job_description)

print(result)