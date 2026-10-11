import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SmoothScrollProvider } from './components/animation/SmoothScrollProvider';
import { LandingPage } from './pages/LandingPage';
import { HeroVariantA } from './pages/HeroVariantA';
import { HeroVariantB } from './pages/HeroVariantB';

function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/hero-a" element={<HeroVariantA />} />
          <Route path="/hero-b" element={<HeroVariantB />} />
          {/* Fallback ke LandingPage untuk SPA */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}

export default App;
