import { IComment } from "./commentOrReview";
import { TContent, TCreatedAt, THits, TId, TNickname, TTitle } from "./posts";

// 게시글 데이터
export interface IPostDetail {
  id: TId;
  nickname: TNickname;
  title: TTitle;
  content: TContent;
  createdAt: TCreatedAt;
  hits: THits;
  comments: IComment[];
  user: TUser;
}

// 게시글 State
export interface IPostDetailState {
  post: IPostDetail;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

export type TUser = boolean;
