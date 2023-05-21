import { IAgeData, TInterest } from "@type/userForm";

export const genders = ["남성", "여성"];

export const ageDataArr: IAgeData[] = [
  { ageStr: "49세 이하", age: "0-49" },
  { ageStr: "50 - 54세", age: "50-54" },
  { ageStr: "55 - 59세", age: "55-59" },
  { ageStr: "60 - 64세", age: "60-64" },
  { ageStr: "65 - 69세", age: "65-69" },
  { ageStr: "70세 이상", age: "70-100" },
];

export const locations = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

export const interests: TInterest[] = ["취업", "교육", "취미", "모임"];
