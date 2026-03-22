import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderOpen, Plus } from 'lucide-react';
import TripCard from './TripCard';

export default function TripsPage({ trips, onLoadTrip, onDeleteTrip, onRenameTrip, onDuplicateTrip }) {
  const navigate = useNavigate();

  const handleRenameRequest = (trip) => {
    const newName = prompt("Enter new name for the trip:", trip.name);
    if (newName && newName.trim() !== "") {
      onRenameTrip(trip.id, newName.trim());
    }
  };

  const handleOpenTrip = (id) => {
    onLoadTrip(id);
    navigate('/'); // Route back to home wizard to edit the loaded trip
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-5xl mx-auto p-4 sm:p-8 mt-2 sm:mt-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Your Trips</h1>
          <p className="text-gray-500 font-medium mt-1 sm:mt-2 text-sm sm:text-base">Saved securely on this device</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          <span>New Trip</span>
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed shadow-sm">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-300">
            <FolderOpen size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No trips saved yet</h2>
          <p className="text-gray-500 font-medium text-center max-w-[280px] mb-8">Save your splits to keep track of who owes who across multiple trips.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-colors shadow-lg shadow-gray-200 active:scale-95"
          >
            Create your first trip
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {trips.map(trip => (
            <TripCard 
              key={trip.id}
              trip={trip}
              onOpen={handleOpenTrip}
              onDelete={onDeleteTrip}
              onRename={handleRenameRequest}
              onDuplicate={onDuplicateTrip}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
