def extract_skills(resume_text):

    skill_keywords = [
        "python",
        "java",
        "c++",
        "javascript",
        "html",
        "css",
        "react",
        "node",
        "express",
        "mongodb",
        "sql",
        "machine learning",
        "deep learning",
        "flask",
        "fastapi",
        "git",
        "github"
    ]

    found_skills = []

    for skill in skill_keywords:
        if skill.lower() in resume_text.lower():
            found_skills.append(skill)

    return found_skills