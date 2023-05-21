import { useAppSelector } from "@toolkit/hook";
import { useReadKeywordAgeRank } from "@api/rank/readKeywordAgeRank";

import AgeDropDown from "../DropdownItems/AgeDropDown";
import DropDown from "../DropdownItems/DropDown";

import PieChart from "./PieChart";

import RankNotFound from "../RankNotFound";
import RankServerError from "../RankServerError";
import RankLoading from "../RankLoading";

export default function KeywordRank() {
  const { data, isLoading, isError } = useReadKeywordAgeRank();
  const age = useAppSelector((state) => state.age.selectedageStr);

  return (
    <div className="flex h-full flex-col items-center justify-start gap-4 lg:w-1/2">
      <div className="h-14">
        <h3 className="h-8 flex-none text-center text-2xl font-bold">
          지난주에 가장 많이 검색된 단어예요.
        </h3>
      </div>

      <section className="relative w-full">
        {/* //! 유저 유무에 따른 연령대별 토글 버튼 */}
        <div className="absolute -top-6 left-0 right-0 mx-auto">
          {isLoading ? (
            <DropDown text={age} />
          ) : isError ? (
            <DropDown text="유저 정보를 받지 못했습니다." />
          ) : data.user ? (
            <AgeDropDown />
          ) : (
            <DropDown text="인기 검색어" />
          )}
        </div>

        {/* //! 교육정보 최다검색 키워드 Top5 */}
        <div className=" col-center rounded-2xl bg-main_color/5 p-8 shadow-md lg:h-[560px]">
          {isLoading ? (
            <RankLoading />
          ) : isError ? (
            <RankServerError />
          ) : (
            data && (
              <>
                {data.data.length > 0 ? (
                  <div className="col-center aspect-square h-full w-full">
                    <PieChart data={data.data} />
                  </div>
                ) : (
                  <RankNotFound />
                )}
              </>
            )
          )}
        </div>
      </section>
    </div>
  );
}
