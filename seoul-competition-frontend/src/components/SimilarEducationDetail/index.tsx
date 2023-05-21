import { useReadSimilarEducationsById } from "@api/similar/readSimilarEducationsById";
import { useAppSelector } from "@toolkit/hook";
import { TEducationId } from "@type/educations";
import EducationItem from "@scenes/Educations/EducationItem";
import Loading from "@components/Loading";

export default function SimilarEducationDetail({ id }: { id: TEducationId }) {
  const searchCategory = useAppSelector((state) => state.search.category);

  const { data, isLoading, error } = useReadSimilarEducationsById(id);

  return (
    <>
      {/* 로딩 시 로딩 화면 표시 */}
      {isLoading && <Loading />}

      {/* 에러 발생 시 에러 메시지 표시 */}
      {error && <p className="text-alert_danger">문제가 발생했습니다.</p>}

      {/* 데이터가 있을 경우 화면 표시 */}
      {searchCategory === "educations" && data && data.length !== 0 && (
        <div className="py-4">
          <h1 className="col-center w-full text-xl font-medium text-main_color">
            관련 교육 정보들은 어떤가요?
          </h1>

          {/* 관련 교육 정보 게시글 5개 */}
          <ul className="grid w-full grid-cols-1 gap-4">
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
