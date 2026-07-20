import os
import logging
import json

from prompts.interview_evaluation_prompt import (
    build_interview_evaluation_prompt,
)
from prompts.interview_summary_prompt import (
    build_interview_summary_prompt,
)

import google.generativeai as genai

from dotenv import load_dotenv

from prompts.review_prompt import build_review_prompt
from prompts.rewrite_prompt import build_rewrite_prompt
from prompts.interview_prompt import build_interview_prompt
from prompts.career_prompt import build_career_prompt
from prompts.cover_letter_prompt import build_cover_letter_prompt
from prompts.tailor_prompt import build_tailor_prompt


# ---------------------------------------------------
# Logging Configuration
# ---------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(asctime)s | %(message)s"
)

logger = logging.getLogger(__name__)


# ---------------------------------------------------
# Load Environment Variables
# ---------------------------------------------------

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError(
        "GEMINI_API_KEY not found inside .env file."
    )


# ---------------------------------------------------
# Gemini Configuration
# ---------------------------------------------------

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel(
    model_name="gemini-2.5-flash"
)


# ---------------------------------------------------
# Generation Configuration
# ---------------------------------------------------

GENERATION_CONFIG = {
    "temperature": 0.4,
    "top_p": 0.95,
    "top_k": 32,
    "max_output_tokens": 4096,
}


# ---------------------------------------------------
# Shared Gemini Response Generator
# ---------------------------------------------------

def _generate_response(prompt: str) -> str:
    try:

        response = model.generate_content(
            prompt,
            generation_config=GENERATION_CONFIG
        )

        if not response:
            raise Exception("Empty response received from Gemini.")

        if not response.text:
            raise Exception("Gemini returned no text.")

        text = response.text.strip()

        logger.info("=" * 60)
        logger.info(f"Generated Characters: {len(text)}")
        logger.info("=" * 60)
        logger.info(text)
        logger.info("=" * 60)

        return text

    except Exception as e:
        logger.exception(e)
        return f"Error: {str(e)}"


# ---------------------------------------------------
# Resume Rewrite
# ---------------------------------------------------

def rewrite_resume(resume_text: str) -> str:
    """
    Rewrite resume professionally.
    """

    prompt = build_rewrite_prompt(
        resume_text
    )

    return _generate_response(
        prompt
    )


# ---------------------------------------------------
# Interview Questions
# ---------------------------------------------------

def generate_interview_questions(
    resume_text: str
) -> str:
    """
    Generate interview questions.
    """

    prompt = build_interview_prompt(
        resume_text
    )

    return _generate_response(
        prompt
    )
# ---------------------------------------------------
# Career Suggestions
# ---------------------------------------------------

def career_suggestions(resume_text: str) -> str:
    """
    Generate personalized career suggestions.
    """

    prompt = build_career_prompt(
        resume_text
    )

    return _generate_response(
        prompt
    )


# ---------------------------------------------------
# Cover Letter Generator
# ---------------------------------------------------

def generate_cover_letter(
    resume_text: str,
    job_description: str = ""
) -> str:
    """
    Generate a professional cover letter.
    """

    prompt = build_cover_letter_prompt(
        resume_text,
        job_description
    )

    return _generate_response(
        prompt
    )


# ---------------------------------------------------
# Resume Tailoring
# ---------------------------------------------------

def tailor_resume(
    resume_text: str,
    job_description: str
) -> str:
    """
    Tailor resume according to a job description.
    """

    prompt = build_tailor_prompt(
        resume_text,
        job_description
    )

    return _generate_response(
        prompt
    )


# ---------------------------------------------------
# Gemini Health Check
# ---------------------------------------------------

def gemini_health_check() -> dict:
    """
    Verify that Gemini is configured and responding.
    """

    try:

        response = model.generate_content(
            "Reply with only the word OK."
        )

        return {
            "success": True,
            "message": response.text.strip()
        }

    except Exception as e:

        logger.exception(e)

        return {
            "success": False,
            "message": str(e)
        }


# ---------------------------------------------------
# Model Information
# ---------------------------------------------------
def evaluate_answer(question, answer):

    prompt = build_interview_evaluation_prompt(
        question,
        answer,
    )

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    elif text.startswith("```"):
        text = text.replace("```", "").strip()

    return json.loads(text)
def generate_interview_summary(evaluations):

    prompt = build_interview_summary_prompt(
        evaluations
    )

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace(
            "```json",
            ""
        ).replace(
            "```",
            ""
        ).strip()

    elif text.startswith("```"):
        text = text.replace(
            "```",
            ""
        ).strip()

    return json.loads(text)

def get_model_name() -> str:
    """
    Return currently configured Gemini model.
    """

    return "gemini-2.5-flash"