import React, { useEffect, useState } from 'react';
import api from '../api';

const initialForm = {
  type: 'strength',
  intensity: 'medium',
  duration: 45,
  notes: '',
};

export default function WorkoutLog() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => 
  {
    try {
      const res = await api.get('/api/workouts');
      setWorkouts(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'duration' ? Number(value) : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/api/workouts', form);
      setForm(initialForm);
      await fetchWorkouts();
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  return (
    <div className="rounded-2xl border border-red-800/60 bg-black/70 p-6 shadow-lg shadow-red-900/30 text-sm space-y-4">
      <h2 className="text-lg font-semibold mb-2 text-red-300">Log Today&apos;s Workout</h2>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-gray-300">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={onChange}
              className="w-full rounded-lg border border-red-700 bg-zinc-950/60 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="strength">Strength</option>
              <option value="cardio">Cardio</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Intensity</label>
            <select
              name="intensity"
              value={form.intensity}
              onChange={onChange}
              className="w-full rounded-lg border border-red-700 bg-zinc-950/60 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-gray-300">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              min={10}
              max={180}
              value={form.duration}
              onChange={onChange}
              className="w-full rounded-lg border border-red-700 bg-zinc-950/60 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Notes</label>
            <textarea
              name="notes"
              rows={3}
              value={form.notes}
              onChange={onChange}
              className="w-full rounded-lg border border-red-700 bg-zinc-950/60 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>
        </div>
        <div className="md:col-span-2 flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-500 text-sm font-semibold text-white shadow-md shadow-red-800/50 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Workout'}
          </button>
        </div>
      </form>

      <div className="border-t border-red-900/60 pt-4">
        <h3 className="text-sm font-semibold mb-2 text-red-300">Recent Logs</h3>
        <ul className="space-y-2 max-h-44 overflow-y-auto pr-1 text-xs">
          {workouts.length === 0 && (
            <li className="text-gray-400">No workouts logged yet.</li>
          )}
          {workouts.map((w) => (
            <li
              key={w._id}
              className="flex items-center justify-between rounded-lg bg-zinc-950/80 border border-red-900/60 px-3 py-2"
            >
              <div>
                <div className="text-gray-100 capitalize">
                  {w.type} • {w.intensity} • {w.duration}m
                </div>
                <div className="text-[11px] text-gray-400">
                  {new Date(w.date).toLocaleDateString()} - {w.notes || 'No notes'}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
