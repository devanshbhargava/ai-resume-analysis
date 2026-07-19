
from extractor.skill import extract_skills

def calculate_resume_completeness(resume_data):
    """
    Calculate how complete the resume is.
    """

    total_sections = 9
    completed = 0

    if resume_data.get("name") and resume_data["name"] != "Not Found":
        completed += 1

    if resume_data.get("email") and resume_data["email"] != "Not Found":
        completed += 1

    if resume_data.get("phone") and resume_data["phone"] != "Not Found":
        completed += 1

    if resume_data.get("skills"):
        completed += 1

    if resume_data.get("education"):
        completed += 1

    if resume_data.get("projects"):
        completed += 1

    if resume_data.get("experience"):
        completed += 1

    if resume_data.get("certifications"):
        completed += 1

    if resume_data.get("languages"):
        completed += 1

    completeness = round((completed / total_sections) * 100)

    return completeness
def generate_suggestions(resume_data, missing_skills):

    suggestions = []

    if not resume_data.get("github"):
        suggestions.append("Add your GitHub profile.")

    if not resume_data.get("linkedin"):
        suggestions.append("Add your LinkedIn profile.")

    if not resume_data.get("portfolio"):
        suggestions.append("Add your portfolio website.")

    if not resume_data.get("projects"):
        suggestions.append("Add at least one project.")

    if not resume_data.get("certifications"):
        suggestions.append("Add at least one certification.")

    if not resume_data.get("experience"):
        suggestions.append("Include internship or work experience if available.")

    for skill in missing_skills:
        suggestions.append(f"Add '{skill}' skill for better ATS matching.")

    return suggestions
def detect_resume_sections(resume_data):
    """
    Detect which important resume sections are present.
    """

    sections = {
        "Contact": False,
        "Skills": False,
        "Education": False,
        "Projects": False,
        "Experience": False,
        "Certifications": False,
        "Languages": False
    }

    if resume_data.get("email") != "Not Found" or resume_data.get("phone") != "Not Found":
        sections["Contact"] = True

    if resume_data.get("skills"):
        sections["Skills"] = True

    if resume_data.get("education"):
        sections["Education"] = True

    if resume_data.get("projects"):
        sections["Projects"] = True

    if resume_data.get("experience"):
        sections["Experience"] = True

    if resume_data.get("certifications"):
        sections["Certifications"] = True

    if resume_data.get("languages"):
        sections["Languages"] = True

    return sections
def get_resume_strength(resume_data, matched_skills):
    """
    Identify resume strengths.
    """

    strengths = []

    if len(matched_skills) >= 5:
        strengths.append("Excellent skill match with the job description.")

    if resume_data.get("projects"):
        strengths.append("Projects section is available.")

    if resume_data.get("github"):
        strengths.append("GitHub profile is available.")

    if resume_data.get("linkedin"):
        strengths.append("LinkedIn profile is available.")

    if resume_data.get("certifications"):
        strengths.append("Certifications improve resume quality.")

    return strengths
def get_resume_weakness(resume_data, missing_skills):
    """
    Identify resume weaknesses.
    """

    weaknesses = []

    if missing_skills:
        weaknesses.append("Important job skills are missing.")

    if not resume_data.get("projects"):
        weaknesses.append("Projects section is missing.")

    if not resume_data.get("github"):
        weaknesses.append("GitHub profile is missing.")

    if not resume_data.get("linkedin"):
        weaknesses.append("LinkedIn profile is missing.")

    if not resume_data.get("certifications"):
        weaknesses.append("Certifications are missing.")

    return weaknesses
def calculate_keyword_density(resume_data, job_description):
    """
    Calculate how many times job description skills appear in the resume.
    """

    resume_text = " ".join(resume_data.get("skills", [])).lower()

    jd_skills = extract_skills(job_description)

    keyword_count = {}

    total_matches = 0

    for skill in jd_skills:

        count = resume_text.count(skill.lower())

        keyword_count[skill] = count

        total_matches += count

    return {
        "keyword_count": keyword_count,
        "total_keyword_matches": total_matches
    }
