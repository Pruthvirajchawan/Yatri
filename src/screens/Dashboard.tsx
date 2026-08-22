interface DashboardProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({
  onNavigate,
}: DashboardProps) {
  return (
    <div className="min-h-screen bg-[#07101f] p-8 text-white">
      <div className="mb-8">
        <p className="mb-2 text-sm text-orange-400">
          Welcome back 👋
        </p>

        <h1 className="text-4xl font-bold">
          Plan your next journey
        </h1>

        <p className="mt-2 text-slate-400">
          Discover destinations, build itineraries and manage
          your travel budget.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <button
          onClick={() => onNavigate("create")}
          className="rounded-2xl border border-slate-800 bg-[#111b2d] p-6 text-left transition hover:-translate-y-1 hover:border-orange-500"
        >
          <div className="mb-4 text-3xl">✈️</div>

          <h2 className="text-xl font-semibold">
            Plan New Trip
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Create a personalized multi-city itinerary.
          </p>
        </button>

        <button
          onClick={() => onNavigate("cities")}
          className="rounded-2xl border border-slate-800 bg-[#111b2d] p-6 text-left transition hover:-translate-y-1 hover:border-orange-500"
        >
          <div className="mb-4 text-3xl">🔎</div>

          <h2 className="text-xl font-semibold">
            Explore Cities
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Search destinations and discover places to visit.
          </p>
        </button>

        <button
          onClick={() => onNavigate("budget")}
          className="rounded-2xl border border-slate-800 bg-[#111b2d] p-6 text-left transition hover:-translate-y-1 hover:border-orange-500"
        >
          <div className="mb-4 text-3xl">💰</div>

          <h2 className="text-xl font-semibold">
            Manage Budget
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Track expenses and stay within your travel budget.
          </p>
        </button>
      </div>
    </div>
  );
}