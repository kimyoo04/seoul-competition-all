import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { searchActions } from "@features/search/searchSlice";

import { motion } from "framer-motion";
import { fadeIn } from "@util/variants";

import SearchKeywordsItem from "./SearchKeywordsItem/SearchKeywordsItem";
import SearchKeywordsHeader from "./SearchKeywordsItem/SearchKeywordsHeader";

export default function SearchKeywordsModal() {
  const dispatch = useAppDispatch();
  const { keywords } = useAppSelector((state) => state.search);

  useEffect(() => {
    dispatch(searchActions.getAllKeywords());
  }, [dispatch]);

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed left-0 top-0 h-screen w-screen"
        onClick={() => dispatch(searchActions.onBlur())}
      ></div>

      {/* 최근 검색어 영역 */}
      <motion.section
        variants={fadeIn("down", "easeInOut", 0, 0.4, 20)}
        initial="hidden"
        animate="show"
        className="absolute top-[134px] z-10 h-60 w-72 overflow-scroll rounded-2xl border border-main_color bg-white shadow-md shadow-main_color/20"
      >
        {/* 헤더 회색 영역 */}
        <SearchKeywordsHeader />

        {/* 최근 검색어 리스트 */}
        <ul className="px-4">
          {/* 5개만 검색어 노출 */}
          {keywords.slice(0, 5).map((keyword, index) => (
            <SearchKeywordsItem
              key={index + keyword}
              keyword={keyword}
              index={index}
            />
          ))}
        </ul>
      </motion.section>
    </>

    //? 추후 연관 검색어 추천 넣기
  );
}
