import { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onMouseDown={onClose}
      aria-hidden="false"
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-2xl w-11/12 max-h-[80vh] overflow-y-auto overflow-x-hidden p-6 m-4 ring-1 ring-black/5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
            <h2
              id="modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </h2>
            <button
              className="ml-3 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
              aria-label="Fechar"
            >
              <span className="text-2xl leading-none cursor-pointer">×</span>
            </button>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-700">{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
}
