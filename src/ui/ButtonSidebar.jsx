import React from "react";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";

const ButtonSidebar = React.forwardRef(({ onClick, className }, ref) => (
  <button
    className={`flex shrink-0 items-center justify-center rounded-md border-none bg-none p-1 transition-colors hover:bg-slate-400 ${className}`}
    onClick={onClick}
    ref={ref}
  >
    <HiOutlineBars3BottomLeft className="h-8 w-8" />
  </button>
));
ButtonSidebar.displayName = "ButtonSidebar";

export default ButtonSidebar;
