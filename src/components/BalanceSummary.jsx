export default function BalanceSummary({ balances }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Balances</h2>

      {Object.entries(balances).map(([name, amount]) => (
        <div
          key={name}
          className="flex justify-between items-center py-1"
        >
          <span>{name}</span>

          <span
            className={`text-sm font-semibold ${
              amount > 0
                ? "text-green-600"
                : amount < 0
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {amount > 0
              ? `gets ₹${amount.toFixed(0)}`
              : amount < 0
              ? `owes ₹${Math.abs(amount).toFixed(0)}`
              : "settled"}
          </span>
        </div>
      ))}
    </div>
  );
}