import axios from "@api/axiosInstance";
import { IMatchCheckPostDetail } from "@type/posts";

export const matchCheckPostDetail = async (data: IMatchCheckPostDetail) => {
  try {
    await axios.post(`/posts/${data.id}/matchCheck`, {
      password: data.password,
    });
    return true;
  } catch (err) {
    return false;
  }
};
