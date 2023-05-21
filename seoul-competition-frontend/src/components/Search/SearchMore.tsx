export default function SearchMore({
  inViewRef,
  hasNextPage,
}: {
  inViewRef: (node?: Element | null | undefined) => void;
  hasNextPage: boolean | undefined;
}) {
  return (
    <div
      ref={inViewRef}
      className="col-center w-full rounded-full border px-4 py-1"
    >
      <span>{hasNextPage ? "더보기" : "마지막 검색 결과입니다."}</span>
    </div>
  );
}
