import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-4 left-0 right-0 z-[70] flex justify-center pointer-events-none px-4">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2.5 font-medium text-sm border border-gray-800"
          >
            <CheckCircle2 size={18} className="text-green-400" />
            {message}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
