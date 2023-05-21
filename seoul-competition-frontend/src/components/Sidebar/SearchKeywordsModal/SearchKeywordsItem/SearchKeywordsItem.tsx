import { searchActions } from "@features/search/searchSlice";
import { useAppDispatch } from "@toolkit/hook";

interface ISearchItemProps {
  keyword: string;
  index: number;
}

export default function SearchKeywordsItem({
  keyword,
  index,
}: ISearchItemProps) {
  const dispatch = useAppDispatch();

  return (
    <li
      key={keyword + index}
      className="flex items-center justify-between border-b pt-0.5"
    >
      <button
        className="flex w-full items-start hover:font-medium hover:text-main_color"
        onClick={() =>
          dispatch(searchActions.clickKeyword({ searchKeyword: keyword }))
        }
      >
        {keyword}
      </button>
      <button onClick={() => dispatch(searchActions.deleteKeyword({ index }))}>
        <i className="ri-close-line text-2xl text-red-600"></i>
      </button>
    </li>
  );
}
