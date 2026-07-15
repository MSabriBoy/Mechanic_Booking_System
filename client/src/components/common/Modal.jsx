import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({
  open,
  title,
  children,
  onClose,
  size = "max-w-2xl",
}) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div
        className={`relative w-full ${size} rounded-2xl bg-white shadow-xl`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-neutral-900">
            {title}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 transition hover:bg-neutral-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;