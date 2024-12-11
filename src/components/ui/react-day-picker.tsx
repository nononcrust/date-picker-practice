import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

const Test = () => {
  const [date, setDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<DateRange>();

  return (
    <div>
      <DayPicker mode="single" selected={date} onSelect={setDate} />;
      <DayPicker mode="range" selected={dateRange} onSelect={setDateRange} />
    </div>
  );
};
