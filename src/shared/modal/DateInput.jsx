import {useRef, useState } from "react";

/**
 * DateInput (com ícone e picker nativo)
 * - mostra data em dd/mm/aaaa
 * - ao clicar no ícone (ou input) abre o picker nativo (showPicker se suportado)
 * - suporta controlado (value + onChange) ou não-controlado (defaultValue)
 * - onChange recebe a string formatada "dd/mm/aaaa"
 */
export default function DateInput({
  id,
  name,
  label,
  value,
  defaultValue = "",
  onChange,
  placeholder = "dd/mm/aaaa",
  required = false,
  className = "",
  labelClassName = "",
  inputClassName = "",
}) {
  const safeName =
    name || label?.toLowerCase().replace(/[^a-z0-9]+/gi, "-") || "date";
  const inputId = id || `${safeName}`;

  const [internal, setInternal] = useState(() =>
    value !== undefined ? value : defaultValue
  );
  const currentValue = value !== undefined ? value : internal;

  const hiddenDateRef = useRef(null);

  const isoToDisplay = (iso) => {
    if (!iso) return "";
    const parts = iso.split("-");
    if (parts.length !== 3) return "";
    return `${parts[2].padStart(2, "0")}/${parts[1].padStart(
      2,
      "0"
    )}/${parts[0].padStart(4, "0")}`;
  };

  const displayToIso = (display) => {
    const digits = (display || "").replace(/\D/g, "");
    if (digits.length < 8) return "";
    const d = digits.slice(0, 2);
    const m = digits.slice(2, 4);
    const y = digits.slice(4, 8);
    return `${y}-${m}-${d}`;
  };

  const formatDigitsToDisplay = (digits) => {
    const d = digits.slice(0, 2);
    const m = digits.slice(2, 4);
    const y = digits.slice(4, 8);
    let out = d;
    if (m) out += `/${m}`;
    if (y) out += `/${y}`;
    return out;
  };

  const isValidDate = (display) => {
    const iso = displayToIso(display);
    if (!iso) return false;
    const [y, m, d] = iso.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    );
  };

  const handleVisibleChange = (e) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    const formatted = formatDigitsToDisplay(digits);
    if (onChange) onChange(formatted);
    else setInternal(formatted);
  };

  const handleNativeChange = (e) => {
    const iso = e.target.value;
    const disp = isoToDisplay(iso);
    if (onChange) onChange(disp);
    else setInternal(disp);
  };

  const openNativePicker = () => {
    const el = hiddenDateRef.current;
    if (!el) return;
    if (typeof el.showPicker === "function") {
      el.showPicker();
    } else {
      el.focus();
    }
  };

  const baseInputClasses =
    "w-full border border-gray-200 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-200";

  return (
    <div className={`flex flex-col ${className}`}>
      {label ? (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
        >
          {label}
          {required ? <span className="text-red-600 ml-1">*</span> : ""}
        </label>
      ) : null}

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          className={`${baseInputClasses} ${inputClassName}`}
          value={currentValue}
          onChange={handleVisibleChange}
          aria-label={label}
          required={required}
          onClick={() => {
            openNativePicker();
          }}
        />

        <button
          type="button"
          onClick={openNativePicker}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Abrir seletor de data"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>

        <input
          ref={hiddenDateRef}
          type="date"
          className="absolute opacity-0 pointer-events-none -z-10" // keep it out of layout but focusable
          onChange={handleNativeChange}
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {currentValue &&
      currentValue.length === 10 &&
      !isValidDate(currentValue) ? (
        <p className="text-xs text-red-600 mt-1">Data inválida</p>
      ) : null}
    </div>
  );
}
