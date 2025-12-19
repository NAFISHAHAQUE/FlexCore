import React, { useState } from 'react';
import Generator from './pages/Generator.jsx';
import Progress from './pages/Progress.jsx';
import History from './pages/History.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Admin from './pages/Admin.jsx';
import Feedback from './pages/Feedback.jsx';
import Home from './pages/Home.jsx';
import Library from './pages/Library.jsx';
import Chatbot from './components/Chatbot.jsx';

export default function App() {
  const [route, setRoute] = useState('home');
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const fireConfetti = () => {
    const colors = ['#7B9669', '#BAC8B1', '#d4e0ce', '#7B9669'];
    const pieces = Array.from({ length: 80 }).map((_, i) => ({
      id: i + Date.now(),
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      color: colors[i % colors.length],
    }));
    setConfettiPieces(pieces);
    setTimeout(() => setConfettiPieces([]), 1500);
  };

  const navItem = (key, label) => (
    <button
      onClick={() => setRoute(key)}
      className={
        'rounded-full px-3.5 py-2 text-[11px] font-semibold transition border ' +
        (route === key
          ? 'bg-[#7B9669] text-white border-[#7B9669]'
          : 'bg-[#f5f8f3] text-[#4a5b3f] border-[#d4e0ce] hover:border-[#7B9669] hover:text-[#7B9669]')
      }
    >
      {label}
    </button>
  );

  const handleLogin = () => {
    setLoggedIn(true);
    fireConfetti();
    setRoute('profile');
  };

  const showHeader = loggedIn || route === 'home';

  const handleSignOut = () => {
    // best-effort server-side logout; ignore errors
    import('./api').then(({ default: api }) => {
      api.post('/api/profile/logout').catch(() => {});
    });
    setLoggedIn(false);
    setRoute('login');
  };

  const isHome = route === 'home';

  return (
    <div className="app-root relative text-slate-900">
      {confettiPieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{ left: `${p.left}%`, backgroundColor: p.color, animationDelay: `${p.delay}s` }}
        />
      ))}
      <div className="flex flex-1 flex-col">
        {/* Top bar - hidden during login */}
        {showHeader && (
          <header
            className={`${isHome ? 'mb-0' : 'mb-4'} flex items-center justify-between gap-4 relative z-10 bg-white px-4 py-3`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7B9669] text-sm font-bold text-white">
                FC
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                    FlexCore
                  </h1>
                  <span className="rounded-full bg-[#BAC8B1] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#4a5b3f] border border-[#d4e0ce]">
                    Workout AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Generate smart workouts, track progress, and review your history.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <nav className="flex items-center gap-2">
              {navItem('home', 'Home')}
              {loggedIn && (
                <>
                  {navItem('generator', 'Generator')}
                  {navItem('library', 'Library')}
                  {navItem('progress', 'Progress')}
                  {navItem('history', 'History')}
                  {navItem('feedback', 'Feedback')}
                  {navItem('profile', 'Profile')}
                  {navItem('admin', 'Admin')}
                </>
              )}
              </nav>
              <button
                type="button"
                onClick={loggedIn ? handleSignOut : () => setRoute('login')}
                className="rounded-full border border-[#7B9669] bg-[#7B9669] px-3 py-2 text-[11px] font-semibold text-white hover:bg-[#8aa678] hover:border-[#8aa678] transition"
              >
                {loggedIn ? 'Sign out' : 'Login'}
              </button>
            </div>
          </header>
        )}

        {/* Content */}
        <main
          className={`flex-1 ${
            showHeader
              ? isHome
                ? 'bg-white p-0'
                : 'bg-white p-4 sm:p-5 content-bg'
              : 'flex items-center justify-center'
          } relative z-10`}
        >
          {route === 'generator' && <Generator />}
          {route === 'library' && <Library />}
          {route === 'progress' && <Progress />}
          {route === 'history' && <History />}
          {route === 'profile' && <Profile onNavigate={() => setRoute('generator')} />}
          {route === 'feedback' && <Feedback />}
          {route === 'admin' && <Admin />}
          {route === 'home' && <Home onGetStarted={() => setRoute(loggedIn ? 'generator' : 'login')} />}
          {route === 'login' && <Login onLogin={handleLogin} onBackHome={() => setRoute('home')} />}
        </main>
        <Chatbot />
      </div>
    </div>
  );
}
