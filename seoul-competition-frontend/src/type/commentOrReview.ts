export type TId = number;
export type TPostId = string | number;
export type TEducationId = string | number;
export type TNickname = string;
export type TPassword = string;
export type TContent = string;
export type TCreatedAt = string;

// 댓글과 리뷰 유니온 타입
export type ICommentOrReview = IComment | IReview;

// 댓글의 read 요청 타입
export interface IComment extends IReadCommentOrReview {
  postId: TPostId;
}
// 리뷰의 read 요청 타입
export interface IReview extends IReadCommentOrReview {
  educationId: TEducationId;
}
// 댓글과 리뷰의 공통 키 타입
export interface IReadCommentOrReview {
  id: TId;
  nickname: TNickname;
  content: TContent;
  createdAt: TCreatedAt;
}

// 댓글과 리뷰의 create 요청 유니온 타입
export type ICreateCommentOrReview = ICreateComment | ICreateReview;
// 댓글의 create 요청 유니온 타입
export interface ICreateComment extends ICreateCommentOrReviewForm {
  postId: TPostId;
}
// 리뷰의 create 요청 유니온 타입
export interface ICreateReview extends ICreateCommentOrReviewForm {
  educationId: TEducationId;
}
// 댓글과 리뷰의 폼데이터
export interface ICreateCommentOrReviewForm {
  nickname: TNickname;
  password: TPassword;
  content: TContent;
}

// 댓글과 리뷰의 update 요청 유니온 타입
export interface IUpdateCommentOrReview extends IUpdateCommentOrReviewForm {
  id: TId;
  password: TPassword;
}
// 댓글과 리뷰의 update 요청 폼 유니온 타입
export interface IUpdateCommentOrReviewForm {
  nickname?: TNickname;
  content?: TContent;
}

// 댓글과 리뷰의 delete 요청 유니온 타입
export interface IDeleteCommentOrReview extends IMatchCheckCommentOrReviewForm {
  id: TId;
}
// 댓글과 리뷰의 matchCheck 요청 유니온 타입
export interface IMatchCheckCommentOrReview
  extends IMatchCheckCommentOrReviewForm {
  id: TId;
}
// 댓글과 리뷰의 matchCheck 요청 Form 유니온 타입
export interface IMatchCheckCommentOrReviewForm {
  password: TPassword;
}
