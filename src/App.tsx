import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';

// Pages
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { Planner } from './pages/Planner';
import { ItineraryView } from './pages/ItineraryView';
import { TripIntelligence } from './pages/TripIntelligence';
import { TradeOffEngine } from './pages/TradeOffEngine';
import { GroupEquityView } from './pages/GroupEquityView';
import { BudgetIntelligence } from './pages/BudgetIntelligence';
import { MyTrips } from './pages/MyTrips';
import { AiAssistant } from './pages/AiAssistant';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';

// Scroll to top on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <TripProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen selection:bg-[#168BFF] selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Home Landing */}
              <Route path="/" element={<Home />} />

              {/* Destination Discovery */}
              <Route path="/discover" element={<Discover />} />

              {/* Intelligent Planner */}
              <Route path="/plan" element={<Planner />} />

              {/* Active Trip & Intelligence Routes */}
              <Route path="/trip/:id" element={<ItineraryView />} />
              <Route path="/trip/:id/intelligence" element={<TripIntelligence />} />
              <Route path="/trip/:id/tradeoffs" element={<TradeOffEngine />} />
              <Route path="/trip/:id/group" element={<GroupEquityView />} />
              <Route path="/trip/:id/budget" element={<BudgetIntelligence />} />

              {/* Portfolio & Additional Features */}
              <Route path="/my-trips" element={<MyTrips />} />
              <Route path="/assistant" element={<AiAssistant />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />

              {/* Fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TripProvider>
  );
};

export default App;