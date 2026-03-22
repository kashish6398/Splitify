import { useState } from "react";

export default function ExpenseForm({ members, addExpense }) {
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(members[0]);
  const [participants, setParticipants] = useState([...members]);

  const toggle = (name) => {
    setParticipants(prev =>
      prev.includes(name)
        ? prev.filter(p => p !== name)
        : [...prev, name]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addExpense({
      amount: Number(amount),
      paidBy,
      participants,
    });

    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow mb-4 space-y-3">
      
      <input
        type="number"
        placeholder="Enter amount"
        className="w-full border p-2 mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        className="w-full border p-2 mb-2"
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
      >
        {members.map(m => <option key={m}>{m}</option>)}
      </select>

      <div>
  <p className="font-semibold mb-1">Participants</p>
  <div className="flex flex-wrap gap-2">
    {members.map(m => (
      <label key={m} className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded">
        <input
          type="checkbox"
          checked={participants.includes(m)}
          onChange={() => toggle(m)}
        />
        {m}
      </label>
    ))}
  </div>
</div>

      <button className="w-full bg-black hover:bg-gray-800 text-white py-2 mt-3 rounded-lg transition">
        Add Expense
      </button>
    </form>
  );
}