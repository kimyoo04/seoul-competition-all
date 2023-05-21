import axios from "@api/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppSelector } from "@toolkit/hook";
import {
  IEducationsDataPerPage,
  IEducationsQueryParams,
} from "@type/educations";
import { TDate, TPrice, TStatus } from "@type/filter";
import { TSearchCategory } from "@type/search";
import { AxiosError } from "axios";

//! axios GET 요청 함수
export const fetchEducations = async (
  searchCategory: TSearchCategory,
  page: number,
  name: string,
  status: TStatus,
  startDate: TDate,
  endDate: TDate,
  minPrice: TPrice,
  maxPrice: TPrice
) => {
  const params: IEducationsQueryParams = { page };

  //! 쿼리 파람 추가
  if (name !== "") params.name = name;
  if (status !== "전체") params.status = status;
  if (startDate !== "") params.startDate = startDate;
  if (endDate !== "") params.endDate = endDate;
  if (minPrice !== "0") params.minPrice = minPrice;
  if (maxPrice !== "100000") params.maxPrice = maxPrice;

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
export const useInfiniteEducations = () => {
  const searchCategory = "educations";

  //! search state와 filter state 값 받아오기
  const { searchKeyword } = useAppSelector((state) => state.search);
  const { status, startDate, endDate, minPrice, maxPrice } = useAppSelector(
    (state) => state.filter
  );

  //! react-query hook 반환
  return useInfiniteQuery<IEducationsDataPerPage, AxiosError>({
    queryKey: [
      {
        category: searchCategory,
        keyword: searchKeyword,
        status: status,
        startDate: startDate,
        endDate: endDate,
        minPrice: minPrice,
        maxPrice: maxPrice,
      },
    ],
    queryFn: ({ pageParam = 0 }) =>
      fetchEducations(
        searchCategory,
        pageParam,
        searchKeyword,
        status,
        startDate,
        endDate,
        minPrice,
        maxPrice
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      } else {
        return undefined;
      }
    },
    cacheTime: 300000, // 5분
    staleTime: 240000, // 4분
    refetchOnMount: true, //페이지 재방문시 refetch 금지
    refetchOnWindowFocus: false, // 브라우저 포커징시 refetch 금지
  });
};
