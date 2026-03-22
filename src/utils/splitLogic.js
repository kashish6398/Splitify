export function calculateBalances(expenses, members) {
  const balances = {};

  members.forEach(m => balances[m] = 0);

  expenses.forEach(exp => {
    const splitAmount = exp.amount / exp.participants.length;

    exp.participants.forEach(person => {
      balances[person] -= splitAmount;
    });

    balances[exp.paidBy] += exp.amount;
  });

  return balances;
}