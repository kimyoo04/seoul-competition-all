import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import axios from "@api/axiosInstance";

import { IEducationData, TEducationId } from "@type/educations";

export const readSimilarEducationsById = async (educationId: TEducationId) => {
  try {
    const { data } = await axios.get("/educations/similar", {
      params: { educationId },
    });
    return data.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const useReadSimilarEducationsById = (educationId: TEducationId) => {
  return useQuery<IEducationData[], AxiosError>({
    queryKey: ["readSimilarEducationsById", educationId],
    queryFn: () => readSimilarEducationsById(educationId),
  });
};
