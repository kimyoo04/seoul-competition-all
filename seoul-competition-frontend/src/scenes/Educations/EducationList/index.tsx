import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { useInView } from "react-intersection-observer";

import { IEducationData } from "@type/educations";

import SimilarEducationList from "@components/SimilarEducationList";
import SearchHeader from "@components/Search/SearchHeader";
import SearchMore from "@components/Search/SearchMore";
import SearchNotFound from "@components/Search/SearchNotFound";

import EducationItem from "@scenes/Educations/EducationItem";
import EducationListLoader from "./EducationListLoader";

import { useInfiniteEducations } from "@api/educations/readEducations";
import { filterActions } from "@features/filter/filterSlice";

export default function EducationList() {
  const dispatch = useAppDispatch();
  const searchCategory = useAppSelector((state) => state.search.category);
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);

  // page 단위로 educationdata GET 요청 및 캐싱
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteEducations();

  // ref가 연결된 태그의 확인 + 하단 페이지에 도달시 fetchNextPage 요청
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  // 필터링된 총 개수 dispatch
  useEffect(() => {
    if (data) {
      dispatch(
        filterActions.setTotalCounts({
          totalCounts: data?.pages[0].totalCounts || 0,
        })
      );
    }
  }, [data, dispatch]);

  return (
    <section className="col-center w-full gap-4">
      {status === "loading" ? (
        <EducationListLoader />
      ) : status === "error" ? (
        <>{error && <p>Error: {error.message}</p>}</>
      ) : data.pages[0].data.length !== 0 ? (
        <>
          {/* //! 검색결과가 유사한 게시물 먼저 출력 */}
          {searchKeyword !== "" && <SimilarEducationList />}

          {/* //! 검색 정보 헤더 */}
          <SearchHeader />

          {/* //! 교육정보 검색결과 무한 스크롤 영역 */}
          {searchCategory === "educations" && (
            <ul className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
              {data.pages.map((group, indx) => (
                <Fragment key={indx + "page" + searchCategory}>
                  {group.data.map((education) => (
                    <EducationItem
                      key={education.id + searchCategory}
                      education={education as IEducationData}
                    />
                  ))}
                </Fragment>
              ))}
            </ul>
          )}

          {/* //! fetchNextPage 를 트리거 하기 위한 태그 */}
          <SearchMore inViewRef={ref} hasNextPage={hasNextPage} />
        </>
      ) : (
        <SearchNotFound />
      )}
    </section>
  );
}
