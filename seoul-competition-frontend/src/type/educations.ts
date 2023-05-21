import { TDate, TPrice, TStatus } from "./filter";

// 교육 정보 데이터
export interface IEducationData {
  id: TId;
  name: TName;
  status: TStatus;
  price: TPrice;
  capacity: TCapacity;
  registerStart: TRegisterStart;
  registerEnd: TRegisterEnd;
  educationStart: TEducationStart;
  educationEnd: TEducationEnd;
  url: TUrl;
  hits: THits;
  reviewsCount: TReviewsCount;
}

// 교육 정보 인피니티 스크롤 데이터
// fetchEducation.ts에 사용
export interface IEducationsDataPerPage {
  data: IEducationData[];
  totalPages: number;
  currentPage: number;
  totalCounts: number;
}

// fetchEducation.ts에 사용
export interface IEducationsQueryParams {
  page: number;
  name?: string;
  status?: TStatus;
  startDate?: TDate;
  endDate?: TDate;
  minPrice?: TPrice;
  maxPrice?: TPrice;
}

export type TId = number;
export type TEducationId = string;
export type TName = string;
export type TCapacity = number;
export type TRegisterStart = string;
export type TRegisterEnd = string;
export type TEducationStart = string;
export type TEducationEnd = string;
export type TUrl = string;
export type THits = number;
export type TReviewsCount = number;
