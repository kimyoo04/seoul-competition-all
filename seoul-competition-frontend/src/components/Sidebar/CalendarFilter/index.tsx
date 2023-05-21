import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";

import "react-datepicker/dist/react-datepicker.css";

import { filterActions } from "@features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { useEffect, useState } from "react";
import { getBarDate } from "@util/dateTime";

export default function CalendarFilter() {
  const dispatch = useAppDispatch();
  const { startDate: startDateStr, endDate: endDateStr } = useAppSelector(
    (state) => state.filter
  );
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 초기화 버튼을 눌렀을 때 날짜를 초기화
  useEffect(() => {
    if (startDateStr === "" && endDateStr === "") {
      setStartDate(new Date());
      setEndDate(new Date());
    }
  }, [startDateStr, endDateStr]);

  return (
    <div className="col-center z-0 w-full ">
      <span className="mb-2 font-medium text-font_white">기간 탐색</span>

      <div className="row-start w-full ">
        <div className="col-center w-full pr-1">
          <DatePicker
            locale={ko}
            selected={startDate}
            onChange={(date) => {
              if (date) {
                setStartDate(date);
                dispatch(
                  filterActions.setBothDate({
                    startDate: getBarDate(date),
                    endDate: getBarDate(endDate),
                  })
                );
              }
            }}
            startDate={startDate}
            endDate={endDate}
            selectsStart
            maxDate={endDate}
            dateFormat="yyyy-MM-dd"
            className="textfield m-0 h-8 w-full text-center font-medium shadow-none"
          />
        </div>
        <span className="undraggable text-xl font-medium text-font_white">
          -
        </span>
        <div className="col-center w-full pl-1">
          <DatePicker
            locale={ko}
            selected={endDate}
            onChange={(date) => {
              if (date) {
                setEndDate(date);
                dispatch(
                  filterActions.setBothDate({
                    startDate: getBarDate(startDate),
                    endDate: getBarDate(date),
                  })
                );
              }
            }}
            startDate={startDate}
            endDate={endDate}
            selectsEnd
            minDate={startDate}
            maxDate={new Date()}
            dateFormat="yyyy-MM-dd"
            className="textfield m-0 h-8 w-full text-center font-medium shadow-none"
          />
        </div>
      </div>
    </div>
  );
}
