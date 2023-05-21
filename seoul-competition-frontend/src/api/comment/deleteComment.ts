import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDeleteCommentOrReview } from "@type/commentOrReview";
import { TPostId } from "@type/posts";

export const deleteComment = async (data: IDeleteCommentOrReview) => {
  try {
    await axios.delete(`/comment/${data.id}`, {
      data: { password: data.password },
    });

    return true;
  } catch (err) {
    return false;
  }
};

export const useDeleteComment = (postId: TPostId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["postDetail", postId],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
