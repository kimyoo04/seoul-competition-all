import axios from "@api/axiosInstance";
import { userFormActions } from "@features/userForm/userFormSlice";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@toolkit/hook";
import { IEducationDetail } from "@type/educationDetail";

export const readEducationDetail = async (id: string) => {
  const response = await axios.get(`/educations/${id}`);
  return response.data;
};

export const useReadEductionDetail = (id: string) => {
  const dispatch = useAppDispatch();

  return useQuery<IEducationDetail>({
    queryKey: ["educationDetail", id],
    queryFn: () => readEducationDetail(id),
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
