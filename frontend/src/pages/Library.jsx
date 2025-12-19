import React, { useMemo, useState } from 'react';

const EXERCISES = [
  { id: 1, name: 'Bicycle Crunch', muscle: 'Abdominals', equipment: 'Bodyweight', level: 'Beginner', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050159.png' },
  { id: 2, name: 'Seated Single-Arm Lat Pulldown', muscle: 'Lats', equipment: 'Cable', level: 'Intermediate', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050159.png' },
  { id: 3, name: 'Lying Leg Raise with Partner Assist', muscle: 'Abdominals', equipment: 'Bodyweight', level: 'Intermediate', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050159.png' },
  { id: 4, name: 'Bench Press', muscle: 'Chest', equipment: 'Barbell', level: 'Intermediate', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050234.png' },
  { id: 5, name: 'Goblet Squat', muscle: 'Quads', equipment: 'Dumbbell', level: 'Beginner', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050234.png' },
  { id: 6, name: 'Deadlift', muscle: 'Back', equipment: 'Barbell', level: 'Advanced', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050234.png' },
  { id: 7, name: 'Treadmill Intervals', muscle: 'Cardio', equipment: 'Treadmill', level: 'Beginner', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050325.png' },
  { id: 8, name: 'Kettlebell Swing', muscle: 'Glutes', equipment: 'Kettlebell', level: 'Intermediate', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050261.png' },
];

const muscles = ['All Muscles', 'Abdominals', 'Back', 'Chest', 'Glutes', 'Lats', 'Quads', 'Cardio'];
const equipment = ['All Equipment', 'Bodyweight', 'Dumbbell', 'Barbell', 'Cable', 'Kettlebell', 'Treadmill'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function Library() {
  const [search, setSearch] = useState('');
  const [muscle, setMuscle] = useState('All Muscles');
  const [equip, setEquip] = useState('All Equipment');
  const [level, setLevel] = useState('All Levels');

  const filtered = useMemo(() => {
    return EXERCISES.filter((ex) => {
      const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase());
      const matchMuscle = muscle === 'All Muscles' || ex.muscle === muscle;
      const matchEquip = equip === 'All Equipment' || ex.equipment === equip;
      const matchLevel = level === 'All Levels' || ex.level === level;
      return matchSearch && matchMuscle && matchEquip && matchLevel;
    });
  }, [search, muscle, equip, level]);

  return (
    <div className="space-y-6">
      <section className="bg-white text-slate-900 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-800">Exercise Library</h1>
          <p className="text-sm text-slate-500">
            Browse and filter exercises by muscle group, equipment, and difficulty level.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-500">Search</label>
            <div className="mt-1 flex items-center gap-2 border border-slate-200 bg-white px-3 py-2">
              <span className="text-slate-400">🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search exercises"
                className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">Muscle</label>
            <select
              value={muscle}
              onChange={(e) => setMuscle(e.target.value)}
              className="mt-1 w-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#7B9669] focus:outline-none">
              {muscles.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">Equipment</label>
            <select
              value={equip}
              onChange={(e) => setEquip(e.target.value)}
              className="mt-1 w-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#7B9669] focus:outline-none"
            >
              {equipment.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="mt-1 w-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#7B9669] focus:outline-none"
            >
              {levels.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-start">
          <button
            type="button"
            onClick={() => { setMuscle('All Muscles'); setEquip('All Equipment'); setLevel('All Levels'); setSearch(''); }}
            className="inline-flex items-center gap-2 rounded-full bg-[#7B9669] px-4 py-2 text-sm font-semibold text-white hover:bg-[#8aa678]">
            Reset Filters
          </button>
        </div>
      </section>

      <section className="bg-white text-slate-900 p-4">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-sm">No exercises match these filters.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((ex) => (
              <div key={ex.id} className="bg-[#f0f5ed] p-5 hover:shadow-md transition">
                <div className="flex justify-center mb-4">
                  <div className="h-32 w-32 rounded-lg bg-white border border-[#d4e0ce] flex items-center justify-center overflow-hidden">
                    <img src={ex.image} alt={ex.name} className="h-24 w-24 object-contain" />
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-sm font-bold text-slate-900">{ex.name}</h3>
                  <p className="text-xs text-[#7B9669] font-medium">{ex.muscle}</p>
                  <div className="flex flex-wrap gap-2 justify-center text-[11px] mt-3">
                    <span className="rounded-full bg-[#e8f0e3] text-[#7B9669] px-2.5 py-1">{ex.level}</span>
                    <span className="rounded-full bg-slate-200 text-slate-700 px-2.5 py-1">{ex.equipment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
