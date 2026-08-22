import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./screens/Dashboard";
import CitySearch from "./screens/CitySearch";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  const renderScreen = () => {
    switch (activePage) {
      case "cities":
        return <CitySearch onNavigate={handleNavigate} />;

      case "dashboard":
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07101f]">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      <main className="ml-64">
        {renderScreen()}
      </main>
    </div>
  );
}