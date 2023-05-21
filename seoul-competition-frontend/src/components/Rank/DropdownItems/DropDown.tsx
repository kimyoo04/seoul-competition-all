export default function DropDown({ text = "" }: { text?: string }) {
  return (
    <div className="col-center">
      <button className="flex h-6 w-52 items-center justify-between rounded-t-md bg-main_color/90  shadow-md">
        <div className="h-9 w-9"></div>
        <span className="text-font_white">{text}</span>
        <div className="h-9 w-9"></div>
      </button>
    </div>
  );
}
