import axios from "@api/axiosInstance";
import { TQuestion } from "@type/chat";

export const sendQuestion = async (question: TQuestion) => {
  try {
    const response = await axios.post("/chat/question", { question });
    return response.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
