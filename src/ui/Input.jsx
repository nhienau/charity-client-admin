import { cn } from "@/lib/utils";
import React from "react";

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={cn(
      "rounded-md border-[1px] border-solid border-slate-300 bg-inherit px-2 py-1.5 focus:outline focus:outline-2 focus:outline-slate-500 disabled:bg-slate-200",
      className,
    )}
    {...props}
    ref={ref}
  />
));
Input.displayName = "Input";

export default Input;
