import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUpdatePostCheck, IUpdatePostForm } from "@type/posts";
import { useRouter } from "next/router";

// 게시글 Update

export const updatePostDetail = async (updatedPost: IUpdatePostForm) => {
  const response = await axios.put(`/posts/${updatedPost.postId}`, updatedPost);
  return response;
};

// 게시글 Update Password Check
export const updatePostPwd = async (postIdPwd: IUpdatePostCheck) => {
  try {
    await axios.post(`/posts/${postIdPwd.postId}/matchCheck`, {
      password: postIdPwd.password,
    });
    return true;
  } catch (err) {
    return false;
  }
};

// useUpdatePostMutation
export const useUpdatePostMutation = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePostDetail,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["postDetail", variables.postId],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          {
            category: "posts",
            keyword: "",
            startDate: "",
            endDate: "",
          },
        ],
      });

      router.push(`/posts/${variables.postId}`);
    },
    onError: (err) => {
      console.error(err);
    },
    onSettled: () => {
      console.log("완료");
    },
  });
};
