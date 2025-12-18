import { useRef, useEffect } from "react";
import { FaCheck, FaTimes, FaExclamationTriangle } from "react-icons/fa";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: "danger" | "warning" | "info";
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "danger",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "danger":
        return <FaExclamationTriangle className="text-red-500 text-3xl" />;
      case "warning":
        return <FaExclamationTriangle className="text-amber-500 text-3xl" />;
      case "info":
        return <FaCheck className="text-sky-500 text-3xl" />;
      default:
        return <FaExclamationTriangle className="text-gray-500 text-3xl" />;
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case "danger":
        return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
      case "warning":
        return "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500";
      case "info":
        return "bg-sky-600 hover:bg-sky-700 focus:ring-sky-500";
      default:
        return "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex flex-col items-center text-center">
          <div className={`p-4 rounded-full bg-opacity-10 mb-4 ${
              type === 'danger' ? 'bg-red-100' : 
              type === 'warning' ? 'bg-amber-100' : 'bg-sky-100'
          }`}>
            {getIcon()}
          </div>
          
          <h3 id="modal-title" className="text-xl font-bold text-gray-900 mb-2">
            {title}
          </h3>
          
          <p className="text-gray-500 mb-6">
            {message}
          </p>

          <div className="flex w-full gap-3">
             <button
              onClick={onClose}
              className="flex-1 cursor-pointer px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-4 py-2 text-white cursor-pointer rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 text-center flex items-center justify-center gap-2 shadow-sm ${getButtonColor()}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
        
        <button 
            onClick={onClose}
            className="absolute top-4 cursor-pointer right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
            <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
