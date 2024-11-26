import React, { useMemo, useState } from "react";
import * as PopoverPrimitives from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Locale, format } from "date-fns";
import { usePopover } from "@/hooks/use-popover";
import { Calendar } from "./calendar";
import { Button } from "./button";

interface SingleDatePickerProps extends PickerProps {
  value: Date;
  onChange: (date: Date | undefined) => void;
}

const SingleDatePicker = ({
  value: initialDate,
  onChange,
  placeholder,
  disabled,
  className,
  ...props
}: SingleDatePickerProps) => {
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
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            disabled={disabled}
            {...props}
          />
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

interface RangeDatePickerProps extends PickerProps {
  value: DateRange;
  onChange: (date: DateRange | undefined) => void;
}

const RangeDatePicker = ({
  value: initialDateRange,
  onChange,
  placeholder,
  disabled,
  className,
  ...props
}: RangeDatePickerProps) => {
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
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDateRangeChange}
            disabled={disabled}
            {...props}
          />
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

type CalendarProps = {
  /**
   * The year to start showing the dates from.
   */
  fromYear?: number;
  /**
   * The year to show dates to.
   */
  toYear?: number;
  /**
   * The month to start showing dates from.
   */
  fromMonth?: Date;
  /**
   * The month to show dates to.
   */
  toMonth?: Date;
  /**
   * The day to start showing dates from.
   */
  fromDay?: Date;
  /**
   * The day to show dates to.
   */
  toDay?: Date;
  /**
   * The date to show dates from.
   */
  fromDate?: Date;
  /**
   * The date to show dates to.
   */
  toDate?: Date;
  /**
   * The locale to use for formatting dates. To change the locale pass a date-fns locale object.
   */
  locale?: Locale;
};

interface PickerProps extends CalendarProps {
  /**
   * The class name to apply on the date picker.
   */
  className?: string;
  /**
   * Whether the date picker's input is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the date picker's input is required.
   */
  required?: boolean;
  /**
   * The date picker's placeholder.
   */
  placeholder?: string;
  /**
   * The date picker's size.
   */
  size?: "small" | "base";
  /**
   * Whether to show a time picker along with the date picker.
   */
  showTimePicker?: boolean;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-required"?: boolean;
}

type DatePickerProps = (
  | {
      mode?: "single";
      value: Date | undefined;
      onChange: (date: Date | undefined) => void;
    }
  | {
      mode: "range";
      value: DateRange | undefined;
      onChange: (date: DateRange | undefined) => void;
    }
) &
  PickerProps;

export const DatePicker = ({ mode = "single", ...props }: DatePickerProps) => {
  if (mode === "single") {
    return <SingleDatePicker {...(props as SingleDatePickerProps)} />;
  }

  return <RangeDatePicker {...(props as RangeDatePickerProps)} />;
};

interface TriggerProps extends React.ComponentPropsWithoutRef<"button"> {
  placeholder?: string;
}

const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
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

const Flyout = React.forwardRef<
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
