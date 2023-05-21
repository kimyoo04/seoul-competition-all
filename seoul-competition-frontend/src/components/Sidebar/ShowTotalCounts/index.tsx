import { useAppSelector } from "@toolkit/hook";

export default function ShowTotalCounts() {
  const totalCounts = useAppSelector((state) => state.filter.totalCounts);

  return (
    <div className="col-center ">
      <span className="text-lg font-medium text-font_white">검색된 개수</span>
      <span className="text-font_white">{totalCounts} 개</span>
    </div>
  );
}
