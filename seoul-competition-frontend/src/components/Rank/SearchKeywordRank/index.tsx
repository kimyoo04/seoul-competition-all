import RankLoading from "../RankLoading";
import RankNotFound from "../RankNotFound";
import RankServerError from "../RankServerError";
import SearchKeywordRankList from "./SearchKeywordRankList";
import { useReadKeywordAgeRank } from "@api/rank/readKeywordAgeRank";

export default function SearchKeywordRank() {
  const { data, isLoading, isError } = useReadKeywordAgeRank();

  return (
    <div className="col-center gap-4">
      <h2 className="text-xl font-bold text-main_color">
        이런 검색어는 어떠신가요?
      </h2>
      <div className="mb-8 w-full rounded-2xl bg-main_color/5 p-4 shadow-md">
        {/* 교육정보 최다 검색 키워드 Top5 */}
        {isLoading ? (
          <RankLoading />
        ) : isError ? (
          <RankServerError />
        ) : (
          data && (
            <>
              {data.data.length > 0 ? (
                <SearchKeywordRankList dataArr={data.data} />
              ) : (
                <RankNotFound />
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}
