import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Admin } from '@/pages/Admin';
import { Landing } from '@/pages/Landing';
import { LandingExplicativa } from '@/pages/LandingExplicativa';

function App() {
  const [landingStep, setLandingStep] = useState<'landing' | 'explicativa' | 'mapa'>('landing');

  const handleLandingClick = useCallback(() => {
    setLandingStep('explicativa');
  }, []);

  const handleEnterMap = useCallback(() => {
    setLandingStep('mapa');
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f1f5f9' }}>
      {/* Landing flow overlay */}
      {landingStep === 'landing' && (
        <Landing onEnter={handleLandingClick} />
      )}
      {landingStep === 'explicativa' && (
        <LandingExplicativa onEnterMap={handleEnterMap} />
      )}

      {/* Main routes - always mounted so they're ready */}
      <div style={{ display: landingStep === 'mapa' ? 'block' : 'none' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
