import re


def extract_section(text, headings):
    """
    Extract a specific resume section safely.
    """

    lines = [line.strip() for line in text.splitlines()]

    start_index = None

    heading_pattern = re.compile(
        r'^(' + "|".join(map(re.escape, headings)) + r')\b',
        re.IGNORECASE
    )

    stop_sections = [

        "education",
        "experience",
        "work experience",
        "internship",
        "internships",

        "skills",
        "technical skills",
        "projects",
        "academic projects",
        "personal projects",

        "certifications",
        "certificates",

        "languages",

        "achievements",
        "awards",

        "summary",
        "objective",
        "about",
        "about me",

        "contact",

        "hobbies",
        "interests",

        "soft skills",

        "profile"

    ]

    stop_pattern = re.compile(
        r'^(' + "|".join(map(re.escape, stop_sections)) + r')\b',
        re.IGNORECASE
    )

    for index, line in enumerate(lines):

        if heading_pattern.match(line):

            start_index = index + 1

            break

    if start_index is None:
        return []

    section = []

    for line in lines[start_index:]:

        line = line.strip()

        if not line:
            continue

        if stop_pattern.match(line):
            break

        section.append(line)

    return section