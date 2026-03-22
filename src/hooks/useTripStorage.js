import { useState, useEffect } from "react";

const STORAGE_KEY = "splitify_trips";
const ACTIVE_TRIP_KEY = "splitify_active_trip";

export function useTripStorage() {
  const [trips, setTrips] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load trips", e);
    }
    return [];
  });

  // Track active trip ID if one is loaded
  const [activeTripId, setActiveTripId] = useState(null);

  // Active Trip State
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [tripName, setTripName] = useState("");

  // Auto-sync trips to localStorage when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  }, [trips]);

  // Optionally load active trip from a temp localstorage key on refresh?
  // Let's keep it simple: If there's an active trip, we can store it in ACTIVE_TRIP_KEY
  useEffect(() => {
    try {
      const savedActive = localStorage.getItem(ACTIVE_TRIP_KEY);
      if (savedActive) {
        const parsed = JSON.parse(savedActive);
        setMembers(parsed.members || []);
        setExpenses(parsed.expenses || []);
        setTripName(parsed.name || "");
        setActiveTripId(parsed.id || null);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save active trip state automatically to ACTIVE_TRIP_KEY so they don't lose progress on refresh
  useEffect(() => {
    const activeData = { id: activeTripId, name: tripName, members, expenses };
    localStorage.setItem(ACTIVE_TRIP_KEY, JSON.stringify(activeData));
  }, [activeTripId, tripName, members, expenses]);

  const saveTrip = (name) => {
    const finalName = name || tripName || "Untitled Trip";
    const now = new Date().toISOString();
    
    setTripName(finalName);

    if (activeTripId) {
      // Update existing trip
      setTrips(prev => prev.map(t => 
        t.id === activeTripId 
          ? { ...t, name: finalName, members, expenses, updatedAt: now }
          : t
      ));
    } else {
      // Create new trip
      const newTripId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
      const newTrip = {
        id: newTripId,
        name: finalName,
        members,
        expenses,
        createdAt: now,
        updatedAt: now
      };
      setTrips(prev => [newTrip, ...prev]);
      setActiveTripId(newTripId);
    }
  };

  const loadTrip = (id) => {
    const trip = trips.find(t => t.id === id);
    if (trip) {
      setMembers(trip.members || []);
      setExpenses(trip.expenses || []);
      setTripName(trip.name || "");
      setActiveTripId(trip.id);
    }
  };

  const deleteTrip = (id) => {
    setTrips(prev => prev.filter(t => t.id !== id));
    if (activeTripId === id) {
      resetTrip();
    }
  };

  const resetTrip = () => {
    setMembers([]);
    setExpenses([]);
    setTripName("");
    setActiveTripId(null);
    localStorage.removeItem(ACTIVE_TRIP_KEY);
  };

  const renameTrip = (id, newName) => {
    setTrips(prev => prev.map(t => 
      t.id === id ? { ...t, name: newName, updatedAt: new Date().toISOString() } : t
    ));
    if (activeTripId === id) setTripName(newName);
  };

  const duplicateTrip = (id) => {
    const tripToCopy = trips.find(t => t.id === id);
    if (!tripToCopy) return;
    
    const now = new Date().toISOString();
    const newTripId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
    const newTrip = {
      ...tripToCopy,
      id: newTripId,
      name: `${tripToCopy.name} (Copy)`,
      createdAt: now,
      updatedAt: now
    };
    setTrips(prev => [newTrip, ...prev]);
  };

  const sortedTrips = [...trips].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return {
    trips: sortedTrips,
    activeTripId,
    members,
    setMembers,
    expenses,
    setExpenses,
    tripName,
    setTripName,
    saveTrip,
    loadTrip,
    deleteTrip,
    renameTrip,
    duplicateTrip,
    resetTrip,
    hasSavedTrip: trips.length > 0
  };
}
