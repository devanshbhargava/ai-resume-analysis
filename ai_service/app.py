from flask import Flask ,request, jsonify
from flask_cors import CORS
from resume_analyzer import analyze_resume_text
from comparison_service import compare_resumes
from geminie_service import (
    evaluate_answer,
    generate_interview_summary
)
from geminie_service import (
    review_resume,
    rewrite_resume,
    generate_interview_questions,
    career_suggestions,
    generate_cover_letter,
    tailor_resume,
    gemini_health_check
)


app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return {
        "success": True,
        "message": "AI Resume Analyzer Service Running"
    }
@app.route("/health", methods=["GET"])
def health():

    result = gemini_health_check()

    return jsonify(result)


# ==========================================================
# Review Resume
# ==========================================================

@app.route("/review-resume", methods=["POST"])
def review():

    try:

        data = request.get_json()

        resume_text = data.get("resumeText", "")

        if not resume_text:

            return jsonify({

                "success": False,

                "message": "Resume text is required."

            }), 400

        review = review_resume(resume_text)

        return jsonify({

            "success": True,

            "review": review

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


# ==========================================================
# Rewrite Resume
# ==========================================================

@app.route("/rewrite-resume", methods=["POST"])
def rewrite():

    try:

        data = request.get_json()

        resume_text = data.get("resumeText", "")

        if not resume_text:

            return jsonify({

                "success": False,

                "message": "Resume text is required."

            }), 400

        rewritten = rewrite_resume(resume_text)

        return jsonify({

            "success": True,

            "rewritten_resume": rewritten

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


# ==========================================================
# Interview Questions
# ==========================================================

@app.route("/interview-questions", methods=["POST"])
def interview():

    try:

        data = request.get_json()

        resume_text = data.get("resumeText", "")

        if not resume_text:

            return jsonify({

                "success": False,

                "message": "Resume text is required."

            }), 400

        questions = generate_interview_questions(resume_text)

        return jsonify({

            "success": True,

            "questions": questions

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


# ==========================================================
# Career Suggestions
# ==========================================================

@app.route("/career-suggestions", methods=["POST"])
def career():

    try:

        data = request.get_json()

        resume_text = data.get("resumeText", "")

        if not resume_text:

            return jsonify({

                "success": False,

                "message": "Resume text is required."

            }), 400

        suggestions = career_suggestions(resume_text)

        return jsonify({

            "success": True,

            "career_suggestions": suggestions

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


# ==========================================================
# Cover Letter
# ==========================================================

@app.route("/cover-letter", methods=["POST"])
def cover_letter():

    try:

        data = request.get_json()

        resume_text = data.get("resumeText", "")

        job_description = data.get("jobDescription", "")

        if not resume_text:

            return jsonify({

                "success": False,

                "message": "Resume text is required."

            }), 400

        letter = generate_cover_letter(

            resume_text,

            job_description

        )

        return jsonify({

            "success": True,

            "cover_letter": letter

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500



@app.route("/tailor-resume", methods=["POST"])
def tailor():

    try:

        data = request.get_json()

        resume_text = data.get("resumeText", "")

        job_description = data.get("jobDescription", "")

        if not resume_text:

            return jsonify({

                "success": False,

                "message": "Resume text is required."

            }), 400

        if not job_description:

            return jsonify({

                "success": False,

                "message": "Job Description is required."

            }), 400

        optimized = tailor_resume(

            resume_text,

            job_description

        )

        return jsonify({

            "success": True,

            "tailored_resume": optimized

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


@app.route("/analyze", methods=["POST"])
def analyze_resume():

    try:

        data = request.get_json()

        resume_text = data.get("resumeText", "")
        job_description = data.get("jobDescription", "")

        if not resume_text:
            return jsonify({
                "success": False,
                "message": "Resume text is required."
            }), 400

        # ATS Analysis
        ats_result = analyze_resume_text(
            resume_text,
            job_description
        )

        # Gemini Review
        ai_review = review_resume(resume_text)

        analysis = {

            # Parsed Resume
            "resume": ats_result.get("resume", {}),

            # ATS Analysis
            "ats": ats_result.get("ats", {}),

            # Gemini AI
            "ai_review": ai_review,

            # Raw Text
            "resume_text": resume_text,

            # JD
            "job_description": job_description

        }



        return jsonify({

            "success": True,

            "analysis": analysis

        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
@app.route("/compare-resumes", methods=["POST"])
def compare():

    try:

        data = request.get_json()

        resume_text_1 = data.get("resumeText1", "")
        resume_text_2 = data.get("resumeText2", "")
        job_description = data.get("jobDescription", "")

        if not resume_text_1 or not resume_text_2:

            return jsonify({

                "success": False,

                "message": "Both resume texts are required."

            }), 400

        result = compare_resumes(

            resume_text_1,

            resume_text_2,

            job_description

        )

        return jsonify({

            "success": True,

            "comparison": result

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500
@app.route("/evaluate-answer", methods=["POST"])
def evaluate_interview_answer():

    data = request.get_json()

    question = data.get("question")

    answer = data.get("answer")

    if not question or not answer:

        return jsonify({

            "success": False,

            "message": "Question and answer are required."

        }), 400

    try:

        result = evaluate_answer(
            question,
            answer
        )

        return jsonify({

            "success": True,

            "evaluation": result

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500    
# ==========================================================
# Final Interview Summary
# ==========================================================

@app.route("/interview-summary", methods=["POST"])
def interview_summary():

    try:

        data = request.get_json()

        evaluations = data.get("evaluations", [])

        if len(evaluations) == 0:

            return jsonify({

                "success": False,

                "message": "Interview evaluations are required."

            }), 400

        summary = generate_interview_summary(
            evaluations
        )

        return jsonify({

            "success": True,

            "summary": summary

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500

    

if __name__ == "__main__":
    app.run(debug=True, port=5001)