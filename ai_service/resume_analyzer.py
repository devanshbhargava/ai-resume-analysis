import re
import spacy
from ats_engine import analyze_ats
from extractor.helper_section import extract_section
from extractor.skill import   extract_skills
nlp = spacy.load("en_core_web_sm")

def extract_name(resume_text):

    lines = [line.strip() for line in resume_text.splitlines() if line.strip()]

    for line in lines[:8]:

        if (
            "@" not in line
            and len(line.split()) >= 2
            and line.upper() == line
            and len(line) < 40
        ):
            return line.title()

    return "Not Found"
def extract_email(resume_text):
    email_pattern = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"

    email_match = re.search(email_pattern, resume_text)

    if email_match:
        return email_match.group()

    return "Not Found"
def extract_phone(resume_text):
    phone_pattern = r"(\+91[-\s]?)?[6-9]\d{9}"

    phone_match = re.search(phone_pattern, resume_text)

    if phone_match:
        return phone_match.group()

    return "Not Found"

def extract_education(resume_text):

    education_keywords = [
        "b.tech",
        "b.e",
        "m.tech",
        "bca",
        "mca",
        "bsc",
        "msc",
        "cse",
        "computer science"
    ]
    found_education = []

    for education in education_keywords:
        if education.lower() in resume_text.lower():
            found_education.append(education)

    return found_education
def extract_college(text):

    college_keywords = [
        "college",
        "university",
        "institute",
        "school of engineering",
        "school of technology"
    ]

    lines = text.splitlines()

    colleges = []

    for line in lines:

        lower_line = line.lower().strip()

        for keyword in college_keywords:

            if keyword in lower_line:
                colleges.append(line.strip())
                break

    return list(set(colleges))
def extract_degree(text):

    degree_patterns = [

        r"Bachelor of Technology.*",
        r"Master of Technology.*",

        r"B\.?\s*Tech.*",
        r"M\.?\s*Tech.*",

        r"Bachelor of Engineering.*",
        r"Master of Engineering.*",

        r"B\.?\s*E.*",
        r"M\.?\s*E.*",

        r"Bachelor of Computer Applications.*",
        r"Master of Computer Applications.*",

        r"BCA.*",
        r"MCA.*",

        r"Bachelor of Science.*",
        r"Master of Science.*",

        r"B\.?\s*Sc.*",
        r"M\.?\s*Sc.*",

        r"Bachelor of Arts.*",
        r"Master of Arts.*",

        r"B\.?\s*A.*",
        r"M\.?\s*A.*",

        r"Bachelor of Commerce.*",
        r"Master of Commerce.*",

        r"B\.?\s*Com.*",
        r"M\.?\s*Com.*",

        r"Diploma.*",

        r"Ph\.?D.*",
        r"Doctor of Philosophy.*"

    ]

    lines = text.splitlines()

    for line in lines:

        line = line.strip()

        for pattern in degree_patterns:

            if re.search(pattern, line, re.IGNORECASE):

                return line

    return "Not Found"
def extract_company(text):

    company_keywords = [
        "pvt ltd",
        "private limited",
        "limited",
        "technologies",
        "technology",
        "solutions",
        "services",
        "systems",
        "software",
        "consulting",
        "consultancy",
        "labs",
        "infotech"
    ]

    companies = []

    lines = text.splitlines()

    for line in lines:

        lower_line = line.lower().strip()

        for keyword in company_keywords:

            if keyword in lower_line:
                companies.append(line.strip())
                break

    return list(set(companies))
def extract_experience_years(text):

    pattern = re.compile(
        r'(\d+(?:\.\d+)?)\s*\+?\s*(?:years?|yrs?|months?)',
        re.IGNORECASE
    )

    matches = pattern.findall(text)

    if not matches:

        if "fresher" in text.lower():
            return ["Fresher"]

        return []

    experience = []

    for match in matches:
        experience.append(match)

    return experience
