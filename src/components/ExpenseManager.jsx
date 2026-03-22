import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Users, Receipt, ArrowLeft, Calculator } from 'lucide-react';
import AddExpenseModal from './AddExpenseModal';
import { cn } from '../lib/utils';

export default function ExpenseManager({ members, expenses, setExpenses, onSplit, onBack }) {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
    setShowAddModal(false);
  };

  const handleDelete = (idToRemove) => {
    setExpenses(expenses.filter((exp) => exp.id !== idToRemove));
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 active:scale-95"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="text-sm font-medium text-gray-400">
          Step 2 of 2
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100 text-indigo-400">
            <Receipt size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">Add First Expense</h2>
          <p className="text-gray-500 text-sm font-medium max-w-[250px] mx-auto mb-8">
            Record who paid for what. We'll handle all the math for you.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-all active:scale-95"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add Expense
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Expenses</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-sm font-semibold rounded-lg transition-colors active:scale-95"
            >
              <Plus size={16} strokeWidth={2.5} />
              Add
            </button>
          </div>

          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {expenses.map((expense) => {
                const payer = members.find(m => m.id === expense.paidBy)?.name || 'Someone';
                return (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between group hover:border-indigo-200 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
                      <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                        <Users size={16} className="text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-bold text-gray-900 truncate tracking-tight">{expense.description}</p>
                        <p className="text-xs font-medium text-gray-500 mt-0.5 truncate">
                          <span className="text-gray-700">{payer}</span> paid for {expense.participants.length} people
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-base font-black text-indigo-600 shrink-0">
                        ₹{expense.amount.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete expense"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="pt-4 px-1">
            <button
              onClick={onSplit}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold text-base transition-all active:scale-[0.98]"
            >
              Calculate Split
              <Calculator size={18} strokeWidth={2.5} />
            </button>
          </div>
        </>
      )}

      {showAddModal && (
        <AddExpenseModal
          members={members}
          onAdd={handleAddExpense}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
