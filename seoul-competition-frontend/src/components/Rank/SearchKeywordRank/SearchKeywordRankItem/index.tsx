import { searchActions } from "@features/search/searchSlice";
import { useAppDispatch } from "@toolkit/hook";
import { IRankKeywordData } from "@type/rank";

export default function SearchKeywordRankItem({
  data,
}: {
  data: IRankKeywordData;
}) {
  const dispatch = useAppDispatch();

  return (
    <li
      className="group cursor-pointer border-b"
      onClick={() =>
        dispatch(searchActions.searchKeyword({ searchKeyword: data.keyword }))
      }
    >
      <div className="my-1 flex items-center justify-between">
        {/* 키워드 */}
        <span className="text-lg font-medium group-hover:text-main_color">
          {data.keyword}
        </span>

        {/* 조회수 */}
        <span className="text-[14px] text-gray_2">{data.hits} 회</span>
      </div>
    </li>
  );
}
