// 1. 개행 문자를 기준으로 첫번 째 문단만 자르기
// 2. 첫번 째 문단이 width보다 크면 ""..."를 추가해서 반환
export function truncateString(text: string, width: number): string {
  const ellipsis = "...";
  const firstParagraph = text.split("\n")[0];

  if (firstParagraph.length <= width) {
    return firstParagraph;
  } else {
    const truncatedText = firstParagraph.substring(0, width);
    return truncatedText + ellipsis;
  }
}
