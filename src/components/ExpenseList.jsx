import { motion } from "framer-motion";

export default function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center text-gray-500 mb-4">
        No expenses yet
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h2 className="font-semibold mb-2">Expenses</h2>

      {expenses.map((e, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-3 rounded-xl shadow mb-2"
        >
          <p className="font-medium">₹{e.amount}</p>
          <p className="text-sm text-gray-600">
            Paid by {e.paidBy}
          </p>
          <p className="text-xs text-gray-500">
            Split: {e.participants.join(", ")}
          </p>
        </motion.div>
      ))}
    </div>
  );
}