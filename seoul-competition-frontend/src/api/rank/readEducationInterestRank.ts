import { useQuery } from "@tanstack/react-query";
import axios from "@api/axiosInstance";
import { IRankEducationUserData } from "@type/rank";
import { TInterest } from "@type/userForm";
import { useAppSelector } from "@toolkit/hook";

export const readEducationInterestRank = async (interest: TInterest | "") => {
  const params: { interest?: TInterest } = {};
  if (interest !== "") params.interest = interest;

  try {
    const response = await axios.get(`/educations/topFive/hits`, {
      params,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("readEducationInterestRank 오류:", error);
    return false;
  }
};

// 전체 혹은 관심사별 교육 정보 최다 조회 게시글 Top5
export const useReadEducationInterestRank = () => {
  const interest = useAppSelector((state) => state.interest.selectedInterest);

  return useQuery<IRankEducationUserData>({
    queryKey: ["educations", "topFive", "hits", interest],
    queryFn: () => readEducationInterestRank(interest),
  });
};
