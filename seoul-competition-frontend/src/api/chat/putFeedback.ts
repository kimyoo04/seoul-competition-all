import axios from "@api/axiosInstance";
import { TFeedback } from "@type/chat";

export const putFeedback = async (id: number, feedback: TFeedback) => {
  try {
    await axios.put("/chat/feedback", { id, feedback });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
