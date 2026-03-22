export function settleBalancesDirect(expenses, members = []) {
  const pairMap = {};

  expenses.forEach(exp => {
    if (!exp.participants || exp.participants.length === 0 || !exp.paidBy) return;

    const share = exp.amount / exp.participants.length;

    exp.participants.forEach(personId => {
      if (personId !== exp.paidBy) {
        const key = `${personId}->${exp.paidBy}`;

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
    const [fromId, toId] = key.split("->");
    const fromName = members.find(m => m.id === fromId)?.name || fromId;
    const toName = members.find(m => m.id === toId)?.name || toId;
    return { from: fromName, to: toName, amount };
  });
}