def extract_designation(text):

    designations = [

        "software engineer",

        "software developer",

        "web developer",

        "frontend developer",

        "backend developer",

        "full stack developer",

        "python developer",

        "data analyst",

        "machine learning engineer",

        "ai engineer",

        "intern",

        "internship"
    ]

    found = []

    lower_text = text.lower()

    for job in designations:

        if job in lower_text:
            found.append(job.title())

    return list(set(found))
def extract_location(text):

    cities = [

        "bhopal",

        "indore",

        "pune",

        "bangalore",

        "hyderabad",

        "delhi",

        "mumbai",

        "chennai",

        "kolkata",

        "jaipur",

        "noida",

        "gurgaon"
    ]

    locations = []

    lower_text = text.lower()

    for city in cities:

        if city in lower_text:
            locations.append(city.title())

    return list(set(locations))
def extract_experience(resume_text):

    experience_keywords = [
        "intern",
        "internship",
        "developer",
        "software engineer",
        "web developer",
        "frontend developer",
        "backend developer",
        "full stack developer",
        "project",
        "experience"
    ]

    found_experience = []

    for keyword in experience_keywords:
        if keyword.lower() in resume_text.lower():
            found_experience.append(keyword)

    return found_experience

def extract_github(text):
    """
    Extract GitHub profile URL from resume text.
    """

    pattern = re.compile(
        r"(https?://)?(www\.)?github\.com/[A-Za-z0-9_-]+",
        re.IGNORECASE
    )

    match = pattern.search(text)

    if match:
        url = match.group(0)

        if not url.startswith("http"):
            url = "https://" + url

        return url

    return None
def extract_linkedin(text):
    """
    Extract LinkedIn profile URL.
    """

    pattern = re.compile(
        r"(https?://)?(www\.)?linkedin\.com/in/[A-Za-z0-9_-]+/?",
        re.IGNORECASE
    )

    match = pattern.search(text)

    if match:
        url = match.group(0)

        if not url.startswith("http"):
            url = "https://" + url

        return url

    return None
def extract_portfolio(text):

    pattern = re.compile(
        r"https?://[^\s]+",
        re.IGNORECASE
    )

    matches = pattern.findall(text)

    for url in matches:

        lower = url.lower()

        if "github.com" in lower:
            continue

        if "linkedin.com" in lower:
            continue

        return url

    return None
def extract_certifications(text):

    headings = [
        "certifications",
        "certificates",
        "licenses"
    ]

    return extract_section(text, headings)
    
def extract_languages(text):

    headings = [
        "languages",
        "languages known",
        "language proficiency"
    ]

    return extract_section(text, headings)
def extract_projects(text):

    headings = [
        "projects",
        "academic projects",
        "personal projects"
    ]

    return extract_section(text, headings)
def analyze_resume_text(resume_text, job_description):

    word_count = len(resume_text.split())

    name = extract_name(resume_text)
    email = extract_email(resume_text)
    phone = extract_phone(resume_text)
    skills = extract_skills(resume_text)
    education = extract_education(resume_text)
    college = extract_college(resume_text)

    college = college[0] if college else "Not Found"
    degree = extract_degree(resume_text)
    company = []
    experience_years = extract_experience_years(resume_text)
    designation = extract_designation(resume_text)
    location = extract_location(resume_text)
    experience = extract_experience(resume_text)
    github = extract_github(resume_text)
    linkedin = extract_linkedin(resume_text)
    portfolio = extract_portfolio(resume_text)
    languages = extract_languages(resume_text)
    certifications = extract_certifications(resume_text)
    projects = extract_projects(resume_text)

    resume_data = {
        "name": name,
        "email": email,
        "phone": phone,
        "github": github,
        "linkedin": linkedin,
        "portfolio": portfolio,
        "word_count": word_count,
        "skills": skills,
        "education": education,
        "college": college,
        "degree": degree,
        "company": company,
        "designation": designation,
        "experience_years": experience_years,
        "location": location,
        "certifications": certifications,
        "languages": languages,
        "projects": projects,
        "experience": experience
    }

    ats_result = analyze_ats(
        resume_data,
        job_description
    )

    return {
        "resume": resume_data,
        "ats": ats_result
    }


