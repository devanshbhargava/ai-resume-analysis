import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const API = `${BASE_URL}/ai`;
const INTERVIEW_API = `${BASE_URL}/interview`;


export const reviewResume = async (resumeText) => {

    const response = await axios.post(

        `${API}/review`,

        {
            resumeText
        }

    );

    return response.data;

};
export const evaluateAnswer = async (
  question,
  answer
) => {
  const response = await axios.post(
    `${INTERVIEW_API}/evaluate-answer`,
    {
      question,
      answer,
    }
  );

  return response.data;
};
export const generateInterviewSummary = async (
    evaluations
) => {

    const response = await axios.post(

        `${INTERVIEW_API}/generate-summary`,

        {
            evaluations
        }

    );

    return response.data;

};


export const rewriteResume = async (resumeText) => {

    const response = await axios.post(

        `${API}/rewrite`,

        {
            resumeText
        }

    );

    return response.data;

};


export const interviewQuestions = async (resumeText) => {

    const response = await axios.post(

        `${API}/interview`,

        {
            resumeText
        }

    );

    return response.data;

};


export const careerSuggestions = async (resumeText) => {

    const response = await axios.post(
        `${API}/career`,
        {
            resumeText
        }
    );

    return response.data;
};


export const coverLetter = async (

    resumeText,

    jobDescription

) => {

    const response = await axios.post(

        `${API}/cover-letter`,

        {

            resumeText,

            jobDescription

        }

    );

    return response.data;

};


export const tailorResume = async (
  resumeText,
  jobDescription
) => {
  const response = await axios.post(
    `${API}/tailor-resume`,
    {
      resumeText,
      jobDescription,
    }
  );

  return response.data;
};