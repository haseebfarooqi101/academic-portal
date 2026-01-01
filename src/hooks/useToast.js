import { useState } from 'react';

export function useToast() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

  const showToast = (message, type = 'error', duration = 3000) => {
    setToast({ show: true, message, type, duration });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'error' });
  };

  return {
    toast,
    showToast,
    hideToast,
    showError: (message, duration) => showToast(message, 'error', duration),
    showSuccess: (message, duration) => showToast(message, 'success', duration)
  };
}