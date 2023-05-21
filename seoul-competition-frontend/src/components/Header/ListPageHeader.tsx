interface IListPageHeader {
  headertitle: string;
  headerDescription?: string;
}

export default function ListPageHeader(porps: IListPageHeader) {
  return (
    <div className="w-full p-4 text-xl font-bold">
      <h2>{porps.headertitle}</h2>
      {porps.headerDescription && <span>{porps.headerDescription}</span>}
    </div>
  );
}
