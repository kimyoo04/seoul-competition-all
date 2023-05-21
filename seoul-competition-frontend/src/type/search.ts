export type TSearchCategory = "educations" | "posts";
export type TSearchCategoryKor = "교육 정보 골라보기" | "자유게시판 골라보기";
export type TSearchKeyword = string;
// 검색 react-hook-form에 사용

export interface ISearchField {
  search: TSearchKeyword;
}

// searchSlice에 사용
export interface ISearchState {
  isFocus: boolean;
  category: TSearchCategory;
  searchKeyword: TSearchKeyword;
  keywords: string[]; // localstorage에 저장되는 최근 검색어
}

// searchSlice에 사용
export interface ISearchCategory {
  searchCategory: TSearchCategory;
}

// searchSlice에 사용
export interface ISearchKeyword {
  searchKeyword: TSearchKeyword;
}

// searchSlice에 사용
export interface IKeywordIndex {
  index: number;
}
