interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: string | number;
  required?: boolean;
}

export default function InputField({
  label, type = "text", value, onChange, placeholder, min, max, step, required
}: InputFieldProps) {
  return (
    <label className="flex flex-col gap-2 font-medium">
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        required={required}
        className="border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background text-foreground"
      />
    </label>
  );
}