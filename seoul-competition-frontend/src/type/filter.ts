// filterSlice에 사용
export interface IFilterState {
  // fetch 실행 유무 판단용
  isClicked: boolean;
  // 상태 3가지
  status: TStatus;
  // 기간 범위
  startDate: TDate;
  endDate: TDate;
  // 가격 범위
  minPrice: TPrice;
  maxPrice: TPrice;
  // 총 필터링 된 개수
  totalCounts: number;
}

// filterSlice에 사용
export interface IStatus {
  status: TStatus;
}

// filterSlice에 사용
export interface IStartDate {
  startDate: TDate;
}

// filterSlice에 사용
export interface IEndDate {
  endDate: TDate;
}

// filterSlice에 사용
export interface IBothDate {
  startDate: TDate;
  endDate: TDate;
}

// filterSlice에 사용
export interface IMinPrice {
  minPrice: TPrice;
}

// filterSlice에 사용
export interface IMaxPrice {
  maxPrice: TPrice;
}

// filterSlice에 사용
export interface ITotalCounts {
  totalCounts: number;
}

export type TStatus = "수강신청중" | "수강신청예정" | "마감" | "전체";
export type TDate = string;
export type TPrice = string;
