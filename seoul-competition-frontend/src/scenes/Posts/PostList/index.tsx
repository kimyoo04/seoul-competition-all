import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { useInView } from "react-intersection-observer";

import { IPostData } from "@type/posts";

import SearchHeader from "@components/Search/SearchHeader";
import SearchMore from "@components/Search/SearchMore";

import PostItem from "@scenes/Posts/PostItem";
import PostListLoader from "./PostListLoader";

import { useInfinitePosts } from "@api/posts/readPosts";
import { filterActions } from "@features/filter/filterSlice";
import SearchNotFound from "@components/Search/SearchNotFound";

export default function PostList() {
  const dispatch = useAppDispatch();
  const searchCategory = useAppSelector((state) => state.search.category);

  // page 단위로 educationdata GET 요청 및 캐싱
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfinitePosts();

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
        <PostListLoader />
      ) : status === "error" ? (
        <>{error && <p>Error: {error.message}</p>}</>
      ) : data.pages[0].data.length !== 0 ? (
        <>
          {/* //! 검색 정보 헤더 */}
          <SearchHeader />

          {/* //! 자유게시판 검색결과 무한 스크롤 영역 */}
          <ul className="grid w-full grid-cols-1 gap-4">
            {searchCategory === "posts" && data && (
              <>
                {data.pages.map((group, indx) => (
                  <Fragment key={indx + "page" + searchCategory}>
                    {group.data.map((post) => (
                      <PostItem
                        key={post.id + searchCategory}
                        post={post as IPostData}
                      />
                    ))}
                  </Fragment>
                ))}
              </>
            )}
          </ul>

          {/* //! fetchNextPage 를 트리거 하기 위한 태그 */}
          <SearchMore inViewRef={ref} hasNextPage={hasNextPage} />
        </>
      ) : (
        <SearchNotFound />
      )}
    </section>
  );
}
