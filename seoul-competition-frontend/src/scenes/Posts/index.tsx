import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { searchActions } from "@features/search/searchSlice";
import { filterActions } from "@features/filter/filterSlice";

import Sidebar from "@components/Sidebar";
import FilterToggle from "@components/FilterToggle";
import ScrollButton from "@components/ScrollButton";
import PostList from "./PostList";
import CreateButton from "./CreateButton";

export default function Posts() {
  const dispatch = useAppDispatch();
  const isSidebar = useAppSelector((state) => state.sidebar.isSidebar);

  //! posts로 카테고리 선택 및 기존 골라보기 초기화
  useEffect(() => {
    dispatch(searchActions.chooseCategory({ searchCategory: "posts" }));
    dispatch(filterActions.resetParams());
  }, [dispatch]);

  return (
    <div className="w-full">
      {/* 자유게시판 fetch 결과 출력 */}
      <PostList />

      {/* 게시글 추가 버튼 */}
      <CreateButton />

      {/* 최상단 이동 버튼 */}
      <ScrollButton />

      {/* 사이드바 영역 */}
      <FilterToggle />
      {isSidebar && <Sidebar />}
    </div>
  );
}
