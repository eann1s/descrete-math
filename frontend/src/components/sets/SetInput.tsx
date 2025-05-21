import { ChangeEventHandler } from "react";

interface SetInputProps {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  description?: string;
  id: string;
}

export const SetInput = ({
  label,
  value,
  onChange,
  placeholder,
  description,
  id,
}: SetInputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded"
        aria-describedby={`${id}-help`}
      />
      {description && (
        <p id={`${id}-help`} className="text-sm mt-1">
          {description}
        </p>
      )}
    </div>
  );
};
