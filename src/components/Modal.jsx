import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <div className="modal-header">
                    <h3 className="text-lg">{title}</h3>
                    <button onClick={onClose} className="close-btn"><X size={20} /></button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>

            <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(2px);
        }
        .modal-card {
          background: var(--color-surface);
          width: 100%;
          max-width: 500px;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          animation: scaleIn 0.2s ease-out;
        }
        @keyframes scaleIn {
           from { transform: scale(0.95); opacity: 0; }
           to { transform: scale(1); opacity: 1; }
        }
        
        .modal-header {
          padding: 16px 24px;
          border-bottom: 1px solid var(--color-border);
          display: flex; justify-content: space-between; align-items: center;
        }
        .modal-body {
          padding: 24px;
        }
        .close-btn {
          color: var(--color-text-muted);
          padding: 4px; border-radius: 4px;
        }
        .close-btn:hover { background-color: var(--color-bg); color: var(--color-text-main); }
      `}</style>
        </div>
    );
};

export default Modal;
