import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { sidebarActions } from "@features/sidebar/sidebarSlice";

import ButtonWrapper from "@components/Animation/ButtonWrapper";
import SidebarPortal from "./SidebarPortal";

import SearchCategory from "@components/Sidebar/SearchCategory";
import SearchBar from "./SearchBar";
import SearchKeywordsModal from "./SearchKeywordsModal";
import StatusFilter from "./StatusFilter";
import PriceFilter from "./PriceFilter";
import CalendarFilter from "./CalendarFilter";
import ShowTotalCounts from "./ShowTotalCounts";
import { filterActions } from "@features/filter/filterSlice";
import { searchActions } from "@features/search/searchSlice";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const isSidebar = useAppSelector((state) => state.sidebar.isSidebar);
  const { isFocus, category } = useAppSelector((state) => state.search);

  return (
    <>
      {/* 회색 오버레이 div가 isSidebar에 토글 */}
      {isSidebar && (
        <div
          key="backdrop"
          className="fixed left-0 top-0 z-40 h-screen w-screen bg-black/60"
          onClick={() => dispatch(sidebarActions.toggleSidebar())}
        ></div>
      )}

      {/* 사이드바가 isSidebar에 토클 */}
      {isSidebar && (
        <motion.div
          key="sidebar"
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{ duration: 0.2 }}
          className="relative right-0 z-40 flex h-screen w-80 flex-col items-center gap-12 bg-main_color p-4 shadow-lg shadow-black/70"
        >
          {/* 카테고리 노출 */}
          <SearchCategory />

          {/* 검색바 */}
          <SearchBar />

          {/* 검색기록모달창 오버레이*/}
          {isFocus && <SearchKeywordsModal />}

          {/* 교육정보의 기간 범위 필터링 */}
          <CalendarFilter />

          {category === "educations" && (
            <>
              {/* 교육정보의 상태별 필터링 */}
              <StatusFilter />

              {/* 가격 범위 필터링 */}
              <PriceFilter />
            </>
          )}

          {/* 검색된 총 개수 출력 */}
          <ShowTotalCounts />

          <div className="flex w-full items-center justify-between">
            {/* 초기화 버튼 */}
            <button
              onClick={() => {
                dispatch(filterActions.resetParams());
                dispatch(searchActions.resetKeyword());
              }}
            >
              <ButtonWrapper>
                <div className="row-center h-10 gap-2 rounded-full border border-sub_color px-3">
                  <i className="ri-restart-line text-2xl text-font_white" />
                  <span className="text-xl font-medium text-font_white">
                    초기화
                  </span>
                </div>
              </ButtonWrapper>
            </button>

            {/* 닫기 버튼 */}
            <button onClick={() => dispatch(sidebarActions.toggleSidebar())}>
              <ButtonWrapper>
                <div className="row-center h-10 gap-1 rounded-full border border-sub_color px-3">
                  <i className="ri-close-fill text-3xl text-font_white" />
                  <span className="text-xl font-medium text-font_white">
                    닫기
                  </span>
                </div>
              </ButtonWrapper>
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SidebarPortal(SideBar);
