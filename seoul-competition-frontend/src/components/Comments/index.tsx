import { ICommentOrReview } from "@type/commentOrReview";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";

interface ICommentsProps {
  data: ICommentOrReview[];
}

// 댓글 영역 전체 컴포넌트
export default function Comments({ data }: ICommentsProps) {
  return (
    <div>
      {/* 댓글 입력 필드 */}
      <CommentInput />

      {/* 댓글 목록 */}
      <div className="overflow-hidden rounded-lg bg-gray_4">
        {data &&
          data.map((commentData, index) => (
            <CommentItem
              key={index + commentData.createdAt}
              data={commentData}
              index={index}
            />
          ))}
      </div>
    </div>
  );
}
