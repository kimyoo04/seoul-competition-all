import React from "react";
import { useAppDispatch } from "@toolkit/hook";
import { sidebarActions } from "@features/sidebar/sidebarSlice";

export default function FilterToggle() {
  const dispatch = useAppDispatch();

  return (
    <button
      className="col-center fixed bottom-[136px] right-4 h-40 w-10 rounded-full bg-white shadow-sm shadow-gray_1 transition-all hover:scale-110"
      onClick={() => dispatch(sidebarActions.toggleSidebar())}
    >
      <i className="ri-equalizer-line text-2xl text-main_color" />
      <span className="w-6 text-lg font-bold text-main_color">골라보기</span>
    </button>
  );
}
