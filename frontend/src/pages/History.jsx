import React, { useEffect, useState } from 'react';
import api from '../api';

export default function History() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Reset and fetch fresh workouts whenever component mounts
    setWorkouts([]);
    api.get('/api/workouts').then((res) => setWorkouts(res.data || [])).catch(console.error);
  }, []);

  return (
    <div className="space-y-6 text-sm">
      <div className="text-center space-y-2">
        <button className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full bg-[#f0f5ed] px-4 py-1 text-xs font-medium text-[#7B9669] border border-[#d4e0ce]">
          <span>📚</span>
          Workout History
        </button>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">History</h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Review your previous workouts and keep an eye on your consistency.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-4 max-h-96 overflow-y-auto space-y-3">
        {workouts.length === 0 && (
          <div className="text-slate-600 text-sm text-center py-6">
            No workouts logged yet. Start by logging a session from the generator.
          </div>
        )}
        {workouts.map((w) => {
          const date = new Date(w.date || w.createdAt || Date.now());
          const calories = Math.round((w.duration || 0) * (w.intensity === 'high' ? 8 : w.intensity === 'medium' ? 6 : 4));
          return (
            <div
              key={w._id}
              className="flex items-center justify-between rounded-xl bg-[#f0f5ed] px-4 py-3">
              <div>
                <div className="font-semibold text-slate-900 flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e8f0e3] text-[#7B9669] text-xs font-bold border border-[#d4e0ce]">
                    {w.type?.[0]?.toUpperCase() || 'W'}
                  </span>
                  <span className="capitalize">{w.type || 'Workout'}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {date.toLocaleDateString()} • {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className="flex items-center gap-6 text-[11px] text-slate-700">
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-slate-900">{w.duration || 0} min</span>
                  <span className="uppercase tracking-wide text-emerald-600">Duration</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-slate-900">{w.intensity || 'medium'}</span>
                  <span className="uppercase tracking-wide text-emerald-600">Intensity</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-slate-900">{calories}</span>
                  <span className="uppercase tracking-wide text-emerald-600">Calories</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
