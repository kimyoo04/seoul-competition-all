import PostRank from "@components/Rank/PostRank";
import EducationRank from "@components/Rank/EducationRank";
import KeywordRank from "@components/Rank/KewordRank";
import Contents from "./Contents";

export default function Home() {
  return (
    <div className="col-center w-full gap-16 py-12">
      {/* //! 3가지 콘텐츠 소개 */}
      <Contents />

      {/* //! 인기 게시물, 교육 정보, 키워드 */}
      <div className="flex w-full max-w-7xl flex-col gap-8 lg:flex-row">
        <div className="flex flex-col justify-between gap-8 lg:w-1/2">
          {/* 자유게시판 최다조회 게시글 Top5 */}
          <PostRank />

          {/* 교육정보 최다조회 게시글 Top5 */}
          <EducationRank />
        </div>

        {/* 교육정보 최다 검색 키워드 Top5 */}
        <KeywordRank />
      </div>
    </div>
  );
}
