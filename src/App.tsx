import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SmoothScrollProvider } from './components/animation/SmoothScrollProvider';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Fallback ke LandingPage untuk SPA */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}

export default App;
