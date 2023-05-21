import Loading from "@components/Loading";
import Header from "./EducationDetailItem/Header";
import Content from "./EducationDetailItem/content";
import Comments from "@components/Comments";
import ScrollButton from "@components/ScrollButton";
import UserForm from "@components/UserForm";
import SimilarEducationDetail from "@components/SimilarEducationDetail";

import { useAppSelector } from "@toolkit/hook";
import { useReadEductionDetail } from "@api/educations/readEducationDetail";
import { TEducationId } from "@type/educations";

export default function EducationDetail({ id }: { id: TEducationId }) {
  const showModal = useAppSelector((state) => state.userForm.showModal);

  const { data, isLoading, error } = useReadEductionDetail(id);

  return (
    <>
      {/* 로딩 시 로딩 화면 표시 */}
      {isLoading && <Loading />}

      {/* 에러 발생 시 에러 메시지 표시 */}
      {error && <p className="text-alert_danger">문제가 발생했습니다.</p>}

      {/* 데이터가 있을 경우 화면 표시 */}
      {data && (
        <div className="mx-auto w-full max-w-screen-lg rounded-2xl bg-white p-6 shadow-lg">
          {/* 게시글 해더 */}
          <Header data={data} />

          {/* 교육 정보 영역 */}
          <Content data={data} />

          {/* 댓글 영역 */}
          <Comments data={data.reviews} />

          {/* 관련 교육 정보 게시글 5개 */}
          <SimilarEducationDetail id={id} />
        </div>
      )}

      {/* 최상단 이동 버튼 */}
      <ScrollButton />

      {/* 유저폼 모달 */}
      {showModal && <UserForm />}
    </>
  );
}
