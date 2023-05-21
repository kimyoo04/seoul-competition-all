import { filterActions } from "@features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { TStatus } from "@type/filter";
import classNames from "classnames";

export default function StatusFilter() {
  const dispatch = useAppDispatch();
  const { status: nowStatus } = useAppSelector((state) => state.filter);
  const statuses: TStatus[] = ["수강신청중", "수강신청예정", "마감", "전체"];

  return (
    <div className="col-center w-full gap-2">
      <span className="font-medium text-font_white">강좌 상태 선택</span>

      <div className="grid w-full grid-cols-2 gap-3">
        {statuses.map((status) => {
          return (
            <label
              htmlFor={status}
              key={status}
              className={`col-center w-full rounded-2xl border   px-1 py-1 font-medium transition-all ${classNames(
                {
                  "bg-white text-font_black shadow-md": nowStatus === status,
                },
                {
                  "border-sub_color text-font_white": nowStatus !== status,
                }
              )}`}
            >
              <input
                type="radio"
                id={status}
                name={status}
                value={status}
                onChange={(e) => nowStatus === e.target.value}
                onClick={() => dispatch(filterActions.toggleStatus({ status }))}
                className="hidden"
              />
              {status}
            </label>
          );
        })}
      </div>
    </div>
  );
}
