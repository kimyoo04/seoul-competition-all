import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDeleteCommentOrReview } from "@type/commentOrReview";
import { TEducationId } from "@type/educations";

export const deleteReview = async (data: IDeleteCommentOrReview) => {
  try {
    await axios.delete(`/review/${data.id}`, {
      data: { password: data.password },
    });

    return true;
  } catch (err) {
    return false;
  }
};

export const useDeleteReview = (educationId: TEducationId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
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
