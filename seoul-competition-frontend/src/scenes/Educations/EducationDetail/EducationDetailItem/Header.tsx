import { IEducationDetail } from "@type/educationDetail";

interface IHeaderProps {
  data: IEducationDetail;
}

export default function Header({ data }: IHeaderProps) {
  return (
    <div>
      {/* 게시글 제목*/}
      <h2 className="text-2xl font-medium">{data.name}</h2>

      {/* 조회수 */}
      <span className="text-sm">조회수: {data.hits}</span>
    </div>
  );
}
