import SearchKeywordRank from "@components/Rank/SearchKeywordRank";
import { useAppSelector } from "@toolkit/hook";
import { motion } from "framer-motion";
import SearchGuide from "./SearchGuide";

export default function SearchNotFound() {
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);
  const searchCategory = useAppSelector((state) => state.search.category);

  return (
    <>
      {/* //! 0개의 검색결과를 얻었을 때 활성화 됨 */}
      <div className="col-center gap-8">
        {searchKeyword !== "" && (
          <h2 className="text-xl">
            &quot;<b className="text-2xl font-bold">{searchKeyword}</b>&quot; 의
            검색결과가 없습니다.
          </h2>
        )}

        {/* //! 저번주 top5 검색어 전달 */}
        <SearchGuide />

        {/* //! 검색어 5개 리스트 */}
        {searchCategory === "educations" && <SearchKeywordRank />}
      </div>

      {/* //! 골라보기 버튼 강조 */}
      <motion.div
        animate={{
          x: [-6, 6, -6], // 좌우 이동 애니메이션
        }}
        transition={{
          repeat: Infinity, // 애니메이션 무한반복
          duration: 1, // 1초 동안 애니메이션 진행
          ease: "linear", // 선형적인 애니메이션
        }}
        className="row-center fixed bottom-48 right-16 pl-3"
      >
        <span className="font-bold">다시 검색</span>
        <i className="ri-arrow-right-s-line text-4xl"></i>
      </motion.div>
    </>
  );
}
