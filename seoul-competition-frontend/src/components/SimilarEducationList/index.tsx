import { useAppSelector } from "@toolkit/hook";
import { useReadSimilarEducationsByKeyword } from "@api/similar/readSimilarEducationsByKeyword";
import EducationItem from "@scenes/Educations/EducationItem";
import Loading from "@components/Loading";

export default function SimilarList() {
  const searchCategory = useAppSelector((state) => state.search.category);
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);

  const { data, isLoading, error } =
    useReadSimilarEducationsByKeyword(searchKeyword);

  return (
    <>
      {/* 로딩 시 로딩 화면 표시 */}
      {isLoading && <Loading />}

      {/* 에러 발생 시 에러 메시지 표시 */}
      {error && <p className="text-alert_danger">문제가 발생했습니다.</p>}

      {/* 데이터가 있을 경우 화면 표시 */}
      {searchCategory === "educations" && data && data.length !== 0 && (
        <div className="col-center w-full gap-4">
          {/* 헤더 */}
          <h1 className="text-xl font-bold">검색어와 관련 높은 게시물</h1>

          {/* 검색어 관련 교육 정보 5개 */}
          <ul className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
            {data.map((education, indx) => (
              <EducationItem
                key={indx + education.name}
                education={education}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
