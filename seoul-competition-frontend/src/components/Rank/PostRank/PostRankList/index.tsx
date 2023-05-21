import PostRankItem from "../PostRankItem";
import { IRankPostData } from "@type/rank";

export default function PostRankList({ data }: { data: IRankPostData[] }) {
  // 데이터 user 정보 받아서 변수에 할당 ->

  return (
    <div className="col-center w-full gap-4">
      <ul className="grid w-full grid-cols-1">
        {data.map((post) => (
          <PostRankItem key={post.id} post={post as IRankPostData} />
        ))}
      </ul>
    </div>
  );
}
