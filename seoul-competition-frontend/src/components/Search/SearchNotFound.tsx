import { useAppSelector } from "@toolkit/hook";
import { motion } from "framer-motion";

export default function SearchNotFound() {
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);

  return (
    <>
      {/* //! 0개의 검색결과를 얻었을 때 활성화 됨 */}
      <div className="col-center w-full gap-8">
        {searchKeyword !== "" && (
          <h2 className="text-xl">
            &quot;<b className="text-2xl font-bold">{searchKeyword}</b>&quot; 의
            검색결과가 없습니다.
          </h2>
        )}

        {/* //! 저번주 top5 검색어 전달 */}
        <div className="col-center gap-4">
          <h2 className="text-xl font-bold text-main_color">검색 방법</h2>

          <div className="col-start gap-1">
            <span>1. 검색어의 띄어쓰기를 확인해보세요.</span>
            <span>2. 검색어의 철자가 정확한지 확인해보세요.</span>
            <span>3. 검색어의 단어 수를 줄여보세요.</span>
            <span>4. 검색을 취소하려면 초기화 버튼을 눌러주세요.</span>
          </div>
        </div>

        {/* //! 저번주 top5 검색어 전달 */}
        <div>
          <h2 className="text-xl font-bold text-main_color">
            이런 검색어는 어떠신가요?
          </h2>

          {/* //! 검색어 5개 리스트 */}
        </div>
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
