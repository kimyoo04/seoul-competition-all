import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@toolkit/hook";
import { IRankKeywordsUserData } from "@type/rank";
import { TAge } from "@type/userForm";

export const readKeywordAgeRank = async (age: TAge | "") => {
  const params: { ages?: TAge } = {};

  //! age로 사용되던 값이 쿼리 파람에만 ages로 요청을 보냄
  if (age !== "") params.ages = age; // 연령대가 있을 경우 params에 추가

  try {
    const response = await axios.get("/user/topFive/keyword", { params });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("readKeywordAgeRank 오류:", error);
    return false;
  }
};

// 전체 혹은 연령대별 교육 정보 최다 검색 키워드 Top5
export const useReadKeywordAgeRank = () => {
  const age = useAppSelector((state) => state.age.selectedAge);

  return useQuery<IRankKeywordsUserData>({
    queryKey: ["user", "topFive", "keyword", age],
    queryFn: () => readKeywordAgeRank(age),
  });
};
