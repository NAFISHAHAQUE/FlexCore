import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/api/dashboard').then(res => setStats(res.data)).catch(console.error);
  }, []);

  if (!stats) {
    return (
      <div className="rounded-2xl border border-red-800/60 bg-black/70 p-6 text-sm text-gray-200">
        Loading dashboard...
      </div>
    );
  }

  const byTypeEntries = Object.entries(stats.byType || {});

  const statCards = [
    {
      icon: '💪',
      label: 'Total Workouts',
      value: stats.totalWorkouts,
      color: 'from-[#e8f0e3] to-[#BAC8B1]',
      borderColor: 'border-[#d4e0ce]',
      textColor: 'text-[#7B9669]',
      lightBg: 'bg-[#f0f5ed]',
    },
    {
      icon: '⏱️',
      label: 'Total Minutes',
      value: stats.totalDuration,
      color: 'from-[#d9e5d1] to-[#BAC8B1]',
      borderColor: 'border-[#c5d6bd]',
      textColor: 'text-[#6b8659]',
      lightBg: 'bg-[#e8f0e3]',
    },
    {
      icon: '🎯',
      label: 'Types Logged',
      value: byTypeEntries.length,
      color: 'from-[#f0f5ed] to-[#d4e0ce]',
      borderColor: 'border-[#BAC8B1]',
      textColor: 'text-[#7B9669]',
      lightBg: 'bg-[#f0f5ed]',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h2>
        <p className="text-slate-500 text-sm">Your fitness overview at a glance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className={`
              bg-gradient-to-br ${stat.color}
              border ${stat.borderColor}
              rounded-xl p-6
              hover:shadow-lg transition-all duration-200
              hover:-translate-y-1 cursor-pointer
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-slate-600 text-sm font-medium mb-2">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* By Type & Recent Workouts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* By Type Section */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Workouts by Type</h3>
          {byTypeEntries.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No workouts logged yet. Start your fitness journey! 🏋️</p>
          ) : (
            <ul className="space-y-2">
              {byTypeEntries.map(([type, count]) => (
                <li
                  key={type}
                  className="flex items-center justify-between rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 px-4 py-3 transition-all border border-slate-150"
                >
                  <div>
                    <span className="capitalize font-medium text-slate-900">{type}</span>
                  </div>
                  <span className="bg-[#e8f0e3] text-[#7B9669] font-semibold text-sm px-3 py-1 rounded-full">
                    {count} {count === 1 ? 'session' : 'sessions'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Workouts Section */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
          {stats.recent && stats.recent.length ? (
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {stats.recent.map((w, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 px-4 py-3 transition-all border border-slate-150"
                >
                  <div className="text-xl">
                    {w.intensity === 'high' ? '🔥' : w.intensity === 'medium' ? '💪' : '🚶'}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900 capitalize">{w.type}</div>
                    <div className="text-xs text-slate-500">
                      {new Date(w.date).toLocaleDateString()} • {w.duration}m
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-center py-8">No workouts logged yet. Start today! 🚀</p>
          )}
        </div>
      </div>
    </div>
  );
}
