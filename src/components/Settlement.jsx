export default function Settlement({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-4">
        No settlements yet
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow mt-4">
      <h2 className="font-semibold mb-3">Individual Settlements</h2>

      {transactions.map((t, i) => (
        <div
          key={i}
          className="flex justify-between items-center py-2 border-b last:border-none"
        >
          <span className="text-sm">
            <span className="font-medium">{t.from}</span> pays{" "}
            <span className="font-medium">{t.to}</span>
          </span>

          <span className="text-blue-600 font-semibold">
           ₹{Math.round(t.amount)}
          </span>
        </div>
      ))}
    </div>
  );
}