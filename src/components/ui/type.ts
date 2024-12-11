import { CalendarProps } from "./calendar";

export interface PickerProps {
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

  showTimePicker?: boolean;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-required"?: boolean;
}
