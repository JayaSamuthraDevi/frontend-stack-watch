'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ToastNotification } from "@carbon/react";

type ToastType = {
  kind: "success" | "error" | "info" | "warning";
  title: string;
  subtitle?: string;
};

type ToastContextType = {
  showToast: (toast: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastType | null>(null);

  const showToast = (toastData: ToastType) => {
    setToast(toastData);
    setTimeout(() => setToast(null), 5000); // auto-dismiss
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
          <ToastNotification
            kind={toast.kind}
            title={toast.title}
            subtitle={toast.subtitle}
            onCloseButtonClick={() => setToast(null)}
            lowContrast
          />
        </div>
      )}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
