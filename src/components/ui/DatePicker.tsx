'use client';

import { useEffect, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { format, isValid } from 'date-fns';

interface DatePickerProps {
  date?: Date;
  onSelect: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  maxDate?: Date;
  minDate?: Date;
  required?: boolean;
}

type DateValueType = {
  startDate: Date | null;
  endDate: Date | null;
};

export function DatePicker({
  date,
  onSelect,
  label,
  placeholder = "Pick a date",
  maxDate,
  minDate,
  required = false,
}: DatePickerProps) {
  const [value, setValue] = useState<DateValueType>({
    startDate: date || null,
    endDate: date || null,
  });

  useEffect(() => {
    if (date && isValid(date)) {
      setValue({
        startDate: date,
        endDate: date,
      });
    }
  }, [date]);

  const handleValueChange = (newValue: DateValueType | null) => {
    if (!newValue) {
      setValue({ startDate: null, endDate: null });
      onSelect(undefined);
      return;
    }

    setValue(newValue);
    
    if (newValue.startDate) {
      const selectedDate = new Date(newValue.startDate);

      // Check min/max constraints
      if (minDate && selectedDate < minDate) {
        setValue({ startDate: minDate, endDate: minDate });
        onSelect(minDate);
        return;
      }
      
      if (maxDate && selectedDate > maxDate) {
        setValue({ startDate: maxDate, endDate: maxDate });
        onSelect(maxDate);
        return;
      }

      onSelect(selectedDate);
    } else {
      onSelect(undefined);
    }
  };

  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <Datepicker
        useRange={false}
        asSingle={true}
        value={value}
        onChange={handleValueChange}
        inputClassName="input input-bordered w-full"
        toggleClassName="hidden"
        placeholder={placeholder}
        minDate={minDate}
        maxDate={maxDate}
        displayFormat="MMM DD, YYYY"
        readOnly={true}
        containerClassName="relative"
        popoverDirection="down"
        disabled={false}
        disabledDates={[]}
        i18n="en"
        configs={{
          shortcuts: {
            today: "Today",
            yesterday: "Yesterday",
            past: (period) => `Last ${period} days`,
            currentMonth: "This month",
            pastMonth: "Last month"
          },
          footer: {
            cancel: "Cancel",
            apply: "Apply"
          }
        }}
        /*
        classNames={{
          input: "focus:ring-2 focus:ring-primary",
          container: "!relative",
          inputWrapper: "!relative",
          popoverContainer: "!fixed !inset-4 !top-[20vh] !transform-none !max-w-none md:!absolute md:!inset-auto",
          footer: "!mt-2",
          disabled: "text-gray-400 hover:bg-transparent cursor-not-allowed",
        }}
          */
      />
      {required && !value.startDate && (
        <label className="label">
          <span className="label-text-alt text-error">This field is required</span>
        </label>
      )}
    </div>
  );
}