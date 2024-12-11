"use client";

import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/ui/date-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function Home() {
  const [date, setDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<DateRange>();

  const [pickerDate, setPickerDate] = useState<Date>();
  const [pickerDateRange, setPickerDateRange] = useState<DateRange>();

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-8">
      <div className="flex gap-4">
        <div className="p-3 border rounded-lg">
          <Calendar selected={date} onSelect={setDate} mode="single" />
        </div>
        <div className="p-3 border rounded-lg">
          <Calendar selected={dateRange} onSelect={setDateRange} mode="range" />
        </div>
      </div>
      <DatePicker
        className="w-[240px]"
        value={pickerDate}
        onChange={setPickerDate}
        placeholder="날짜를 선택해주세요."
      />
      <DateRangePicker
        className="w-[240px]"
        value={pickerDateRange}
        onChange={setPickerDateRange}
        placeholder="날짜를 선택해주세요."
      />
    </main>
  );
}
