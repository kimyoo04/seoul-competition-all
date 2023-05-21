import EducationRankList from "./EducationRankList";
import InterestDropDown from "../DropdownItems/InterestDropDown";
import { useReadEducationInterestRank } from "@api/rank/readEducationInterestRank";
import DropDown from "../DropdownItems/DropDown";
import { useAppSelector } from "@toolkit/hook";
import RankNotFound from "../RankNotFound";
import RankServerError from "../RankServerError";
import RankLoading from "../RankLoading";

export default function EducationRank() {
  const { data, isLoading, isError } = useReadEducationInterestRank();
  const interest = useAppSelector((state) => state.interest.selectedInterest);

  return (
    <div className="w-full">
      <h3 className="mb-4 text-center text-2xl font-bold">
        지난주에 가장 인기 있던 교육 정보예요.
      </h3>

      <section>
        {/* //! 유저 유무에 따른 연령대별 토글 버튼 */}
        {isLoading ? (
          <DropDown text={interest} />
        ) : isError ? (
          <DropDown text="유저 정보를 받지 못했습니다." />
        ) : data.user ? (
          <InterestDropDown />
        ) : (
          <DropDown text="인기 교육 정보" />
        )}

        {/* //! 교육정보 최다조회 게시글 Top5 */}
        <div className="w-full rounded-2xl bg-main_color/5 p-4 shadow-md">
          {isLoading ? (
            <RankLoading />
          ) : isError ? (
            <RankServerError />
          ) : (
            data && (
              <>
                {data.data.length > 0 ? (
                  <EducationRankList data={data.data} />
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
