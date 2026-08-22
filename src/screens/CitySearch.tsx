import { Search, MapPin, Plus } from "lucide-react";
import { useMemo, useState } from "react";

interface City {
  id: number;
  name: string;
  state: string;
  description: string;
  image: string;
}

const indianCities: City[] = [
  {
    id: 1,
    name: "Ahmedabad",
    state: "Gujarat",
    description: "Historic city known for heritage, food and culture.",
    image:
      "https://images.unsplash.com/photo-1602643163983-ed0babc39797?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Udaipur",
    state: "Rajasthan",
    description: "The city of lakes, palaces and royal architecture.",
    image:
      "https://images.unsplash.com/photo-1602643163983-ed0babc39797?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Jaipur",
    state: "Rajasthan",
    description: "The Pink City famous for forts and palaces.",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Jodhpur",
    state: "Rajasthan",
    description: "The Blue City dominated by the magnificent Mehrangarh Fort.",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Varanasi",
    state: "Uttar Pradesh",
    description: "One of India's oldest cities on the banks of the Ganges.",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Kochi",
    state: "Kerala",
    description: "A coastal destination blending history and modern culture.",
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
  },
];

interface CitySearchProps {
  onNavigate: (page: string) => void;
}

export default function CitySearch({
  onNavigate,
}: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");

  const states = [
    "All",
    ...Array.from(new Set(indianCities.map((city) => city.state))),
  ];

  const filteredCities = useMemo(() => {
    return indianCities.filter((city) => {
      const matchesSearch =
        city.name.toLowerCase().includes(query.toLowerCase()) ||
        city.state.toLowerCase().includes(query.toLowerCase());

      const matchesState =
        selectedState === "All" ||
        city.state === selectedState;

      return matchesSearch && matchesState;
    });
  }, [query, selectedState]);

  return (
    <div className="min-h-screen bg-[#07101f] p-8 text-white">
      <div className="mb-8">
        <button
          onClick={() => onNavigate("dashboard")}
          className="mb-5 text-sm text-slate-400 hover:text-white"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold">
          Explore Indian Cities
        </h1>

        <p className="mt-2 text-slate-400">
          Find your next destination for your journey.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cities or states..."
            className="w-full rounded-xl border border-slate-700 bg-[#111b2d] py-4 pl-12 pr-4 text-white outline-none focus:border-orange-500"
          />
        </div>

        <select
          value={selectedState}
          onChange={(event) => setSelectedState(event.target.value)}
          className="rounded-xl border border-slate-700 bg-[#111b2d] px-5 text-white outline-none focus:border-orange-500"
        >
          {states.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </select>
      </div>

      {filteredCities.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-[#111b2d] p-12 text-center">
          <p className="text-slate-400">
            No destinations found.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111b2d] transition hover:-translate-y-1 hover:border-orange-500"
            >
              <img
                src={city.image}
                alt={city.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <MapPin
                    size={17}
                    className="text-orange-400"
                  />

                  <span className="text-sm text-slate-400">
                    {city.state}, India
                  </span>
                </div>

                <h2 className="text-2xl font-semibold">
                  {city.name}
                </h2>

                <p className="mt-2 min-h-12 text-sm text-slate-400">
                  {city.description}
                </p>

                <button
                  onClick={() => onNavigate("create")}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-black transition hover:bg-orange-400"
                >
                  <Plus size={18} />
                  Add to Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}