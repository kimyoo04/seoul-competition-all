import axios from "@api/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@toolkit/hook";
import { TDate } from "@type/filter";
import { IPostsDataPerPage, IPostsQueryParams } from "@type/posts";
import { TSearchCategory } from "@type/search";
import { AxiosError } from "axios";

//! axios GET 요청 함수
export const readPosts = async (
  searchCategory: TSearchCategory,
  page: number,
  name: string,
  startDate: TDate,
  endDate: TDate
) => {
  const params: IPostsQueryParams = { page };

  //! 쿼리 파람 추가
  if (name !== "") params.name = name;
  if (startDate !== "") params.startDate = startDate;
  if (endDate !== "") params.endDate = endDate;

  //! 요청 받기
  try {
    const response = await axios.get(`/${searchCategory}`, {
      params,
    });

    return response.data;
  } catch (err) {
    return { data: [], currentPage: 0, totalPages: 0, totalElements: 0 };
  }
};

//! 검색 결과 useInfiniteQuery 함수
export const useInfinitePosts = () => {
  const searchCategory = "posts";

  //! search state와 filter state 값 받아오기
  const { searchKeyword } = useAppSelector((state) => state.search);
  const { startDate, endDate } = useAppSelector((state) => state.filter);

  //! react-query hook 반환
  return useInfiniteQuery<IPostsDataPerPage, AxiosError>({
    queryKey: [
      {
        category: searchCategory,
        keyword: searchKeyword,
        startDate: startDate,
        endDate: endDate,
      },
    ],
    queryFn: ({ pageParam = 0 }) =>
      readPosts(searchCategory, pageParam, searchKeyword, startDate, endDate),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      } else {
        return undefined;
      }
    },
    cacheTime: 300000, // 5분
    staleTime: 240000, // 4분
    refetchOnMount: true, //페이지 재방문시 refetch 적용
    refetchOnWindowFocus: false, // 브라우저 포커징시 refetch 금지
  });
};
