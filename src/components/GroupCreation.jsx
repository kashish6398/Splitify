import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function GroupCreation({ members, setMembers, onContinue }) {
  const [newMemberName, setNewMemberName] = useState('');

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMemberName.trim() === '') return;
    
    const newMember = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name: newMemberName.trim()
    };
    
    setMembers([...members, newMember]);
    setNewMemberName('');
  };

  const removeMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Who's in the group?</h2>
        <p className="text-sm font-medium text-gray-500 mt-2">Add all the members who will be sharing expenses.</p>
      </div>

      <form onSubmit={handleAddMember} className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            placeholder="Enter member name"
            className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium placeholder:text-gray-400 text-gray-900"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all active:scale-95 flex items-center justify-center shrink-0 disabled:opacity-50 disabled:pointer-events-none"
          disabled={!newMemberName.trim()}
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </form>

      <div className="space-y-4">
        {members.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            <AnimatePresence>
              {members.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold border border-indigo-100"
                >
                  {member.name}
                  <button
                    onClick={() => removeMember(member.id)}
                    className="p-0.5 hover:bg-indigo-100 rounded-md transition-colors text-indigo-400 hover:text-indigo-800"
                  >
                    <X size={14} strokeWidth={3} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="mt-10 pt-6 border-t border-gray-100">
        <button
          onClick={onContinue}
          disabled={members.length < 2}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base transition-all active:scale-[0.98]",
            members.length >= 2 
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          )}
        >
          Continue to Expenses
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
