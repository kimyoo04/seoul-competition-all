export function timeYmd(date: string) {
  // 현재 시각 - 댓글이 쓰인 시각 (초 단위)
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  // 시간 경과 정도에 따라 상대적 시간 표기
  if (seconds <= 60) {
    // 초전
    return formatRelativeTime(seconds, "초");
  } else if (seconds <= 3600) {
    // 분전
    return formatRelativeTime(seconds, "분");
  } else if (seconds <= 21600) {
    // 시간전 (6시간까지)
    return formatRelativeTime(seconds, "시간");
  } else {
    // 날짜
    const ymdDate = getDotDate(new Date(date));
    return ymdDate;
  }
}

function formatRelativeTime(value: number, unit: "초" | "분" | "시간") {
  const timeMeasurements = {
    초: 1,
    분: 60,
    시간: 3600,
  };
  const roundedValue = Math.round(Math.abs(value));
  const measurement = timeMeasurements[unit];

  return `${Math.round(roundedValue / measurement)} ${unit} 전`;
}

function getDotDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

export function getBarDate(date: Date) {
  // Date > String
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Example: "2023-05-01"
}

export function getKorDate(dateString: string): string {
  const [year, month, day] = dateString.split(".").map(Number);
  const formattedDate = `${Math.round(year % 100)}년 ${month}월 ${day}일`;
  return formattedDate;
}
