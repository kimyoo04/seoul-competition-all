import { IEducationData } from "@type/educations";
import EducationRankItem from "../EducationRankItem";
import { IRankEducationData } from "@type/rank";

export default function EducationRankList({
  data,
}: {
  data: IRankEducationData[];
}) {
  return (
    <div className="col-center w-full gap-4">
      <ul className="grid w-full grid-cols-1">
        {/*  교육 정보 아이템  */}
        {data.map((education) => (
          <EducationRankItem
            key={education.id}
            education={education as IEducationData}
          />
        ))}
      </ul>
    </div>
  );
}
