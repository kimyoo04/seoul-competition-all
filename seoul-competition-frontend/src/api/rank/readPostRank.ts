import { useQuery } from "@tanstack/react-query";
import axios from "@api/axiosInstance";
import { IRankPostUserData } from "@type/rank";

export const readPostRank = async () => {
  try {
    const response = await axios.get(`/posts/topFive/hits`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("readPostRank 오류:", error);
    return false;
  }
};

// 전체 자유게시판 최다 조회 게시글 Top5
export const useReadPostRank = () => {
  return useQuery<IRankPostUserData>({
    queryKey: ["posts", "topFive", "hits"],
    queryFn: () => readPostRank(),
  });
};
