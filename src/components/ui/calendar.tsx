"use client";

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  DateRange,
  DayButtonProps,
  DayPicker,
  DayProps,
  PropsRange,
  PropsRangeRequired,
  PropsSingle,
  useDayPicker,
} from "react-day-picker";
import { ko } from "date-fns/locale/ko";

export type CalendarProps = PropsSingle | PropsRange;

export const Calendar = (props: CalendarProps) => {
  return (
    <DayPicker
      hidden={{ before: new Date() }}
      showOutsideDays
      classNames={{
        months: "flex flex-col sm:flex-row relative",
        month: "space-y-2",
        month_caption: "flex justify-center relative items-center mb-10",
        caption_label:
          "text-[13px] font-medium absolute bottom-0 left-0 right-0 top-4 flex items-center justify-center text-main",
        nav: "space-x-1 flex items-center bg-gray-100 rounded-md w-full h-8 justify-between p-0.5 absolute top-0",
        button_previous: cn(
          "w-7 h-7 flex justify-center items-center rounded-md focus-visible:ring-2 focus-visible:outline-none hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-20",
          "!absolute left-0.5"
        ),
        button_next: cn(
          "w-7 h-7 flex justify-center items-center rounded-md focus-visible:ring-2 focus-visible:outline-none hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-20",
          "!absolute right-0.5"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex w-full gap-x-2",
        weekday:
          "text-[13px] font-medium text-sub m-0 box-border flex w-8 h-8 items-center justify-center p-0",
        week: "flex w-full mt-2 gap-x-2",
        day: "text-[13px] font-medium relative rounded-md size-8 flex justify-center items-center p-0 text-center focus-within:relative hover:bg-hover text-main",
        day_button:
          "text-[13px] font-medium focus-visible:ring-2 rounded-md p-0 text-center outline-none w-full h-full disabled:pointer-events-none",
        selected: "hover:bg-primary-dark bg-primary text-white",
        outside: "text-sub aria-selected:text-disabled",
        disabled: "!text-disabled",
        range_middle:
          "aria-selected:!bg-primary-light aria-selected:!text-primary",
        hidden: "opacity-30 pointer-events-none",
      }}
      locale={ko}
      components={{
        Chevron: ({ orientation }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className="size-4" strokeWidth={3} />;
          }
          return <ChevronRightIcon className="size-4" strokeWidth={3} />;
        },
        Day,
      }}
      {...props}
    />
  );
};

const Day = ({ children, day, className, ...props }: DayProps) => {
  const {
    getModifiers,
    isSelected,
    selected: selectedDates,
  } = useDayPicker<{ mode: "range" }>();

  const { disabled, today, hidden } = getModifiers(day);

  const selected = isSelected?.(day.date);

  const isRangeMiddle =
    selected &&
    selectedDates?.from &&
    selectedDates.from !== day.date &&
    selectedDates?.to &&
    selectedDates.to !== day.date;

  if (hidden) {
    return <td className={className}>{day.date.getDate()}</td>;
  }

  return (
    <td className={className} {...props}>
      {children}
      {today && (
        <span
          className={cn(
            "absolute right-[5px] top-[5px] h-1 w-1 rounded-full",
            !selected && "bg-primary",
            selected && "bg-white",
            isRangeMiddle && "!bg-primary",
            disabled && "opacity-50 bg-primary pointer-events-none"
          )}
        />
      )}
    </td>
  );
};
