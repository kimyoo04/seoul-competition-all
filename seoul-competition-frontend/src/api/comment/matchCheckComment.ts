import axios from "@api/axiosInstance";
import { IMatchCheckCommentOrReview } from "@type/commentOrReview";

export const matchCheckComment = async (data: IMatchCheckCommentOrReview) => {
  try {
    await axios.post(`/comment/${data.id}/matchCheck`, {
      password: data.password,
    });

    return true;
  } catch (err) {
    return false;
  }
};
