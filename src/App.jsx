import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';

import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import Lesson from './pages/Lesson';
import PromptBuilder from './pages/PromptBuilder';
import Playground from './pages/Playground';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--c-pixel-white)' }}>
            <Navigation />
            <main style={{ flex: 1, overflowX: 'hidden', position: 'relative', paddingTop: '110px' }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/modules" element={<Modules />} />
                <Route path="/lesson/:id" element={<Lesson />} />
                <Route path="/builder" element={<PromptBuilder />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
