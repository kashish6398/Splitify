import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function SaveTripModal({ isOpen, onClose, onSave, hasExpenses, defaultName }) {
  const [tripName, setTripName] = useState(defaultName || '');
  const inputRef = useRef(null);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTripName(defaultName || '');
      // Slight delay to ensure Framer Motion rendering completes before focusing
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  }, [isOpen, defaultName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-2">Save this Trip</h3>
        
        {!hasExpenses && (
          <div className="mb-4 text-sm font-medium text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
            You need to add at least one expense before saving.
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2 mt-4">Trip Name</label>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Enter trip name (e.g. Goa Trip)"
            value={tripName}
            onChange={e => setTripName(e.target.value)}
            disabled={!hasExpenses}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-gray-900 placeholder:font-normal placeholder:text-gray-400 disabled:opacity-50"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-xl transition-colors active:scale-[0.98]"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(tripName)}
            disabled={!tripName.trim() || !hasExpenses}
            className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all active:scale-[0.98]"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
