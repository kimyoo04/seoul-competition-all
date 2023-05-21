import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IPostForm } from "@type/posts";
import { useRouter } from "next/router";

// 게시글 Create
export const createPostDetail = async (newPost: IPostForm) => {
  const response = await axios.post(`/posts`, newPost);
  return response; // 성공하면 반환 데이터 없음
};

// useCreateMutation
export const useCreateMutation = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostDetail,
    onSuccess: async () => {
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

      router.push("/posts");
    },
    onError: (err) => {
      console.error(err);
    },
    onSettled: () => {
      console.log("완료");
    },
  });
};
