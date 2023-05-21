export interface IUserForm {
  gender: TGender;
  age: TAge;
  location: TLocation | "";
  interest: TInterest | "";
  confirm: Tconfirm;
}

export interface IUserFormState {
  showModal: boolean;
}

export interface IAgeData {
  ageStr: TAgeStr;
  age: TAge;
}

export type TGender = string;
export type TAgeStr =
  | "49세 이하"
  | "50 - 54세"
  | "55 - 59세"
  | "60 - 64세"
  | "65 - 69세"
  | "70세 이상";
export type TAge = "0-49" | "50-54" | "55-59" | "60-64" | "65-69" | "70-100";
export type TLocation = string;
export type TInterest = "취업" | "교육" | "취미" | "모임";
export type Tconfirm = boolean;
