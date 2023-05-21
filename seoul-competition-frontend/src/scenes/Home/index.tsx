import { contents } from "@constants/home/contents";
import ContentItem from "./ContentItem";

import PostRank from "@components/Rank/PostRank";
import EducationRank from "@components/Rank/EducationRank";
import KeywordRank from "@components/Rank/KewordRank";

export default function Home() {
  return (
    <div className="col-center w-full gap-8 pb-16">
      <div>
        {/* Home 메시지 */}
        <h2 className="pb-4 text-2xl font-bold">
          오늘은 무엇을 하고 싶으신가요?
        </h2>
      </div>

      {/* //! 콘텐츠 리스트 */}
      <div className="col-center w-full max-w-7xl gap-4 md:flex-row md:justify-between md:gap-8 lg:gap-12">
        {contents &&
          contents.map((content, index) => (
            <ContentItem key={index + content.title} data={content} />
          ))}
      </div>

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
