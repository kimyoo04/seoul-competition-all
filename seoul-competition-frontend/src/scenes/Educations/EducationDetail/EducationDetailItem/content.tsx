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
      <div>
        {/* 내용 영역*/}

        {/* 작성자, 작성일 */}
        <div className="col-start mb-8 text-sm text-gray_2">
          <div>
            <span>{data.status}</span>

            {/* 외부 링크 이동 버튼 */}
            <a
              href={data.url}
              rel="noopener"
              target="_blank"
              className="rounded-full bg-main_color px-2 py-1 text-font_white"
            >
              <button>수강 신청 페이지</button>
            </a>
          </div>

          <div>
            <h4 className="text-lg">정원</h4>
            <span>{data.capacity}</span>
          </div>

          <div>
            <h4 className="text-lg">가격</h4>
            <span>{data.price === "0" ? "무료" : `${data.price} 원`}</span>
          </div>

          <h4 className="text-lg">신청 기간</h4>
          <div>
            <span>{getKorDate(data.registerStart)}</span>
            <span> ~ </span>
            <span>{getKorDate(data.registerEnd)}</span>
          </div>

          <h4 className="text-lg">교육 기간</h4>
          <div>
            <span>{getKorDate(data.educationStart)}</span>
            <span> ~ </span>
            <span>{getKorDate(data.educationEnd)}</span>
          </div>
        </div>
      </div>
    </>
  );
}
