import { IEducationDetail } from "@type/educationDetail";

interface IHeaderProps {
  data: IEducationDetail;
}

export default function Header({ data }: IHeaderProps) {
  const statusBg =
    data.status === "수강신청중"
      ? "text-main_color text-font_white"
      : data.status === "수강신청예정"
      ? "text-sub_color"
      : data.status === "마감"
      ? "text-gray_4"
      : "";

  return (
    <div>
      {/* 게시글 제목*/}
      <h2 className="text-2xl font-medium">{data.name}</h2>

      <div>
        {/* 강좌 상태 */}
        <span className={`text-sm ${statusBg}`}>{data.status}</span>

        {/* 경계 */}
        <span className="mx-2 text-sm text-gray_2">|</span>

        {/* 조회수 */}
        <span className="text-sm text-gray_2">조회수: {data.hits}</span>
      </div>
    </div>
  );
}
