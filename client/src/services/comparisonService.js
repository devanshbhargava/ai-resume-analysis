import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/comparison`;

export const compareResumes = async (

    resume1,
    resume2,
    jobDescription

) => {

    const formData = new FormData();

    formData.append("resume1", resume1);

    formData.append("resume2", resume2);

    formData.append(
        "jobDescription",
        jobDescription
    );

    const response = await axios.post(

        API,

        formData,

        {

            headers: {

                "Content-Type":
                    "multipart/form-data"

            }

        }

    );

    return response.data;

};