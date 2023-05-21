import { interests } from "@constants/userForm/userFormData";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@toolkit/hook";
import { interestActions } from "@features/rank/interestSlice";
import { ageActions } from "@features/rank/ageSlice";

export default function InterestDropDown() {
  const dispatch = useDispatch();
  const { isOpen, selectedInterest } = useAppSelector(
    (state) => state.interest
  );

  return (
    <div className="col-center relative">
      {/* toggle button */}
      <button
        className="flex h-6 w-52 items-center justify-between rounded-t-md bg-main_color/90  shadow-md"
        onClick={() => {
          dispatch(ageActions.close());
          dispatch(interestActions.toggleOpen());
        }}
      >
        <div className="h-9 w-9"></div>

        <span className="text-font_white">
          {selectedInterest === "" ? "관심사별 더보기" : selectedInterest}
        </span>

        <i className="ri-arrow-drop-down-fill text-4xl text-font_white "></i>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul className="col-center absolute top-6 w-52 rounded-b-md bg-white shadow-md">
          {interests.map((interest, indx) => (
            <li
              key={indx + interest}
              className="col-center w-52 border-b"
              onClick={() => dispatch(interestActions.selectInterest(interest))}
            >
              {interest}
            </li>
          ))}

          <li
            className="col-center w-52"
            onClick={() => dispatch(interestActions.selectTotal())}
          >
            전체
          </li>
        </ul>
      )}
    </div>
  );
}