def calculate_weighted_score(
    skill_score,
    completeness,
    sections
):
    """
    Calculate weighted ATS score.
    """

    total_sections = len(sections)

    detected_sections = sum(sections.values())

    section_score = (
        detected_sections / total_sections
    ) * 100

    final_score = (
        (skill_score * 0.60) +
        (completeness * 0.25) +
        (section_score * 0.15)
    )

    return round(final_score)
def generate_resume_summary(
    resume_data,
    ats_score
):
    """
    Generate a short ATS summary.
    """

    name = resume_data.get("name", "Candidate")

    skills = len(resume_data.get("skills", []))

    projects = len(resume_data.get("projects", []))

    certifications = len(
        resume_data.get("certifications", [])
    )

    return (
        f"{name}'s resume scored {ats_score}% in ATS analysis. "
        f"The resume contains {skills} technical skills, "
        f"{projects} projects, and "
        f"{certifications} certifications."
    )
def calculate_resume_grade(score):
    """
    Convert ATS score into a resume grade.
    """

    if score >= 90:
        return "A+"

    elif score >= 80:
        return "A"

    elif score >= 70:
        return "B"

    elif score >= 60:
        return "C"

    elif score >= 50:
        return "D"

    return "F"
def recruiter_recommendation(weighted_score):
    """
    Recommend whether the candidate should be shortlisted.
    """

    if weighted_score >= 85:
        return "Highly Recommended"

    elif weighted_score >= 70:
        return "Recommended"

    elif weighted_score >= 55:
        return "Consider with Improvements"

    return "Not Recommended"
def skill_gap_analysis(missing_skills):
    """
    Explain missing skills in a readable format.
    """

    if not missing_skills:
        return "No significant skill gaps detected."

    return (
        "The resume is missing the following important skills: "
        + ", ".join(missing_skills)
        + "."
    )
def analyze_ats(resume_data, job_description):

    """
    Analyze resume against job description.

    Parameters:
        resume_data (dict): Data extracted from resume.
        job_description (str): Job Description entered by the user.

    Returns:
        dict
    """

    resume_skills = [
    skill.lower()
    for skill in resume_data.get("skills", [])
    ]

    jd_skills = extract_skills(job_description)
    matched_skills = []

    missing_skills = []

    for word in jd_skills:

        word = word.strip(",.()")

        if word.lower() in resume_skills:

            matched_skills.append(word)

        else:

            missing_skills.append(word)

    total_required = len(set(jd_skills))
    matched = len(set(matched_skills))

    if total_required == 0:
        score = 0
    else:
        score = round((matched / total_required) * 100)

    completeness = calculate_resume_completeness(resume_data)
    suggestions = generate_suggestions(
    resume_data,
    missing_skills
    )
    sections = detect_resume_sections(resume_data)

    strengths = get_resume_strength(
        resume_data,
        matched_skills
    )
    

    weaknesses = get_resume_weakness(
        resume_data,
        missing_skills
    )
    keyword_density = calculate_keyword_density(
        resume_data,
        job_description
    )

    weighted_score = calculate_weighted_score(
        score,
        completeness,
        sections
    )

    summary = generate_resume_summary(
        resume_data,
        weighted_score
    )
    grade = calculate_resume_grade(
    weighted_score
    )

    skill_gap = skill_gap_analysis(
        missing_skills
    )

    recommendation = recruiter_recommendation(
        weighted_score
    )
    return {
        "matched_skills": sorted(list(set(matched_skills))),
        "missing_skills": sorted(list(set(missing_skills))),
        "ats_score": score,
        "weighted_ats_score": weighted_score,
        "resume_completeness": completeness,
        "keyword_density": keyword_density,
        "sections": sections,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "resume_summary": summary,
        "resume_grade": grade,
        "skill_gap": skill_gap,
        "recruiter_recommendation": recommendation,
        "suggestions": suggestions
    }