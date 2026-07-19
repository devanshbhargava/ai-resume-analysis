from resume_analyzer import analyze_resume_text


def compare_resumes(
    resume_text_1,
    resume_text_2,
    job_description=""
):
    """
    Compare two resumes using the existing ATS engine.
    """

    # Analyze Resume 1
    result1 = analyze_resume_text(
        resume_text_1,
        job_description
    )

    # Analyze Resume 2
    result2 = analyze_resume_text(
        resume_text_2,
        job_description
    )

    ats1 = result1["ats"]
    ats2 = result2["ats"]

    score1 = ats1.get("ats_score", 0)
    score2 = ats2.get("ats_score", 0)

    weighted1 = ats1.get("weighted_ats_score", 0)
    weighted2 = ats2.get("weighted_ats_score", 0)

    matched1 = len(ats1.get("matched_skills", []))
    matched2 = len(ats2.get("matched_skills", []))

    missing1 = len(ats1.get("missing_skills", []))
    missing2 = len(ats2.get("missing_skills", []))

    completeness1 = ats1.get("resume_completeness", 0)
    completeness2 = ats2.get("resume_completeness", 0)

    # Winner Calculation
    resume1_points = 0
    resume2_points = 0

    if score1 > score2:
        resume1_points += 1
    elif score2 > score1:
        resume2_points += 1

    if weighted1 > weighted2:
        resume1_points += 1
    elif weighted2 > weighted1:
        resume2_points += 1

    if matched1 > matched2:
        resume1_points += 1
    elif matched2 > matched1:
        resume2_points += 1

    if missing1 < missing2:
        resume1_points += 1
    elif missing2 < missing1:
        resume2_points += 1

    if completeness1 > completeness2:
        resume1_points += 1
    elif completeness2 > completeness1:
        resume2_points += 1

    if resume1_points > resume2_points:
        winner = "Resume 1"
    elif resume2_points > resume1_points:
        winner = "Resume 2"
    else:
        winner = "Tie"

    return {

        "resume1": result1,

        "resume2": result2,

        "comparison": {

            "winner": winner,

            "resume1_points": resume1_points,

            "resume2_points": resume2_points,

            "score_difference": abs(score1 - score2),

            "summary": {
                "resume1": {
                    "ats_score": score1,
                    "weighted_ats_score": weighted1,
                    "resume_grade": ats1.get("resume_grade"),
                    "resume_completeness": completeness1,
                    "matched_skills": matched1,
                    "missing_skills": missing1,
                    "recommendation": ats1.get(
                        "recruiter_recommendation"
                    )
                },
                "resume2": {
                    "ats_score": score2,
                    "weighted_ats_score": weighted2,
                    "resume_grade": ats2.get("resume_grade"),
                    "resume_completeness": completeness2,
                    "matched_skills": matched2,
                    "missing_skills": missing2,
                    "recommendation": ats2.get(
                        "recruiter_recommendation"
                    )
                }
            }

        }

    }