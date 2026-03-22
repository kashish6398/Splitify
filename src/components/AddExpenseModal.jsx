import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AddExpenseModal({ members, onClose, onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(members[0]);
  const [participants, setParticipants] = useState([...members]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const toggleParticipant = (member) => {
    if (participants.includes(member)) {
      setParticipants(participants.filter(m => m !== member));
    } else {
      setParticipants([...participants, member]);
    }
  };

  const handleSelectAll = () => setParticipants([...members]);
  const handleClearAll = () => setParticipants([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || parseFloat(amount) <= 0 || participants.length === 0) return;
    
    onAdd({
      description,
      amount: parseFloat(amount),
      paidBy,
      participants
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 isolate">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 sm:p-6 border-b border-gray-100 shrink-0 bg-white">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Add Expense</h3>
          <button 
            onClick={onClose} 
            className="p-2 -mr-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1 custom-scrollbar">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">What was it for?</label>
            <input 
              type="text" 
              placeholder="e.g. Dinner, Taxi, Hotel"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none text-gray-900 font-medium placeholder:font-normal placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (₹)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
              <input 
                type="number" 
                placeholder="0.00"
                min="0"
                step="any"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-lg text-gray-900 placeholder:font-normal placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Who paid?</label>
            <select 
              value={paidBy}
              onChange={e => setPaidBy(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none text-gray-900 appearance-none font-semibold cursor-pointer"
            >
              {members.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-gray-700">For whom?</label>
              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={handleSelectAll}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg"
                >
                  Select All
                </button>
                <button 
                  type="button" 
                  onClick={handleClearAll}
                  className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg"
                >
                  Clear
                </button>
              </div>
            </div>
            
            <div className="max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex flex-wrap gap-2 pb-2">
                {members.map((member) => {
                  const isSelected = participants.includes(member);
                  return (
                    <button
                      key={member}
                      type="button"
                      onClick={() => toggleParticipant(member)}
                      className={cn(
                        "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all select-none border active:scale-[0.98]",
                        isSelected 
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-sm" 
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                      )}
                    >
                      {member}
                      {isSelected && <Check size={14} strokeWidth={3} className="text-white" />}
                    </button>
                  )
                })}
              </div>
            </div>
            {participants.length === 0 && (
              <p className="text-xs text-red-500 mt-2 font-medium">Please select at least one participant.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 sm:p-6 border-t border-gray-100 bg-white shrink-0">
          <button
            onClick={handleSubmit}
            disabled={!description || !amount || participants.length === 0}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all flex items-center justify-center gap-2"
          >
            Add Expense
          </button>
        </div>
      </motion.div>
    </div>
  );
}
