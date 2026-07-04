import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'error', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose && onClose(), 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = {
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      padding: '12px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 500,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s ease-in-out',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-10px)'
    };

    if (type === 'error') {
      return {
        ...baseStyles,
        backgroundColor: '#FEF2F2',
        color: '#DC2626',
        border: '1px solid #FECACA'
      };
    }

    if (type === 'success') {
      return {
        ...baseStyles,
        backgroundColor: '#F0FDF4',
        color: '#16A34A',
        border: '1px solid #BBF7D0'
      };
    }

    return baseStyles;
  };

  if (!message) return null;

  return (
    <div style={getToastStyles()}>
      <div className="flex items-center gap-2">
        {type === 'error' && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        )}
        {type === 'success' && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
        )}
        <span>{message}</span>
      </div>
    </div>
  );
}