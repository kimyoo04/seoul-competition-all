import { IComment } from "./commentOrReview";
import {
  TCapacity,
  TEducationEnd,
  TEducationStart,
  THits,
  TId,
  TName,
  TRegisterEnd,
  TRegisterStart,
  TUrl,
} from "./educations";
import { TPrice, TStatus } from "./filter";

// 교육 정보 디테일 데이터
export interface IEducationDetail {
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
  reviews: IComment[];
  user: TUser;
}

export type TUser = boolean;
