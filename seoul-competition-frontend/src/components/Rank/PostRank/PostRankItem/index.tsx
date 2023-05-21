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
          <div className="text-sm">{cutTitle}</div>

          {/* 조회수와 댓글수 */}
          <div className=" text-xs text-gray-500">
            조회 {post.hits} · 댓글 {post.commentsCount}
          </div>
        </div>
      </div>
    </Link>
  );
}
