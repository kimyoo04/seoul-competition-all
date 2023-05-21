import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUpdateCommentOrReview } from "@type/commentOrReview";
import { TPostId } from "@type/posts";

export const updateComment = async (data: IUpdateCommentOrReview) => {
  try {
    const { id, ...putData } = data;
    await axios.put(`/comment/${id}`, { ...putData });

    return true;
  } catch (err) {
    return false;
  }
};

export const useUpdateComment = (postId: TPostId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
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
