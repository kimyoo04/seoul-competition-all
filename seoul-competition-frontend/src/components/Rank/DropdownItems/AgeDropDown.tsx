import { useDispatch } from "react-redux";
import { useAppSelector } from "@toolkit/hook";
import { ageActions } from "@features/rank/ageSlice";
import { ageDataArr } from "@constants/userForm/userFormData";
import { interestActions } from "@features/rank/interestSlice";

export default function AgeDropDown() {
  const dispatch = useDispatch();
  const { isOpen, selectedageStr } = useAppSelector((state) => state.age);

  return (
    <div className="col-center relative">
      {/* toggle button */}
      <button
        className="flex h-6 w-52 items-center justify-between rounded-t-md bg-main_color/90  shadow-md"
        onClick={() => {
          dispatch(interestActions.close());
          dispatch(ageActions.toggleOpen());
        }}
      >
        <div className="h-9 w-9"></div>

        <span className="text-font_white">
          {selectedageStr === "" ? "연령대별 더보기" : selectedageStr}
        </span>

        <i className="ri-arrow-drop-down-fill text-4xl text-font_white "></i>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul className="col-center z-1 absolute top-6 w-52  rounded-b-md bg-white shadow-md">
          {ageDataArr.map((ageData, indx) => (
            <li
              key={indx + ageData.age}
              className="col-center w-52 border-b"
              onClick={() => dispatch(ageActions.selectAge({ ...ageData }))}
            >
              {ageData.ageStr}
            </li>
          ))}

          <li
            className="col-center w-52"
            onClick={() => dispatch(ageActions.selectTotal())}
          >
            전체
          </li>
        </ul>
      )}
    </div>
  );
}
