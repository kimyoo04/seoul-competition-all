import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { filterActions } from "@features/filter/filterSlice";

export default function PriceFilter() {
  const dispatch = useAppDispatch();
  const { minPrice: minPriceStr, maxPrice: maxPriceStr } = useAppSelector(
    (state) => state.filter
  );

  const step = 1000; // 금액 간격
  const fixedMinPrice = 0; // 기본 최소 금액
  const fixedMaxPrice = 100000; // 기본 최대 금액

  // 최소 금액, 최대 금액
  const [minPrice, setMinPrice] = useState(fixedMinPrice);
  const [maxPrice, setMaxPrice] = useState(fixedMaxPrice);

  // price-slider-inner의 left, right 퍼센트 상태
  const [leftPercent, setLeftPercent] = useState(0);
  const [rightPercent, setRightPercent] = useState(0);

  // 2가지 금액, 2가지 확률 상태 dispatch
  function rangeHandler() {
    if (maxPrice - minPrice < step) {
      setMaxPrice(minPrice + step);
      setMinPrice(maxPrice - step);
    } else {
      setLeftPercent((minPrice / fixedMaxPrice) * 100);
      setRightPercent(100 - (maxPrice / fixedMaxPrice) * 100);
    }
  }

  // 숫자 포멧 ,000,000 변환
  function formatCurrency(value: number) {
    return value
      .toLocaleString("en-US", {
        style: "currency",
        currency: "KRW",
      })
      .replace("₩", "");
  }

  // RTC price 상태 dispatch
  function handleMinTouchEnd() {
    dispatch(filterActions.setMinPrice({ minPrice: minPrice.toString() }));
  }
  function handleMaxTouchEnd() {
    dispatch(filterActions.setMaxPrice({ maxPrice: maxPrice.toString() }));
  }

  // 초기화 버튼을 클릭했을 때를 고려해서 useEffect로 상태를 업데이트
  useEffect(() => {
    const minPriceNum = parseInt(minPriceStr);
    const maxPriceNum = parseInt(maxPriceStr);

    // 최소 금액, 최대 금액 상태 업데이트
    setMinPrice(minPriceNum);
    setMaxPrice(maxPriceNum);
    // 회색 바 위치 업데이트
    setLeftPercent((minPriceNum / fixedMaxPrice) * 100);
    setRightPercent(100 - (maxPriceNum / fixedMaxPrice) * 100);
  }, [minPriceStr, maxPriceStr]);

  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="col-center">
        <span className="font-medium text-font_white">수강료 설정</span>
      </div>

      <div className="mt-6">
        {/* 흰색 바 */}
        <div className="price-slider">
          {/* 회색 바 */}
          <div
            className="price-slider-inner"
            style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }}
          ></div>

          <div className="price-slider-wrap">
            {/* 최소 금액 핸들 */}
            <input
              type="range"
              min={fixedMinPrice}
              max={fixedMaxPrice - step}
              step={step}
              value={minPrice}
              onChange={(e) => {
                setMinPrice(parseInt(e.target.value));
                rangeHandler();
              }}
              onMouseUp={handleMinTouchEnd}
              onTouchEnd={handleMinTouchEnd}
              className="price-input price-input_left"
            />
            {/* 최대 금액 핸들 */}
            <input
              type="range"
              min={fixedMinPrice + step}
              max={fixedMaxPrice}
              step={step}
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(parseInt(e.target.value));
                rangeHandler();
              }}
              onMouseUp={handleMaxTouchEnd}
              onTouchEnd={handleMaxTouchEnd}
              className="price-input price-input_right"
            />
          </div>

          {/* 최저 금액 최대 금액 출력 영역 */}
          <div className="min-max-price">
            <span className="text-font_white">
              {minPrice !== 0 ? `${formatCurrency(minPrice)} 원` : "무료"}
            </span>
            <span className="text-font_white">
              {formatCurrency(maxPrice)} 원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
