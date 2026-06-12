import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Admin } from '@/pages/Admin';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f1f5f9' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
