export default function SplitBreakdown({ expenses }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow mt-4">
      <h2 className="font-semibold mb-3">How splitting happened</h2>

      {expenses.map((exp, i) => {
        const share = exp.amount / exp.participants.length;

        return (
          <div key={i} className="mb-3 border-b pb-2">
            <p className="text-sm font-medium">
              ₹{exp.amount} paid by {exp.paidBy}
            </p>

            <p className="text-xs text-gray-500 mb-1">
              Each pays ₹{Math.round(share)}
            </p>

            <div className="text-xs text-gray-600">
              {exp.participants.map(p => (
                p !== exp.paidBy && (
                  <div key={p}>
                    {p} → {exp.paidBy} ₹{Math.round(share)}
                  </div>
                )
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}