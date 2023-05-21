import { IPostDetail } from "@type/postDetail";
import UpDelButtons from "./UpDelButtons";
import { timeYmd } from "@util/dateTime";

interface IHeaderProps {
  data: IPostDetail;
}

export default function Header({ data }: IHeaderProps) {
  return (
    <div>
      {/* 게시글 제목 -- 수정, 삭제 버튼 */}
      <div className="mb-2 flex flex-wrap justify-between">
        <h2 className="text-2xl font-bold">{data.title}</h2>

        <UpDelButtons id={data.id} />
      </div>

      {/* 작성자, 작성일, 조회수 */}
      <div className="mb-8 text-sm text-gray_2">
        <span>{data.nickname}</span>
        <span className="mx-2">|</span>
        <span>{timeYmd(data.createdAt)}</span>
        <span className="mx-2">|</span>
        <span>조회수: {data.hits}</span>
      </div>
    </div>
  );
}
