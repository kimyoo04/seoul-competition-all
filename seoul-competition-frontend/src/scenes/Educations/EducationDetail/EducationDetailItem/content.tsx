import React from "react";
import { IEducationDetail } from "@type/educationDetail";
import { getKorDate } from "@util/dateTime";

interface IContentProps {
  data: IEducationDetail;
}

export default function Content({ data }: IContentProps) {
  return (
    <>
      {/* 교육 정보 영역 */}
      <div className="col-center w-full gap-8 py-8">
        <table className="education-detail__table">
          <tr>
            <td>정원</td>
            <td>{data.capacity} 명</td>
          </tr>
          <tr>
            <td>가격</td>
            <td>{data.price === "0" ? "무료" : `${data.price} 원`}</td>
          </tr>
          <tr>
            <td>신청 기간</td>
            <td>
              <div>
                <span>{getKorDate(data.registerStart)}</span>
                <span> ~ </span>
                <span>{getKorDate(data.registerEnd)}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>교육 기간</td>
            <td>
              <div>
                <span>{getKorDate(data.educationStart)}</span>
                <span> ~ </span>
                <span>{getKorDate(data.educationEnd)}</span>
              </div>
            </td>
          </tr>
        </table>

        {/* 문구와 외부 링크 버튼 */}
        <div className="flex w-full items-center justify-between gap-6">
          <span>
            버튼을 눌러 더 많은 정보를 확인하고 수강신청을 해보세요. 당신의 인생
            2모작을 응원합니다.
          </span>
          <a
            href={data.url}
            rel="noopener"
            target="_blank"
            className="col-center h-8 rounded-full bg-main_color text-font_white"
          >
            <button className="w-36">수강 신청 페이지</button>
          </a>
        </div>
      </div>
    </>
  );
}
