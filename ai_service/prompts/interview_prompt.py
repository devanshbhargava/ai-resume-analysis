def build_interview_prompt(resume_text: str):

    return f"""
You are a Senior Software Engineer conducting a mock interview.

Based ONLY on the candidate's resume below, generate exactly 10 interview questions.

Rules:
- Return ONLY the questions.
- Do NOT add introductions.
- Do NOT explain anything.
- Do NOT provide answers.
- Do NOT provide difficulty.
- Do NOT use markdown headings.
- Number each question from 1 to 10.
- Keep one question per line.

Resume:

{resume_text}
"""