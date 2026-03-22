import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Receipt, Clock, Trash2, MoreVertical, Edit2, Copy, Play } from 'lucide-react';
import { cn } from '../lib/utils';

export default function TripCard({ trip, onOpen, onDelete, onRename, onDuplicate }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const date = new Date(trip.updatedAt || trip.createdAt).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  return (
    <motion.div 
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border border-gray-200 transition-all flex flex-col overflow-hidden group hover:border-indigo-300"
    >
      <div className="p-6 flex-1 relative bg-white">
        
        {/* Absolute 3-dot Menu */}
        <div className="absolute top-4 right-4" ref={menuRef}>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
          >
            <MoreVertical size={18} />
          </button>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg border border-gray-100 py-1.5 z-10 origin-top-right shadow-sm"
              >
                <button
                  onClick={() => { setShowMenu(false); onRename(trip); }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 flex items-center gap-2 font-medium transition-colors"
                >
                  <Edit2 size={14} /> Rename
                </button>
                <button
                  onClick={() => { setShowMenu(false); onDuplicate(trip.id); }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 flex items-center gap-2 font-medium transition-colors"
                >
                  <Copy size={14} /> Duplicate
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <h3 className="text-xl font-bold text-gray-900 pr-8 truncate mb-5">{trip.name}</h3>
        
        <div className="flex items-center gap-5 text-sm font-medium text-gray-500">
          <div className="flex items-center gap-1.5">
            <Users size={16} className="text-gray-400" />
            <span>{trip.members?.length || 0}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Receipt size={16} className="text-gray-400" />
            <span>{trip.expenses?.length || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Clock size={14} className="text-gray-300" />
            <span className="text-xs text-gray-400 font-normal">{date}</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
        <button 
          onClick={() => onOpen(trip.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-indigo-50 text-indigo-700 font-medium text-sm rounded-lg hover:bg-indigo-100 transition-colors active:scale-[0.98]"
        >
          Open Trip
        </button>
        <button 
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this trip?")) onDelete(trip.id);
          }}
          className="ml-3 p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
          title="Delete Trip"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}
