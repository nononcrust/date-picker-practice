import React, { useMemo, useState } from "react";
import * as PopoverPrimitives from "@radix-ui/react-popover";
import { DateRange, PropsSingle } from "react-day-picker";
import { Locale, format } from "date-fns";
import { usePopover } from "@/hooks/use-popover";
import { Calendar, CalendarProps } from "./calendar";
import { Button } from "./button";
import { Flyout } from "./flyout";
import { Trigger } from "./trigger";

interface DatePickerProps
  extends Omit<PropsSingle, "selected" | "onSelect" | "mode"> {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  "aria-required"?: boolean;
  "aria-invalid"?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const DatePicker = ({
  value: initialDate,
  onChange,
  placeholder,
  disabled,
  className,
  ...props
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(initialDate);

  const popover = usePopover();

  const onCancel = () => {
    popover.close();
    setDate(initialDate);
  };

  const onApply = () => {
    onChange(date);
    popover.close();
  };

  const onOpenChange = (open: boolean) => {
    popover.onOpenChange(open);
    setDate(initialDate);
  };

  const onDateChange = (date?: Date) => {
    setDate(date);
  };

  const formattedDate = date ? format(date, "yyyy-MM-dd") : null;

  return (
    <PopoverPrimitives.Root open={popover.isOpen} onOpenChange={onOpenChange}>
      <Trigger
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        aria-required={props.required || props["aria-required"]}
        aria-invalid={props["aria-invalid"]}
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
      >
        {formattedDate}
      </Trigger>
      <Flyout>
        <div className="flex flex-col">
          <div className="p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              {...props}
            />
          </div>
          <div className="border-gray-200 border-t flex items-center gap-x-2 p-3">
            <Button
              variant="outlined"
              className="w-full"
              type="button"
              onClick={onCancel}
            >
              취소하기
            </Button>
            <Button
              variant="primary"
              className="w-full"
              type="button"
              onClick={onApply}
            >
              적용하기
            </Button>
          </div>
        </div>
      </Flyout>
    </PopoverPrimitives.Root>
  );
};
