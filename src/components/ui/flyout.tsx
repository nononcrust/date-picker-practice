import { cn } from "@/lib/utils";
import * as PopoverPrimitives from "@radix-ui/react-popover";
import React from "react";

export const Flyout = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Content>,
  React.ComponentProps<typeof PopoverPrimitives.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <PopoverPrimitives.Portal>
      <PopoverPrimitives.Content
        ref={ref}
        sideOffset={8}
        align="center"
        className={cn(
          "text-[13px] shadow-md bg-white w-fit rounded-lg border border-gray-200",
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {children}
      </PopoverPrimitives.Content>
    </PopoverPrimitives.Portal>
  );
});
Flyout.displayName = "DatePicker.Flyout";
