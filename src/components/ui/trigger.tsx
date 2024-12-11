import { cn } from "@/lib/utils";
import * as PopoverPrimitives from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import React from "react";

interface TriggerProps extends React.ComponentPropsWithoutRef<"button"> {
  placeholder?: string;
}

export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, children, placeholder, ...props }, ref) => {
    return (
      <PopoverPrimitives.Trigger asChild>
        <button
          ref={ref}
          className={cn(
            "text-main bg-white transition-colors border h-8 px-3 flex w-full items-center gap-x-2 rounded-md outline-none text-[13px] font-medium",
            "hover:bg-hover",
            "focus-visible:ring-2",
            "disabled:bg-disabled disabled:pointer-events-none",
            "aria-[invalid=true]:!focus-visible-ring-error",
            className
          )}
          {...props}
        >
          <CalendarIcon className="w-4 h-4 text-sub" />
          <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left">
            {children ? (
              children
            ) : placeholder ? (
              <span className="text-sub">{placeholder}</span>
            ) : null}
          </span>
        </button>
      </PopoverPrimitives.Trigger>
    );
  }
);
Trigger.displayName = "DatePicker.Trigger";
