import { IEducationData } from "@type/educations";
import Link from "next/link";

export default function EducationRankItem({
  education,
}: {
  education: IEducationData;
}) {
  const cutTitle =
    education.name.length > 30
      ? education.name.slice(0, 30) + "..."
      : education.name;

  const statusText =
    education.status === "수강신청중"
      ? "text-main_color text-font_white"
      : education.status === "수강신청예정"
      ? "text-[#00adc3]"
      : education.status === "마감"
      ? "text-gray_2"
      : "";

  return (
    <li className="group">
      <Link href={`/educations/${education.id}`}>
        <div className="col-start gap-1 border-b py-2">
          {/* 제목 */}
          <span className="group-hover:text-main_color">{cutTitle}</span>

          {/* 접수 마감일 & 비용 & 정원 */}
          <div className="flex w-full items-center justify-between">
            <div className="row-center gap-2 text-[14px] text-gray-500">
              <div className="flex w-16 items-center justify-start gap-1">
                <i className="ri-eye-fill text-gray_2"></i>
                <span className="text-gray_2">{education.hits}회</span>
              </div>
              <div className="flex w-16 items-center justify-start gap-1">
                <i className="ri-user-fill text-gray_2"></i>
                <span className="text-gray_2">{education.capacity}명</span>
              </div>
              <div className="flex w-20 items-center justify-start gap-1">
                <i className="ri-coin-fill text-gray_2"></i>
                <span className="text-gray_2">
                  {education.price === "0" ? "무료" : `${education.price}원`}
                </span>
              </div>
            </div>

            <div className="flex w-24 items-center justify-end gap-1 text-[14px]">
              <span className={`text-gray_2 ${statusText}`}>
                {education.status}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
