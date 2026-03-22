import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ReceiptText, Users, DollarSign, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ResultsModal({ onClose, balances, transactions, expenses }) {
  const [activeTab, setActiveTab] = useState('balances'); 
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-auto h-[100dvh]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden border border-gray-100"
      >
        <div className="p-5 sm:p-6 border-b border-gray-100 shrink-0 bg-white relative flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-1 tracking-tight">Trip Summary</h2>
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <ReceiptText size={16} />
              Total Spent: <span className="text-gray-900 font-bold">₹{totalSpent.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex p-3 bg-gray-50/50 border-b border-gray-100 shrink-0 gap-2">
          <button 
            onClick={() => setActiveTab('balances')}
            className={cn("flex-1 py-2 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5", activeTab === 'balances' ? "bg-white text-indigo-700 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100")}
          >
            <Users size={16} />
            Balances
          </button>
          <button 
            onClick={() => setActiveTab('settlements')}
            className={cn("flex-1 py-2 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5", activeTab === 'settlements' ? "bg-white text-indigo-700 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100")}
          >
            <DollarSign size={16} />
            Settlements
          </button>
          <button 
            onClick={() => setActiveTab('breakdown')}
            className={cn("flex-1 py-2 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5", activeTab === 'breakdown' ? "bg-white text-indigo-700 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100")}
          >
            <ReceiptText size={16} />
            Breakdown
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 flex-1 bg-white relative">
          <AnimatePresence mode="wait">
            {activeTab === 'balances' && (
              <motion.div 
                key="balances"
                initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                {Object.entries(balances)
                  .sort(([, a], [, b]) => b - a)
                  .map(([person, amount]) => {
                  const isPositive = amount > 0.01;
                  const isNegative = amount < -0.01;

                  return (
                    <div key={person} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:border-gray-300 transition-colors">
                      <span className="font-bold text-gray-900 text-base">{person}</span>
                      <div className={cn(
                        "font-bold text-base",
                        isPositive ? "text-emerald-600" : 
                        isNegative ? "text-red-600" : "text-gray-400"
                      )}>
                        {isPositive ? 'Gets ' : isNegative ? 'Owes ' : 'Settled '}
                        ₹{Math.abs(amount).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {activeTab === 'settlements' && (
              <motion.div 
                key="settlements"
                initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                {transactions.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="w-16 h-16 bg-gray-50 border border-gray-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={32} />
                    </div>
                    <p className="font-semibold text-gray-600">Awesome! Everyone is settled up.</p>
                  </div>
                ) : (
                  transactions.map((t, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900">{t.from}</span>
                        <ArrowRight size={16} className="text-gray-400" />
                        <span className="font-bold text-gray-900">{t.to}</span>
                      </div>
                      <span className="font-bold text-gray-900">
                        ₹{t.amount.toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'breakdown' && (
              <motion.div 
                key="breakdown"
                initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                {expenses.map((exp, idx) => {
                  const perPerson = exp.amount / exp.participants.length;
                  return (
                    <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                        <div>
                          <h4 className="font-bold text-gray-900 text-base">{exp.description}</h4>
                          <div className="text-sm font-medium text-gray-500 mt-0.5">Paid by {exp.paidBy}</div>
                        </div>
                        <span className="font-extrabold text-indigo-600 text-lg">₹{exp.amount.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Split Between</div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-3">
                        {exp.participants.map(p => (
                          <div key={p} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                            {p}: <span className="font-semibold text-gray-900">₹{perPerson.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
