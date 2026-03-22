export function settleBalancesDirect(expenses) {
  const pairMap = {};

  expenses.forEach(exp => {
    const share = exp.amount / exp.participants.length;

    exp.participants.forEach(person => {
      if (person !== exp.paidBy) {
        const key = `${person}->${exp.paidBy}`;

        if (!pairMap[key]) pairMap[key] = 0;
        pairMap[key] += share;
      }
    });
  });

  // 🔥 NETTING LOGIC
  const finalMap = {};

  Object.keys(pairMap).forEach(key => {
    const [from, to] = key.split("->");
    const reverseKey = `${to}->${from}`;

    const forward = pairMap[key] || 0;
    const backward = pairMap[reverseKey] || 0;

    const net = forward - backward;

    if (net > 0) {
      finalMap[key] = net;
    }
  });

  return Object.entries(finalMap).map(([key, amount]) => {
    const [from, to] = key.split("->");
    return { from, to, amount };
  });
}