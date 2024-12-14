import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React from "react";

// field: 'field' returned from useController
const DateField = React.forwardRef(({ field, placeholder }, ref) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={cn(
          "justify-start text-left font-normal disabled:bg-slate-200 disabled:text-slate-500",
        )}
        id={field.name}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {field.value ? (
          new Intl.DateTimeFormat("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(field.value)
        ) : (
          <span>{placeholder}</span>
        )}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={field.value}
        onSelect={field.onChange}
        onBlur={field.onBlur}
        ref={ref}
        initialFocus
        className="bg-white"
      />
    </PopoverContent>
  </Popover>
));
DateField.displayName = "DateField";

export default DateField;
