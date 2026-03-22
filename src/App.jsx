import { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import GroupCreation from "./components/GroupCreation";
import ExpenseManager from "./components/ExpenseManager";
import ResultsModal from "./components/ResultsModal";
import SaveTripModal from "./components/SaveTripModal";
import TripsPage from "./components/TripsPage";
import Toast from "./components/Toast";

import { useTripStorage } from "./hooks/useTripStorage";
import { calculateBalances } from "./utils/splitLogic";
import { settleBalancesDirect } from "./utils/settleUp";

export default function App() {
  const {
    trips,
    activeTripId,
    members,
    setMembers,
    expenses,
    setExpenses,
    tripName,
    saveTrip,
    resetTrip,
    loadTrip,
    deleteTrip,
    renameTrip,
    duplicateTrip
  } = useTripStorage();

  const [step, setStep] = useState(1); 
  const [showResults, setShowResults] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isDirty = useMemo(() => {
    if (!activeTripId) return true;
    const savedVer = trips.find(t => t.id === activeTripId);
    if (!savedVer) return true;
    return (
      JSON.stringify(savedVer.members) !== JSON.stringify(members) ||
      JSON.stringify(savedVer.expenses) !== JSON.stringify(expenses) ||
      savedVer.name !== tripName
    );
  }, [activeTripId, trips, members, expenses, tripName]);

  const handleContinueToExpenses = () => setStep(2);

  const handleLoadTrip = (id) => {
    loadTrip(id);
    setStep(2);
    setToastMessage("Trip loaded ✅");
  };

  const handleReset = () => {
    // We optionally remove confirm dialog here since "New Split" intuitively is an action in the UI, 
    // but to prevent accident data loss we can keep it if dirty.
    if (isDirty && (members.length > 0 || expenses.length > 0)) {
      if (!confirm("Start a new split? Unsaved progress will be lost.")) return;
    }
    resetTrip();
    setStep(1);
    setShowResults(false);
  };

  const handleSaveInit = () => {
    if (!isDirty) return;
    setShowSaveModal(true);
  };

  const handleSaveConfirm = (name) => {
    saveTrip(name);
    setShowSaveModal(false);
    setToastMessage("Trip saved successfully ✅");
  };

  const balances = showResults ? calculateBalances(expenses, members) : {};
  const transactions = showResults ? settleBalancesDirect(expenses, members) : [];

  const HomeWizard = (
    <main className="flex-1 w-full max-w-2xl mx-auto relative px-4 py-10 sm:py-14">
      {step === 1 && (
        <GroupCreation 
          members={members} 
          setMembers={setMembers} 
          onContinue={handleContinueToExpenses}
          hasSavedData={false}
        />
      )}

      {step === 2 && (
        <ExpenseManager 
          members={members}
          expenses={expenses}
          setExpenses={setExpenses}
          onSplit={() => setShowResults(true)}
          onBack={() => setStep(1)}
        />
      )}

      <AnimatePresence>
        {showResults && <ResultsModal onClose={() => setShowResults(false)} balances={balances} transactions={transactions} expenses={expenses} />}
      </AnimatePresence>

      <AnimatePresence>
        {showSaveModal && <SaveTripModal isOpen={showSaveModal} onClose={() => setShowSaveModal(false)} onSave={handleSaveConfirm} defaultName={tripName} hasExpenses={expenses.length > 0} />}
      </AnimatePresence>
    </main>
  );

  return (
    <div className="min-h-[100dvh] bg-[#fdfdfd] flex flex-col font-sans text-gray-900">
      <Toast message={toastMessage} isVisible={!!toastMessage} onClose={() => setToastMessage('')} />
      
      <Navbar 
        onSave={handleSaveInit} 
        onReset={handleReset} 
        isDirty={isDirty} 
        hasExpenses={expenses.length > 0} 
      />
      
      <Routes>
        <Route path="/" element={HomeWizard} />
        <Route 
          path="/trips" 
          element={
            <TripsPage 
              trips={trips} 
              onLoadTrip={handleLoadTrip} 
              onDeleteTrip={deleteTrip} 
              onRenameTrip={renameTrip} 
              onDuplicateTrip={(id) => { duplicateTrip(id); setToastMessage("Trip duplicated ✅"); }} 
            />
          } 
        />
      </Routes>
    </div>
  );
}