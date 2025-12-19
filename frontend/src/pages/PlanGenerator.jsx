import React, { useState } from 'react';
import api from '../api';

const defaultForm = {
  goal: 'balanced',
  daysPerWeek: 4,
  intensity: 'medium',
  duration: 45,
  types: ['strength', 'cardio'],
};

export default function PlanGenerator() {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState([]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'daysPerWeek' || name === 'duration' ? Number(value) : value }));
  };

  const toggleType = (type) => {
    setForm((prev) => {
      const exists = prev.types.includes(type);
      return {
        ...prev,
        types: exists ? prev.types.filter((t) => t !== type) : [...prev.types, type],
      };
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/api/plans/generate', form);
      setPlan(res.data.plan || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-red-800/60 bg-black/70 p-6 shadow-lg shadow-red-900/30 text-sm">
      <h2 className="text-lg font-semibold mb-4 text-red-300">Generate Workout Plan</h2>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-gray-300">Goal</label>
            <select
              name="goal"
              value={form.goal}
              onChange={onChange}
              className="w-full rounded-lg border border-red-700 bg-zinc-950/60 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="balanced">Balanced</option>
              <option value="strength">Strength Focus</option>
              <option value="endurance">Endurance/Cardio</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-gray-300">Days / week</label>
              <input
                type="number"
                name="daysPerWeek"
                min={1}
                max={7}
                value={form.daysPerWeek}
                onChange={onChange}
                className="w-full rounded-lg border border-red-700 bg-zinc-950/60 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-300">Minutes / session</label>
              <input
                type="number"
                name="duration"
                min={15}
                max={120}
                value={form.duration}
                onChange={onChange}
                className="w-full rounded-lg border border-red-700 bg-zinc-950/60 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-gray-300">Intensity</label>
            <div className="flex gap-2">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => setForm((prev) => ({ ...prev, intensity: level }))}
                  className={`px-3 py-2 rounded-full text-xs font-medium border transition-all capitalize $ {
                    form.intensity === level
                      ? 'bg-red-600 border-red-400 text-white'
                      : 'bg-zinc-950 border-red-800 text-gray-200 hover:bg-red-800/40'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-300">Types</label>
            <div className="flex gap-2">
              {['strength', 'cardio'].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`px-3 py-2 rounded-full text-xs font-medium border transition-all capitalize $ {
                    form.types.includes(type)
                      ? 'bg-red-600 border-red-400 text-white'
                      : 'bg-zinc-950 border-red-800 text-gray-200 hover:bg-red-800/40'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-500 text-sm font-semibold text-white shadow-md shadow-red-800/50 disabled:opacity-60"
          >
            {loading ? 'Generating...' : 'Generate Plan'}
          </button>
        </div>
      </form>

      {plan.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-semibold text-red-300 mb-1">Your Weekly Plan</h3>
          <div className="grid md:grid-cols-2 gap-3 text-xs">
            {plan.map((day) => (
              <div
                key={day.day}
                className="rounded-xl border border-red-900/70 bg-zinc-950/80 p-3 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-100">Day {day.day}</span>
                  <span className="capitalize text-red-400">{day.type}</span>
                </div>
                <div className="text-[11px] text-gray-300 mb-1">
                  {day.intensity} • {day.duration} min • goal: {day.goal}
                </div>
                <ul className="list-disc list-inside text-[11px] text-gray-200">
                  {day.exercises.map((ex) => (
                    <li key={ex.order}>
                      {ex.name}{' '}
                      {ex.sets && ex.reps && (
                        <span className="text-gray-400">- {ex.sets} x {ex.reps}</span>
                      )}
                      {ex.minutes && (
                        <span className="text-gray-400"> - {ex.minutes} min</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
