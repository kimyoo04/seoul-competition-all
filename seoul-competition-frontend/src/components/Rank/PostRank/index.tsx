import { useReadPostRank } from "@api/rank/readPostRank";
import PostRankList from "./PostRankList";
import RankNotFound from "../RankNotFound";
import RankServerError from "../RankServerError";
import RankLoading from "../RankLoading";

export default function PostRank() {
  const { data, isLoading, isError } = useReadPostRank();

  return (
    <div className="w-full">
      <h3 className="mb-4 text-center text-2xl font-bold">
        지난주에 가장 인기 있던 게시글이에요.
      </h3>

      <div className="col-center">
        <div className="col-center h-6 w-52 rounded-t-md bg-main_color/90 ">
          <span className="text-font_white">자유게시판</span>
        </div>
      </div>
      <section className="w-full rounded-2xl bg-main_color/5 p-4 shadow-md">
        {/* //! 자유게시판 최다조회 게시글 Top 5 */}
        {isLoading ? (
          <RankLoading />
        ) : isError ? (
          <RankServerError />
        ) : (
          data && (
            <>
              {data.data.length > 0 ? (
                <PostRankList data={data.data} />
              ) : (
                <RankNotFound />
              )}
            </>
          )
        )}
      </section>
    </div>
  );
}
