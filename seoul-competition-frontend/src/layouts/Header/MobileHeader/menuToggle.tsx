import { Dispatch, SetStateAction } from "react";

export default function MenuToggle({
  showMenu,
  setShowMenu,
}: {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      {showMenu ? (
        <button onClick={() => setShowMenu(false)}>
          <i className="ri-close-line text-3xl font-bold text-main_color" />
        </button>
      ) : (
        <button
          className="col-center h-8 w-8"
          onClick={() => setShowMenu(true)}
        >
          <i className="ri-menu-3-line text-2xl font-bold text-main_color" />
        </button>
      )}
    </>
  );
}
