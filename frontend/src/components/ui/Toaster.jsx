// src/components/ui/Toaster.jsx
import React, { useState, createContext, useContext } from 'react';
import { X, CheckCircle, AlertCircle, InfoIcon, AlertTriangle } from 'lucide-react';

// Create context for the toast functionality
const ToastContext = createContext({
  showToast: () => {},
});

// Custom hook to use the toast functionality
export const useToast = () => useContext(ToastContext);

// Toast component to display notifications
const Toast = ({ message, type, onClose }) => {
  // Determine icon based on toast type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-500" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-500" />;
      case 'info':
      default:
        return <InfoIcon size={20} className="text-blue-500" />;
    }
  };

  // Get style classes based on toast type
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-500 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-500 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-500 text-yellow-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-500 text-blue-800';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 max-w-md px-4 py-3 rounded-lg shadow-lg border-l-4 ${getTypeStyles()} animate-slide-up`}>
      <div className="flex items-center gap-3">
        {getIcon()}
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

// Provider component that manages toast state
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Function to show a toast notification
  const showToast = (message, type = 'info', duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto-dismiss toast after duration
    if (duration) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  };

  // Function to remove a toast by ID
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed bottom-0 right-0 p-4 z-50 flex flex-col space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;