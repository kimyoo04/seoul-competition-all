import ButtonWrapper from "@components/Animation/ButtonWrapper";
import { searchActions } from "@features/search/searchSlice";
import { useAppDispatch } from "@toolkit/hook";
import { useState } from "react";

export default function SearchKeywordsHeader() {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center justify-between rounded-t-2xl bg-slate-100 px-4 py-2">
      <span className="text-md font-medium">최근 검색어</span>
      {isClicked ? (
        <div className="row-center gap-4">
          <ButtonWrapper>
            <button
              className="font-medium text-red-600"
              onClick={() => {
                dispatch(searchActions.deleteAllKeywords());
                setIsClicked(false);
              }}
            >
              삭제
            </button>
          </ButtonWrapper>
          <button
            className="font-medium"
            onClick={() => {
              setIsClicked(false);
            }}
          >
            <ButtonWrapper>취소</ButtonWrapper>
          </button>
        </div>
      ) : (
        <button
          className="font-medium text-red-600"
          onClick={() => setIsClicked(true)}
        >
          <ButtonWrapper>전체 삭제</ButtonWrapper>
        </button>
      )}
    </div>
  );
}
