import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { DestinationDetail } from './pages/DestinationDetail';
import { Planner } from './pages/Planner';
import { MyItinerary } from './pages/MyItinerary';
import { Favorites } from './pages/Favorites';
import { Account } from './pages/Account';
import { NotFound } from './pages/NotFound';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="explorar" element={<Explore />} />
            <Route path="destino/:id" element={<DestinationDetail />} />
            <Route path="planificador" element={<Planner />} />
            <Route path="itinerario" element={<MyItinerary />} />
            <Route path="favoritos" element={<Favorites />} />
            <Route path="cuenta" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  </StrictMode>,
);
