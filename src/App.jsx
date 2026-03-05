import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import Lesson from './pages/Lesson';
import PromptBuilder from './pages/PromptBuilder';
import Playground from './pages/Playground';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Navigation />
            <main style={{ flex: 1, overflowX: 'hidden' }}>
              <Routes>
                <Route path="/dashboard"     element={<Dashboard />} />
                <Route path="/modules"       element={<Modules />} />
                <Route path="/lesson/:id"    element={<Lesson />} />
                <Route path="/builder"       element={<PromptBuilder />} />
                <Route path="/playground"    element={<Playground />} />
                <Route path="*"              element={<Navigate to="/dashboard" />} />
              </Routes>
            </main>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
