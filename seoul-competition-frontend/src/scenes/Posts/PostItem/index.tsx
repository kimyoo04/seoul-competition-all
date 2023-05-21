import { IPostData } from "@type/posts";
import { timeYmd } from "@util/dateTime";
import { truncateString } from "@util/truncateString";
import Link from "next/link";

export default function PostItem({ post }: { post: IPostData }) {
  return (
    // postDetail로 링크
    <Link
      href={`/posts/${post.id}`}
      className="flex w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-md"
    >
      {/* 작성자명과 작성일자 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm text-gray-500">{post.nickname}</div>
      </div>

      {/* 제목과 내용 */}
      <div>

        <div className="mb-2 text-lg">{post.title}</div>
        <div className="text-gray-800">{post.content}</div>

        <div className="mb-2 text-lg font-bold">{post.title}</div>
        <div className="overflow-hidden text-gray-800">
          {truncateString(post.content, 40)}
        </div>

      </div>

      {/* 조회와 댓글 */}
      <div className="mt-4 flex justify-between">
        <div className="text-sm text-gray-500">
          조회 {post.hits} · 댓글 {post.commentsCount}
        </div>
        <div className="text-sm text-gray-500">{timeYmd(post.createdAt)}</div>
      </div>
    </Link>
  );
}
