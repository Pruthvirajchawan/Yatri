import {
  Map,
  Plus,
  Search,
  Target,
  Wallet,
  CalendarDays,
  User,
  BarChart3,
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Map },
  { id: "builder", label: "Itinerary Builder", icon: Map },
  { id: "trips", label: "My Trips", icon: Map },
  { id: "create", label: "Plan New Trip", icon: Plus },
  { id: "cities", label: "City Search", icon: Search },
  { id: "activities", label: "Activities", icon: Target },
  { id: "budget", label: "Budget", icon: Wallet },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "profile", label: "Profile", icon: User },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

export default function Sidebar({
  activePage,
  onNavigate,
}: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-800 bg-[#07101f] p-5">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-xl font-bold text-black">
          G
        </div>

        <div>
          <h1 className="text-xl font-bold text-white">
            Yatri
          </h1>
          <p className="text-xs text-slate-500">
            Travel Planner
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                active
                  ? "bg-blue-500/20 text-orange-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}