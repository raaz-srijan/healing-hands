import React from "react";
import type { IconType } from "react-icons/lib";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  icon?: IconType;
  disabled?: boolean;
  required?: boolean;
  as?: "input" | "select";
  options?: { label: string; value: string }[];
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  disabled,
  required,
  as = "input",
  options = [],
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="text-gray-400 dark:text-slate-500" />
          </div>
        )}

        {as === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors duration-200 outline-none appearance-none"
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="dark:bg-slate-700"
              >
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 transition-colors duration-200 outline-none"
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
