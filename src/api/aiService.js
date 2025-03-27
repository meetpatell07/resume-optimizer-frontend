import axios from "axios";

const API_URL = process.env.API_URL;

export const generateJobContent = async (jobData) => {
  try {
    const response = await axios.post(API_URL, jobData);
    return response.data;
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
};
