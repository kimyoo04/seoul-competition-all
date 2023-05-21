import { IRankKeywordData } from "@type/rank";
import SearchKeywordRankItem from "../SearchKeywordRankItem";

export default function SearchKeywordRankList({
  dataArr,
}: {
  dataArr: IRankKeywordData[];
}) {
  return (
    <div className="col-center w-full gap-4">
      <ul className="grid w-full grid-cols-1">
        {dataArr.map((data, index) => (
          <SearchKeywordRankItem
            key={`${index}.${data.keyword}`}
            data={data as IRankKeywordData}
          />
        ))}
      </ul>
    </div>
  );
}
