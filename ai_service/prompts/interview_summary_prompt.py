def build_interview_summary_prompt(evaluations):

    return f"""
You are an experienced technical interviewer.

Based on the following interview evaluations, write a professional interview summary.

Interview Evaluations:
{evaluations}

Generate ONLY valid JSON in the following format.

{{
    "overall_summary": "...",
    "technical_analysis": "...",
    "communication_analysis": "...",
    "confidence_analysis": "..."
}}

Do not return markdown.
Do not use ```json.
Return only valid JSON.
"""