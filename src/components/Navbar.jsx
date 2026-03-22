import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wallet, Save, Plus, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar({ onSave, onReset, isDirty, hasExpenses }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleNewSplit = () => {
    onReset();
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-10 w-full mx-auto">
      <div 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <span className="font-semibold text-xl tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">Splitify</span>
      </div>
      
      <div className="flex items-center gap-4">
        {isHome && (
          (!isDirty && hasExpenses) ? (
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg shrink-0">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Saved</span>
            </div>
          ) : (
            <button 
              onClick={onSave}
              disabled={!hasExpenses}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors disabled:hidden shrink-0"
              title="Save Trip"
            >
              <Save size={16} />
              <span>Save Split</span>
            </button>
          )
        )}
        
        <button 
          onClick={() => navigate('/trips')}
          className="hidden sm:inline-flex px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 text-sm font-medium rounded-lg transition-colors shrink-0"
        >
          My Trips
        </button>

        <button 
          onClick={handleNewSplit}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>New Split</span>
        </button>
      </div>
    </nav>
  );
}
