import React, { useState } from 'react';
import api from '../api';

const EXERCISES = {
  strength: ['Squats', 'Deadlifts', 'Bench Press', 'Overhead Press', 'Rows'],
  cardio: ['Running', 'Cycling', 'Rowing Machine', 'Jump Rope', 'Elliptical'],
  hiit: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'High Knees', 'Plank Jacks'],
  flex: ['Hamstring Stretch', 'Hip Flexor Stretch', 'Cat-Cow', "Child's Pose", 'Shoulder Mobility'],
};

const types = [
  { id: 'strength', label: 'Strength' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'hiit', label: 'HIIT' },
  { id: 'flex', label: 'Flexibility' },
];

const intensities = [
  { id: 'low', label: 'Beginner', desc: 'Light effort' },
  { id: 'medium', label: 'Intermediate', desc: 'Moderate effort' },
  { id: 'high', label: 'Advanced', desc: 'High effort' },
];

const durations = [15, 30, 45, 60];

const goals = [
  'Lose Weight',
  'Build Muscle',
  'Endurance',
  'Flexibility',
  'General Fitness',
];

export default function Generator() {
  const [type, setType] = useState('strength');
  const [intensity, setIntensity] = useState('medium');
  const [duration, setDuration] = useState(30);
  const [goal, setGoal] = useState('General Fitness');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState([]);
  const [error, setError] = useState('');
  const [logLoading, setLogLoading] = useState(false);
  const [logMessage, setLogMessage] = useState('');

  const mediaByType = {
    strength: {
      imageTitle: 'Strength Training',
      imageAlt: 'Strength training with weights',
      videoTitle: 'Strength Workout Preview',
      posterImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=60',
      videoDesc: 'Heavy compound lifts with proper form and technique.',
    },
    cardio: {
      imageTitle: 'Cardio & Endurance',
      imageAlt: 'Cardio training session',
      videoTitle: 'Cardio Workout Preview',
      posterImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=60',
      videoDesc: 'Steady-state and interval cardio for improved fitness.',
    },
    hiit: {
      imageTitle: 'HIIT Intense Intervals',
      imageAlt: 'HIIT training session',
      videoTitle: 'HIIT Workout Preview',
      posterImage: 'https://images.unsplash.com/photo-1552258987-868a1e41caf3?auto=format&fit=crop&w=800&q=60',
      videoDesc: 'High-intensity intervals for max calorie burn and fitness gains.',
    },
    flex: {
      imageTitle: 'Flexibility & Mobility',
      imageAlt: 'Stretching and flexibility',
      videoTitle: 'Flexibility Workout Preview',
      posterImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=60',
      videoDesc: 'Gentle stretches and mobility work for improved flexibility.',
    },
  };

  const activeMedia = mediaByType[type] || mediaByType.strength;

  const buildLocalPlan = ({ mappedGoal, intensity: lvl, duration: mins, typesChoice }) => {
    // HIIT and Flexibility are single-session workouts, Strength and Cardio are 4-day plans
    const daysPerWeek = (type === 'hiit' || type === 'flex') ? 1 : 4;
    const allowedTypes = typesChoice.length ? typesChoice : ['strength', 'cardio'];
    const localPlan = [];

    for (let day = 1; day <= daysPerWeek; day++) {
      const typeId = allowedTypes[day % allowedTypes.length];
      const pool = EXERCISES[typeId] || [];
      const perExerciseMinutes = pool.length ? Math.round(mins / pool.length) : Math.max(5, Math.round(mins / 3));
      const exercises = pool.slice(0, 3).map((name, idx) => ({
        name,
        sets: typeId === 'strength' ? 3 + (mappedGoal === 'strength' ? 1 : 0) : undefined,
        reps: typeId === 'strength' ? (lvl === 'high' ? 8 : 12) : undefined,
        minutes: typeId === 'cardio' || typeId === 'hiit' || typeId === 'flex' ? perExerciseMinutes : undefined,
        order: idx + 1,
      }));

      localPlan.push({
        day,
        type: typeId,
        goal: mappedGoal,
        intensity: lvl,
        duration: mins,
        exercises,
      });
    }

    return localPlan;
  };

  const submit = async () => {
    setLoading(true);
    setError('');
    setLogMessage('');
    const mappedGoal = goal.toLowerCase().includes('muscle')
      ? 'strength'
      : goal.toLowerCase().includes('endurance')
      ? 'endurance'
      : 'balanced';
    const typesChoice = [type];
    const daysPerWeek = (type === 'hiit' || type === 'flex') ? 1 : 4;

    try {
      const res = await api.post('/api/plans/generate', {
        goal: mappedGoal,
        daysPerWeek: daysPerWeek,
        intensity,
        duration,
        types: typesChoice,
      });
      if (res.data && Array.isArray(res.data.plan) && res.data.plan.length) {
        setPlan(res.data.plan);
      } else {
        setPlan(buildLocalPlan({ mappedGoal, intensity, duration, typesChoice }));
      }
    } catch (err) {
      console.error(err);
      setError('Backend not reachable, showing an offline plan.');
      setPlan(buildLocalPlan({ mappedGoal, intensity, duration, typesChoice }));
    }
    setLoading(false);
  };

  const logTodayWorkout = async () => {
    setLogLoading(true);
    setLogMessage('');
    try {
      await api.post('/api/workouts', {
        type: type === 'hiit' || type === 'flex' ? 'mixed' : type,
        intensity,
        duration,
        notes: `Logged from generator - goal: ${goal}`,
      });
      setLogMessage('Workout logged! Check Progress and History tabs.');
    } catch (err) {
      console.error(err);
      setLogMessage('Could not log workout (is backend running?).');
    }
    setLogLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Workout Generator</h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f5ed] px-3 py-1 text-xs font-medium text-[#7B9669] border border-[#d4e0ce]">
                <span className="text-[#7B9669]">⚡</span>
                AI-Powered
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-xl">
              Configure your workout parameters below and generate a personalized routine
            </p>
          </div>
        </div>
        {/* Accent banner */}
        <div className="rounded-xl bg-gradient-to-r from-[#f0f5ed] to-[#f0f5ed] text-[#7B9669] px-4 py-3 text-xs">
          Pro tip: Pick your type first — the session preview and tips adapt instantly.
        </div>
      </div>

      {/* Main Configuration Grid */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Left Column - Workout Type */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="text-[#7B9669]">⚙️</span> 
              Workout Type
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {types.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`group rounded-xl px-4 py-5 text-center transition-all ${
                    type === t.id
                      ? 'bg-[#f0f5ed] ring-1 ring-[#7B9669]'
                      : 'bg-white hover:ring-1 hover:ring-[#8aa678]'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`text-xl ${type === t.id ? 'text-[#7B9669]' : 'text-slate-400 group-hover:text-[#7B9669]'}`}>
                      {t.id === 'strength' && '🏋️'}
                      {t.id === 'cardio' && '🚴'}
                      {t.id === 'hiit' && '⚡'}
                      {t.id === 'flex' && '🧘'}
                    </div>
                    <div className={`text-sm font-semibold ${type === t.id ? 'text-[#7B9669]' : 'text-slate-700 group-hover:text-[#7B9669]'}`}>
                      {t.label}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Intensity */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="text-[#7B9669]">📶</span> 
              Intensity Level
            </h3>
            <div className="space-y-2">
              {intensities.map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setIntensity(lvl.id)}
                  className={`w-full rounded-lg border px-4 py-3 text-left transition-all ${
                    intensity === lvl.id
                      ? 'border-[#7B9669] bg-[#f0f5ed] shadow-sm'
                      : 'border-slate-200 bg-white hover:border-[#7B9669]'
                  }`}
                >
                  <div className={`text-sm font-medium ${intensity === lvl.id ? 'text-[#7B9669]' : 'text-slate-800'}`}>
                    {lvl.label}
                  </div>
                  <div className="text-xs text-slate-500">{lvl.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Duration & Goals */}
        <div className="lg:col-span-3 space-y-4">
          {/* Session Preview */}
          <div className="rounded-xl bg-[#f0f5ed] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#7B9669] flex items-center gap-2">
                <span>🎬</span> Session Preview
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white text-[#7B9669] border border-[#BAC8B1]">
                {type.toUpperCase()}
              </span>
            </div>
            <div className="space-y-2">
              <div className="relative w-full rounded-lg bg-gradient-to-br from-slate-800 to-[#7B9669] overflow-hidden group cursor-pointer">
                <img 
                  src={activeMedia.posterImage} 
                  alt={activeMedia.videoTitle}
                  className="w-full aspect-[16/9] object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-[#7B9669] flex items-center justify-center group-hover:bg-[#8aa678] transition-colors shadow-lg">
                      <span className="text-white text-3xl ml-1">▶</span>
                    </div>
                    <span className="text-white text-xs font-semibold">{activeMedia.videoTitle}</span>
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-[#7B9669]">
                <span className="font-semibold">{activeMedia.videoTitle}</span> — {activeMedia.videoDesc}
              </div>
            </div>
          </div>
          {/* Duration */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="text-[#7B9669]">⏱</span> 
              Session Duration
            </h3>
            <div className="grid grid-cols-4 gap-2.5">
              {durations.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`rounded-lg px-3 py-3 text-sm font-semibold border transition-all ${
                    duration === d
                      ? 'bg-[#7B9669] text-white border-[#7B9669] shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-[#7B9669] hover:text-[#7B9669]'
                  }`}
                >
                  {d}<span className="text-xs ml-0.5">min</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fitness Goal */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="text-[#7B9669]">🎯</span> 
              Fitness Goal
            </h3>
            <div className="flex flex-wrap gap-2">
              {goals.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGoal(g)}
                  className={`rounded-lg px-4 py-2.5 text-xs font-semibold border transition-all ${
                    goal === g
                      ? 'bg-[#7B9669] text-white border-[#7B9669] shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-[#7B9669] hover:text-[#7B9669]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={submit}
              disabled={loading}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#7B9669] to-[#8aa678] hover:from-[#8aa678] hover:to-[#7B9669] text-white font-bold py-4 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Generating...' : '⚡ Generate Workout'}</span>
            </button>
            <button
              type="button"
              onClick={logTodayWorkout}
              disabled={logLoading}
              className="rounded-xl bg-white text-sm font-semibold text-[#7B9669] px-6 py-4 ring-1 ring-[#BAC8B1] hover:bg-[#f0f5ed] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {logLoading ? 'Logging...' : '✅ Log Workout'}
            </button>
          </div>

          {/* Quick Tips */}
          <div className="grid md:grid-cols-3 gap-3">
            <div className="rounded-lg bg-[#f0f5ed] px-4 py-3 text-xs text-[#7B9669] flex items-center gap-2">
              <span>💧</span> Hydrate before and after.
            </div>
            <div className="rounded-lg bg-[#f0f5ed] px-4 py-3 text-xs text-[#7B9669] flex items-center gap-2">
              <span>🔥</span> Warm up 5–10 minutes.
            </div>
            <div className="rounded-lg bg-[#f0f5ed] px-4 py-3 text-xs text-[#7B9669] flex items-center gap-2">
              <span>🎯</span> Focus on clean form.
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
              {error}
            </div>
          )}
          {logMessage && (
            <div className="rounded-lg border border-[#BAC8B1] bg-[#f0f5ed] px-4 py-2.5 text-xs text-[#7B9669]">
              {logMessage}
            </div>
          )}
        </div>
      </div>

      {/* Generated Plan */}
      {plan.length > 0 && (
        <div className="mt-6 rounded-xl bg-white">
          <div className="px-5 py-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>📋</span>
              Generated Routine
            </h3>
          </div>
          <div className="px-5 pb-5">
            <div className="grid md:grid-cols-2 gap-3">
              {plan.map((day) => (
                <div key={day.day} className="rounded-lg border border-slate-200 bg-white p-4 hover:border-[#7B9669] transition-colors">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-2"><span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f0f5ed] text-[#7B9669] text-[11px]">{day.day}</span> Day</span>
                    <span className="text-xs font-semibold capitalize px-2.5 py-1 rounded-full bg-[#f0f5ed] text-[#7B9669] border border-[#BAC8B1]">
                      {day.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mb-3">
                    {day.intensity} • {day.duration} min • {day.goal}
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-800">
                    {day.exercises.map((ex) => (
                      <li key={ex.order} className="flex items-start gap-2">
                        <span className="text-[#7B9669] mt-0.5">•</span>
                        <span>
                          {ex.name}
                          {ex.sets && ex.reps && (
                            <span className="text-slate-500 ml-2">({ex.sets} × {ex.reps})</span>
                          )}
                          {ex.minutes && (
                            <span className="text-slate-500 ml-2">({ex.minutes} min)</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
