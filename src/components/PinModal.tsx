import React, { useEffect, useRef, useState } from 'react';
import { KeyRound, ShieldCheck, X } from 'lucide-react';
import { ADMIN_PIN } from '../data/defaultPortalData';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PinModal: React.FC<PinModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [adminId, setAdminId] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setAdminId('');
      setError('');
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId.trim() === ADMIN_PIN) {
      setError('');
      onSuccess();
    } else {
      setError('Invalid Admin ID. Please enter the authorized ID to continue.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071633]/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pin-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#0B1E47] to-[#1D4ED8] px-6 py-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-amber-300" aria-hidden="true" />
            </div>
            <div>
              <h2 id="pin-modal-title" className="font-display font-bold text-base sm:text-lg">
                Admin Login
              </h2>
              <p className="text-xs text-blue-100/85">JIT Assessment &amp; Apps Portal</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close admin login modal"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <label
            htmlFor="admin-id-input"
            className="block text-sm font-semibold text-[#0B1E47] mb-2"
          >
            Enter Admin ID
          </label>
          <div className="relative">
            <KeyRound
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              id="admin-id-input"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={adminId}
              onChange={(e) => {
                setAdminId(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter Admin ID"
              className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 font-mono text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          {error && (
            <p role="alert" className="mt-2.5 text-xs font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-[#1D4ED8] hover:bg-[#1E40AF] text-white transition-colors shadow-sm"
            >
              Unlock Admin Panel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
