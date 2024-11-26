"use client";

import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function Home() {
  const [date, setDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<DateRange>();

  const [pickerDate, setPickerDate] = useState<Date>();
  const [pickerDateRange, setPickerDateRange] = useState<DateRange>();

  const fromDate = new Date();
  // 1달 뒤까지
  const toDate = new Date();
  toDate.setMonth(toDate.getMonth() + 1);

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-8">
      {/* <div className="flex gap-4">
        <Calendar selected={date} onSelect={setDate} mode="single" />
        <Calendar selected={dateRange} onSelect={setDateRange} mode="range" />
      </div> */}
      <DatePicker
        className="w-[240px]"
        value={pickerDate}
        onChange={setPickerDate}
        placeholder="날짜를 선택해주세요."
        mode="single"
      />
      <DatePicker
        className="w-[240px]"
        value={pickerDateRange}
        onChange={setPickerDateRange}
        fromDate={fromDate}
        toDate={toDate}
        placeholder="날짜를 선택해주세요."
        mode="range"
      />
    </main>
  );
}
