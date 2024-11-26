"use client";

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  DayPicker,
  useDayRender,
  type DayPickerRangeProps,
  type DayPickerSingleProps,
  type DayProps,
} from "react-day-picker";
import { ko } from "date-fns/locale/ko";

type OmitKeys<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type KeysToOmit = "showWeekNumber" | "captionLayout" | "mode";

type SingleProps = OmitKeys<DayPickerSingleProps, KeysToOmit>;
type RangeProps = OmitKeys<DayPickerRangeProps, KeysToOmit>;

/**
 * @interface
 */
export type CalendarProps =
  | ({
      mode: "single";
    } & SingleProps)
  | ({
      mode?: undefined;
    } & SingleProps)
  | ({
      mode: "range";
    } & RangeProps);

export const Calendar = ({
  className,
  classNames,
  mode = "single",
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      mode={mode}
      showOutsideDays={showOutsideDays}
      className={cn(className)}
      classNames={{
        months: "flex flex-col sm:flex-row",
        month: "space-y-2 p-3",
        caption: "flex justify-center relative items-center h-8",
        caption_label:
          "text-[13px] font-medium absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-main",
        nav: "space-x-1 flex items-center bg-gray-100 rounded-md w-full h-full justify-between p-0.5",
        nav_button: cn(
          "w-7 h-7 flex justify-center items-center rounded-md focus-visible:ring-2 focus-visible:outline-none hover:bg-gray-200 transition-colors disabled:pointer-events-none disabled:opacity-20"
        ),
        nav_button_previous: "!absolute left-0.5",
        nav_button_next: "!absolute right-0.5",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full gap-x-2",
        head_cell:
          "text-[13px] font-medium text-sub m-0 box-border flex w-8 h-8 items-center justify-center p-0",
        row: "flex w-full mt-2 gap-x-2",
        cell: "text-[13px] font-medium relative rounded-md p-0 text-center focus-within:relative",
        day: "text-[13px] font-medium text-main hover:bg-hover focus-visible:ring-2 w-8 h-8 rounded-md p-0 text-center outline-none transition-colors disabled:pointer-events-none",
        day_selected:
          "bg-primary text-white hover:bg-primary-dark focus-visible:bg-primary-dark",
        day_outside: "text-sub aria-selected:text-disabled",
        day_disabled: "!text-disabled",
        day_range_middle:
          "aria-selected:!bg-primary-light aria-selected:!text-primary",
        day_hidden: "invisible",
        ...classNames,
      }}
      locale={ko}
      components={{
        IconLeft: () => <ChevronLeftIcon className="size-4" strokeWidth={3} />,
        IconRight: () => (
          <ChevronRightIcon className="size-4" strokeWidth={3} />
        ),
        Day: Day,
      }}
      {...(props as SingleProps & RangeProps)}
    />
  );
};

const Day = ({ date, displayMonth }: DayProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const { activeModifiers, buttonProps, divProps, isButton, isHidden } =
    useDayRender(date, displayMonth, ref);

  const { selected, today, disabled, range_middle } = activeModifiers;

  useEffect(() => {
    if (selected) {
      ref.current?.focus();
    }
  }, [selected]);

  if (isHidden) return null;

  if (!isButton) {
    return (
      <div
        {...divProps}
        className={cn("flex items-center justify-center", divProps.className)}
      />
    );
  }

  const {
    children: buttonChildren,
    className: buttonClassName,
    ...buttonPropsRest
  } = buttonProps;

  return (
    <button
      ref={ref}
      {...buttonPropsRest}
      type="button"
      className={cn("relative", buttonClassName)}
    >
      {buttonChildren}
      {today && (
        <span
          className={cn(
            "absolute right-[5px] top-[5px] h-1 w-1 rounded-full",
            !selected && "bg-primary",
            selected && "bg-white",
            selected && range_middle && "!bg-primary",
            disabled && "opacity-50 bg-primary pointer-events-none"
          )}
        />
      )}
    </button>
  );
};
