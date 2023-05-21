import { IRankKeywordData } from "@type/rank";

export default function SearchKeywordRankItem({
  data,
}: {
  data: IRankKeywordData;
}) {
  return (
    <li className="border-b">
      <div className="my-1 flex justify-between">
        {/* 키워드 */}
        <span className="text-lg">{data.keyword}</span>

        {/* 조회수 */}
        <span className=" text-md text-gray-500">조회 {data.hits}</span>
      </div>
    </li>
  );
}
