import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/Feedback/Toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toastState, setToast] = useState({
    title: "",
    message: "",
    type: "success",
  });

  const showToast = useCallback((toast, type = "success") => {
    const nextToast = typeof toast === "string"
      ? { message: toast, type }
      : toast;

    setToast({
      title: "",
      type: "success",
      ...nextToast,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast({
      title: "",
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
        title={toastState.title}
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
