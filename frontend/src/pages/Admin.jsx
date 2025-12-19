import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    api
      .get('/api/dashboard')
      .then((res) => setStats(res.data))
      .catch(() => setStats(null));
    api
      .get('/api/workouts')
      .then((res) => setWorkouts(res.data || []))
      .catch(() => setWorkouts([]));
  }, []);

  return (
    <div className="space-y-5 text-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4e0ce] bg-[#f0f5ed] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7B9669]">
            <span>🛠</span> Admin Panel
          </div>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">Admin Overview</h2>
          <p className="text-[11px] text-slate-600 max-w-xl">
            Lightweight view of demo data: workouts, usage, and recent activity. In a real app this would be
            secured and show multiple users.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <AdminStat label="Total Workouts" value={stats?.totalWorkouts ?? 0} />
        <AdminStat label="Minutes Logged" value={stats?.totalDuration ?? 0} />
        <AdminStat label="Distinct Types" value={Object.keys(stats?.byType || {}).length} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 max-h-80 overflow-y-auto shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-sm">
            <span>📋</span> Recent Workouts (Demo user)
          </h3>
          <span className="text-[11px] text-slate-600">{workouts.length} entries</span>
        </div>
        {workouts.length === 0 ? (
          <div className="text-[11px] text-slate-600 py-4">No workouts yet. Generate a plan and log one to see data here.</div>
        ) : (
          <table className="w-full text-[11px] text-slate-800 border-separate border-spacing-y-1">
            <thead className="text-slate-500">
              <tr>
                <th className="text-left font-medium">Date</th>
                <th className="text-left font-medium">Type</th>
                <th className="text-left font-medium">Intensity</th>
                <th className="text-left font-medium">Duration</th>
              </tr>
            </thead>
            <tbody>
              {workouts.slice(0, 20).map((w) => {
                const d = new Date(w.date || w.createdAt || Date.now());
                return (
                  <tr key={w._id} className="align-middle">
                    <td className="py-1 text-slate-700">
                      {d.toLocaleDateString()} {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-1 capitalize">{w.type || '-'}</td>
                    <td className="py-1 capitalize">{w.intensity || '-'}</td>
                    <td className="py-1">{w.duration || 0} min</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function AdminStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-[11px] text-slate-500 mb-1">{label}</div>
      <div className="text-xl font-bold text-slate-900">{value}</div>
    </div>
  );
}
