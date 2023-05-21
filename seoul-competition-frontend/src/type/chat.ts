export interface IChatState {
  isChat: boolean;
  isAlert: boolean;
  alertMsg: TAlertMsg;
  messages: IMessage[];
}

export interface IMessage {
  id: TId;
  question?: TQuestion;
  answer?: TAnswer;
  feedback?: TFeedback;
}

export interface ISendForm {
  question: TQuestion;
}
export interface IChatAlert {
  alertMsg: TAlertMsg;
}

export interface IFeedback {
  id: TId;
  feedback: TFeedback;
}

export type TQuestion = string;
export type TAnswer = string;
export type TAlertMsg = string;
export type TId = number | "client";
export type TFeedback = boolean | null;
