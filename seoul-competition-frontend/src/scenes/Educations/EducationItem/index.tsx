import { IEducationData } from "@type/educations";
import Link from "next/link";

export default function EducationItem({
  education,
}: {
  education: IEducationData;
}) {
  const padCapacity = education.capacity.toString().padStart(2, "0");

  const capacityBg =
    education.status === "마감"
      ? "text-gray_2 shadow-gray_2"
      : education.capacity >= 100
      ? "text-[#4A00CC] shadow-[#4A00CC]"
      : "text-font_black shadow-font_black";

  const priceNum = parseInt(education.price.replaceAll(",", ""));

  const priceBg =
    education.status === "마감"
      ? "text-gray_2 shadow-gray_2"
      : priceNum >= 20000
      ? "text-[#05B600] shadow-[#05B600]"
      : priceNum > 0
      ? "text-[#00B2D0] shadow-[#00B2D0]"
      : "text-[#0056C8] shadow-[#0056C8]";

  const statusBorder =
    education.status === "수강신청중"
      ? "border-l-main_color text-font_white"
      : education.status === "수강신청예정"
      ? "border-l-sub_color"
      : education.status === "마감"
      ? "border-l-gray-200"
      : "";

  const statusBg =
    education.status === "수강신청중"
      ? "bg-main_color text-font_white"
      : education.status === "수강신청예정"
      ? "bg-sub_color"
      : education.status === "마감"
      ? "bg-gray_4"
      : "";

  return (
    <Link
      href={`/educations/${education.id}`}
      className={`group overflow-hidden rounded-2xl shadow-md transition-all hover:scale-105`}
    >
      <div
        className={`flex h-full flex-col justify-between gap-4 border-l-[5px] bg-white py-4 pl-4 ${statusBorder}`}
      >
        {/* 교육 이름 */}
        <div className="pr-4">
          <span className="text-h4 font-medium">{education.name}</span>
        </div>

        {/* 교육 정보 내용 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* 교육 정보 정원 */}
            <span
              className={`row-center gap-1 ${capacityBg} h-9 rounded-lg px-2 text-sm font-medium shadow-sm shadow-black/50`}
            >
              정원: {padCapacity} 명
            </span>

            {/* 교육 정보 수강료 */}
            <span
              className={`row-center gap-1 ${priceBg} h-9 rounded-lg px-2 text-sm font-medium shadow-sm shadow-black/50`}
            >
              {education.price === "0" ? "무료" : `${education.price} 원`}
            </span>
          </div>

          {/* 교육 정보 상태 */}
          <span className={`row-center ${statusBg} h-9 w-28 rounded-l-lg`}>
            {education.status}
          </span>
        </div>
      </div>
    </Link>
  );
}
