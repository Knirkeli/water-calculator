// This component lets the user select if they are going to work out or not.

"use client"
interface SelectFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    required?: boolean;
  }
  
  export default function SelectField({ label, value, onChange, options, required }: SelectFieldProps) {
    return (
      <label className="flex flex-col gap-2 font-medium">
        {label}
        <select
          value={value}
          onChange={onChange}
          required={required}
          className="border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>
    );
  }