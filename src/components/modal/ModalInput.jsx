import { useState } from "react";

/**
 * ModalInput
 * Props:
 * - id: string (optional) - used for input id; if not provided a safe id will be generated from name
 * - name: string (optional)
 * - label: string (required) - label text
 * - value: string (optional) - controlled value
 * - defaultValue: string (optional) - initial uncontrolled value
 * - onChange: func (optional) - change handler: (newValue) => void
 * - type: 'text' | 'email' | 'number' | 'textarea' (default 'text')
 * - placeholder: string
 * - rows: number (for textarea)
 * - required: boolean
 * - className / labelClassName / inputClassName: string (tailwind additional classes)
 */
export default function ModalInput({
  id,
  name,
  label,
  value,
  defaultValue = "",
  onChange,
  type = "text",
  placeholder = "",
  rows = 4,
  required = false,
  className = "",
  labelClassName = "",
  inputClassName = "",
}) {
  const safeName =
    name || label?.toLowerCase().replace(/[^a-z0-9]+/gi, "-") || "input";
  const inputId = id || `${safeName}`;

  const [internal, setInternal] = useState(() =>
    value !== undefined ? value : defaultValue
  );

  const currentValue = value !== undefined ? value : internal;

  const handleChange = (e) => {
    const next = e.target.value;
    if (onChange) onChange(next);
    else setInternal(next);
  };

  const baseInputClasses =
    "w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200";

  return (
    <div className={`flex flex-col ${className}`}>
      <label
        htmlFor={inputId}
        className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
      >
        {label}
        {required ? " *" : ""}
      </label>

      {type === "textarea" ? (
        <textarea
          id={inputId}
          name={name}
          rows={rows}
          className={`${baseInputClasses} ${inputClassName}`}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
          aria-label={label}
          required={required}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          className={`${baseInputClasses} ${inputClassName}`}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
          aria-label={label}
          required={required}
        />
      )}
    </div>
  );
}
