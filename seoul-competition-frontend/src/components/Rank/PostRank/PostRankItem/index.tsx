import { IRankPostData } from "@type/rank";
import Link from "next/link";

export default function PostRankItem({ post }: { post: IRankPostData }) {
  const cutTitle =
    post.title.length > 15 ? post.title.slice(0, 15) + "..." : post.title;
  return (
    <Link href={`/posts/${post.id}`}>
      <div className=" border-b">
        <div className="my-1 flex justify-between">
          {/* 제목 */}
          <div className="">
            <span>{cutTitle}</span>
          </div>

          {/* 조회수와 댓글수 */}
          <div className="row-center gap-2 text-[14px] text-gray-500">
            <div className="flex w-12 items-center justify-start gap-1">
              <i className="ri-eye-fill text-gray_2"></i>
              <span className="text-gray_2">{post.hits}회</span>
            </div>
            <div className="flex w-12 items-center justify-start gap-1">
              <i className="ri-chat-1-fill text-gray_2"></i>
              <span className="text-gray_2">{post.commentsCount}개</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
