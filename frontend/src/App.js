import React, { useState } from 'react';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [route, setRoute] = useState('dashboard');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <header style={{ marginBottom: 20 }}>
        <button onClick={() => setRoute('dashboard')} style={{ marginRight: 8 }}>Dashboard</button>
        <button onClick={() => setRoute('profile')}>Profile</button>
      </header>
      <main>
        {route === 'profile' ? <Profile /> : <Dashboard />}
      </main>
    </div>
  );
}
