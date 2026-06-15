import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Admin } from '@/pages/Admin';
import { Landing } from '@/pages/Landing';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleEnter = useCallback(() => {
    setShowLanding(false);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f1f5f9' }}>
      {showLanding && <Landing onEnter={handleEnter} />}
      {!showLanding && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
