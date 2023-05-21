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
  return (
    <li>
      <Link href={`/educations/${education.id}`}>
        <div className=" border-b">
          {/* 제목 */}
          <div className="my-1 text-sm">{cutTitle}</div>

          {/* 접수 마감일 & 비용 & 정원 */}
          <div className="my-1 flex justify-between">
            <div className=" text-xs text-gray-500">
              조회 {education.hits} · 접수 기한 {education.registerEnd} · 비용{" "}
              {education.price} · 정원 {education.capacity}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
