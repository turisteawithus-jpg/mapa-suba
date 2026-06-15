import { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Admin } from '@/pages/Admin';
import { Landing } from '@/pages/Landing';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';
  const [showLanding, setShowLanding] = useState(!isAdminRoute);

  useEffect(() => {
    if (isAdminRoute) {
      setShowLanding(false);
    }
  }, [isAdminRoute]);

  const handleEnter = useCallback(() => {
    setShowLanding(false);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f1f5f9' }}>
      {showLanding && !isAdminRoute && <Landing onEnter={handleEnter} />}
      {(!showLanding || isAdminRoute) && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
