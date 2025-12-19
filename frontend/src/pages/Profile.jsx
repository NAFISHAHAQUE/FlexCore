import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Profile({ onNavigate }) {
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedProfile, setSavedProfile] = useState(null);

  useEffect(() => {
    // Reset form when component mounts (new user or return to page)
    setUser(null);
    setSavedProfile(null);
    setShowSuccess(false);
    
    api.get('/api/profile').then(res => setUser(res.data)).catch(console.error);
  }, []);

  if (!user) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
        Loading profile...
      </div>
    );
  }

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const save = async () => {
    setSaving(true);
    try {
      const res = await api.put('/api/profile', user);
      setUser(res.data);
      setSavedProfile(res.data);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        if (onNavigate) onNavigate();
      }, 2000);
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  return (
    <div className="relative">
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="rounded-xl border border-sky-200 bg-white px-6 py-3 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-sky-600">✓</span>
              <div>
                <div className="font-semibold text-slate-900">Profile Saved!</div>
                <div className="text-xs text-slate-600">Your changes have been saved successfully</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-slate-900">Profile Details</h2>
      <div className="grid gap-4 text-sm text-slate-800">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 text-slate-600">Full Name</label>
            <input
              name="name"
              value={user.name || ''}
              onChange={onChange}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-slate-600">Email</label>
            <input
              type="email"
              name="email"
              value={user.email || ''}
              onChange={onChange}
              placeholder="your@email.com"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-400"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block mb-1 text-slate-600">Age</label>
            <input
              type="number"
              name="age"
              value={user.age || ''}
              onChange={onChange}
              placeholder="25"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-slate-600">Gender</label>
            <select
              name="gender"
              value={user.gender || ''}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-400"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-slate-600">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={user.weight || ''}
              onChange={onChange}
              placeholder="70"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-400"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 text-slate-600">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={user.height || ''}
              onChange={onChange}
              placeholder="175"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-slate-600">Experience Level</label>
            <select
              name="experience"
              value={user.experience || ''}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-400"
            >
              <option value="">Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block mb-1 text-slate-600">Fitness Goal</label>
          <input
            name="fitnessGoal"
            value={user.fitnessGoal || ''}
            onChange={onChange}
            placeholder="e.g., Lose weight, Build muscle, Improve endurance"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-400"
          />
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
      </div>

      {/* Saved Profile Details */}
      {savedProfile && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white overflow-hidden animate-slide-in shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>✓</span>
              Saved Profile Details
            </h3>
          </div>
          <div className="p-5 grid md:grid-cols-2 gap-4 text-sm text-slate-800">
            <div className="space-y-3">
              {savedProfile.name && (
                <div>
                  <span className="text-slate-500 text-xs">Full Name:</span>
                  <p className="text-slate-900 font-medium">{savedProfile.name}</p>
                </div>
              )}
              {savedProfile.email && (
                <div>
                  <span className="text-slate-500 text-xs">Email:</span>
                  <p className="text-slate-900 font-medium">{savedProfile.email}</p>
                </div>
              )}
              {savedProfile.age && (
                <div>
                  <span className="text-slate-500 text-xs">Age:</span>
                  <p className="text-slate-900 font-medium">{savedProfile.age} years</p>
                </div>
              )}
              {savedProfile.gender && (
                <div>
                  <span className="text-zinc-400 text-xs">Gender:</span>
                  <p className="text-slate-900 font-medium capitalize">{savedProfile.gender}</p>
                </div>
              )}
            </div>
            <div className="space-y-3">
              {savedProfile.weight && (
                <div>
                  <span className="text-zinc-400 text-xs">Weight:</span>
                  <p className="text-slate-900 font-medium">{savedProfile.weight} kg</p>
                </div>
              )}
              {savedProfile.height && (
                <div>
                  <span className="text-zinc-400 text-xs">Height:</span>
                  <p className="text-slate-900 font-medium">{savedProfile.height} cm</p>
                </div>
              )}
              {savedProfile.experience && (
                <div>
                  <span className="text-zinc-400 text-xs">Experience Level:</span>
                  <p className="text-slate-900 font-medium capitalize">{savedProfile.experience}</p>
                </div>
              )}
              {savedProfile.fitnessGoal && (
                <div>
                  <span className="text-zinc-400 text-xs">Fitness Goal:</span>
                  <p className="text-slate-900 font-medium">{savedProfile.fitnessGoal}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
