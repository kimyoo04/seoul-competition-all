import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { searchActions } from "@features/search/searchSlice";
import { filterActions } from "@features/filter/filterSlice";

import Sidebar from "@components/Sidebar";
import FilterToggle from "@components/FilterToggle";
import ScrollButton from "@components/ScrollButton";
import EducationList from "./EducationList";

export default function Educations() {
  const dispatch = useAppDispatch();
  const isSidebar = useAppSelector((state) => state.sidebar.isSidebar);

  //! educations로 카테고리 선택 및 기존 골라보기 초기화
  useEffect(() => {
    dispatch(searchActions.chooseCategory({ searchCategory: "educations" }));
    dispatch(filterActions.resetParams());
  }, [dispatch]);

  return (
    <div className="w-full">
      {/* 교육 정보 fetch 결과 출력 */}
      <EducationList />

      {/* 최상단 이동 버튼 */}
      <ScrollButton />

      {/* 사이드바 영역 */}
      <FilterToggle />
      {isSidebar && <Sidebar />}
    </div>
  );
}
