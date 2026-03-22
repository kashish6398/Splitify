export function calculateBalances(expenses, members) {
  const balances = {};

  members.forEach(m => balances[m.name] = 0);

  expenses.forEach(exp => {
    if (!exp.participants || exp.participants.length === 0 || !exp.paidBy) return;

    const splitAmount = exp.amount / exp.participants.length;

    exp.participants.forEach(personId => {
      const personName = members.find(m => m.id === personId)?.name || personId;
      if (balances[personName] === undefined) balances[personName] = 0;
      balances[personName] -= splitAmount;
    });

    const payerName = members.find(m => m.id === exp.paidBy)?.name || exp.paidBy;
    if (balances[payerName] === undefined) balances[payerName] = 0;
    balances[payerName] += exp.amount;
  });

  return balances;
}