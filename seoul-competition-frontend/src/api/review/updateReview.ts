import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUpdateCommentOrReview } from "@type/commentOrReview";
import { TEducationId } from "@type/educations";

export const updateReview = async (data: IUpdateCommentOrReview) => {
  try {
    const { id, ...putData } = data;
    await axios.put(`/review/${id}`, { ...putData });

    return true;
  } catch (err) {
    return false;
  }
};

export const useUpdateReview = (educationId: TEducationId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReview,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["educationDetail", educationId],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
