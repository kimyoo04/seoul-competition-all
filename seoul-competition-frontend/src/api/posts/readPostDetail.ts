import axios from "@api/axiosInstance";
import { userFormActions } from "@features/userForm/userFormSlice";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@toolkit/hook";
import { IPostDetail } from "@type/postDetail";

export const readPostDetail = async (id: string) => {
  const response = await axios.get(`/posts/${id}`);
  return response.data;
};

export const useReadPostDetail = (id: string) => {
  const dispatch = useAppDispatch();

  return useQuery<IPostDetail>({
    queryKey: ["postDetail", id],
    queryFn: () => readPostDetail(id),
    onSettled: (data) => {
      // 쿠키 정보가 없을 경우 모달 표시
      if (data && data.user === false) {
        const timeout = setTimeout(() => {
          dispatch(userFormActions.show());
        }, 2000); //! 1분 60000
        return () => clearTimeout(timeout);
      }
    },
    refetchOnMount: "always", // 유저폼 활성화를 위해 설정
  });
};
