import { usePopover } from "@/hooks/use-popover";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange, PropsRange } from "react-day-picker";
import * as PopoverPrimitives from "@radix-ui/react-popover";
import { Trigger } from "./trigger";
import { Flyout } from "./flyout";
import { Calendar } from "./calendar";
import { Button } from "./button";

interface DateRangePickerProps
  extends Omit<PropsRange, "selected" | "onSelect" | "mode"> {
  value: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  "aria-required"?: boolean;
  "aria-invalid"?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const DateRangePicker = ({
  value: initialDateRange,
  onChange,
  placeholder,
  disabled,
  className,
  ...props
}: DateRangePickerProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialDateRange
  );

  const popover = usePopover();

  const onCancel = () => {
    popover.close();
    setDateRange(initialDateRange);
  };

  const onApply = () => {
    onChange(dateRange);
    popover.close();
  };

  const onOpenChange = (open: boolean) => {
    popover.onOpenChange(open);
    setDateRange(initialDateRange);
  };

  const onDateRangeChange = (dateRange?: DateRange) => {
    setDateRange(dateRange);
  };

  const dateRangeFrom =
    dateRange && dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "";

  const dateRangeTo =
    dateRange && dateRange.to ? ` ~ ${format(dateRange.to, "yyyy-MM-dd")}` : "";

  const formattedDate = dateRange ? `${dateRangeFrom}${dateRangeTo}` : null;

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
              mode="range"
              selected={dateRange}
              onSelect={onDateRangeChange}
              disabled={disabled}
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
