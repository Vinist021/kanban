import { useState } from "react";

/**
 * SelectBox
 * Props:
 * - id, name: identifiers
 * - label: string (required)
 * - options: array of strings or { value, label }
 * - value: controlled value
 * - defaultValue: uncontrolled initial value
 * - onChange: function(newValue)
 * - placeholder: string (optional) - shown as first disabled option
 * - required, className, labelClassName, selectClassName
 */
export default function SelectBox({
  id,
  name,
  label,
  options = [],
  value,
  defaultValue = "",
  onChange,
  placeholder = "",
  required = false,
  className = "",
  labelClassName = "",
  selectClassName = "",
}) {
  const safeName =
    name || label?.toLowerCase().replace(/[^a-z0-9]+/gi, "-") || "select";
  const selectId = id || `${safeName}`;

  const [internal, setInternal] = useState(() =>
    value !== undefined ? value : defaultValue
  );
  const currentValue = value !== undefined ? value : internal;

  const handleChange = (e) => {
    const next = e.target.value;
    if (onChange) onChange(next);
    else setInternal(next);
  };

  const baseSelectClasses =
    "w-full border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200";

  return (
    <div className={`flex flex-col ${className}`}>
      <label
        htmlFor={selectId}
        className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
      >
        {label}
        {required ? " *" : ""}
      </label>

      <select
        id={selectId}
        name={name}
        className={`${baseSelectClasses} ${selectClassName}`}
        value={currentValue}
        onChange={handleChange}
        aria-label={label}
        required={required}
      >
        {placeholder ? (
          <option value="" hidden={false}>
            {placeholder}
          </option>
        ) : null}

        {options.map((opt, idx) => {
          if (typeof opt === "string")
            return (
              <option key={idx} value={opt}>
                {opt}
              </option>
            );

          return (
            <option key={opt.value ?? idx} value={opt.value}>
              {opt.label ?? opt.value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
