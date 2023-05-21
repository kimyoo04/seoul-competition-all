import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import axios from "@api/axiosInstance";

import { IEducationData } from "@type/educations";
import { TSearchKeyword } from "@type/search";

export const readSimilarEducationsByKeyword = async (
  keyword: TSearchKeyword
) => {
  try {
    const { data } = await axios.get("/educations/similar", {
      params: { keyword },
    });
    return data.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const useReadSimilarEducationsByKeyword = (keyword: TSearchKeyword) => {
  return useQuery<IEducationData[], AxiosError>({
    queryKey: ["readSimilarEducationsByKeyword", keyword],
    queryFn: () => readSimilarEducationsByKeyword(keyword),
  });
};
