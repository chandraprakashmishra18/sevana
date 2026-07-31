import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/Feedback/Toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toastState, setToast] = useState({
    message: "",
    type: "success",
  });

  const showToast = useCallback((message, type = "success") => {
    setToast({
      message,
      type,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast({
      message: "",
      type: "success",
    });
  }, []);

  const toast = {
    success: (message) => showToast(message, "success"),
    error: (message) => showToast(message, "error"),
    warning: (message) => showToast(message, "warning"),
    info: (message) => showToast(message, "info"),
  };

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}

      <Toast
        message={toastState.message}
        type={toastState.type}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
