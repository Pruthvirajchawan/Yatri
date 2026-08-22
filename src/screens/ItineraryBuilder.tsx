import { useMemo, useState } from "react";
import { Plus, Save } from "lucide-react";
import ItineraryCard from "../components/ItineraryCard";

interface Destination {
  id: number;
  name: string;
  state: string;
  days: number;
}

interface ItineraryBuilderProps {
  onNavigate: (page: string) => void;
}

const availableCities = [
  {
    id: 1,
    name: "Ahmedabad",
    state: "Gujarat",
  },
  {
    id: 2,
    name: "Udaipur",
    state: "Rajasthan",
  },
  {
    id: 3,
    name: "Jodhpur",
    state: "Rajasthan",
  },
  {
    id: 4,
    name: "Jaipur",
    state: "Rajasthan",
  },
  {
    id: 5,
    name: "Agra",
    state: "Uttar Pradesh",
  },
];

export default function ItineraryBuilder({
  onNavigate,
}: ItineraryBuilderProps) {
  const [tripName, setTripName] = useState("My India Adventure");
  const [startDate, setStartDate] = useState("2026-09-10");

  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: 1,
      name: "Ahmedabad",
      state: "Gujarat",
      days: 1,
    },
    {
      id: 2,
      name: "Udaipur",
      state: "Rajasthan",
      days: 2,
    },
  ]);

  const [selectedCity, setSelectedCity] = useState("");

  const totalDays = useMemo(
    () =>
      destinations.reduce(
        (total, destination) => total + destination.days,
        0
      ),
    [destinations]
  );

  const estimatedBudget = useMemo(
    () => totalDays * 3500,
    [totalDays]
  );

  const addDestination = () => {
    const city = availableCities.find(
      (item) => item.id === Number(selectedCity)
    );

    if (!city) return;

    if (
      destinations.some(
        (destination) => destination.id === city.id
      )
    ) {
      return;
    }

    setDestinations((current) => [
      ...current,
      {
        ...city,
        days: 1,
      },
    ]);

    setSelectedCity("");
  };

  const removeDestination = (id: number) => {
    setDestinations((current) =>
      current.filter((destination) => destination.id !== id)
    );
  };

  const saveItinerary = () => {
    console.log({
      tripName,
      startDate,
      destinations,
      totalDays,
      estimatedBudget,
    });

    alert("Itinerary saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[#07101f] p-8 text-white">
      <button
        onClick={() => onNavigate("dashboard")}
        className="mb-5 text-sm text-slate-400 hover:text-white"
      >
        ← Back to Dashboard
      </button>

      <div className="mb-8">
        <p className="mb-2 text-sm text-orange-400">
          Trip Planner
        </p>

        <h1 className="text-4xl font-bold">
          Build Your Itinerary
        </h1>

        <p className="mt-2 text-slate-400">
          Organize your destinations and plan your journey.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-[#111b2d] p-6">
            <label className="mb-2 block text-sm text-slate-400">
              Trip Name
            </label>

            <input
              value={tripName}
              onChange={(event) =>
                setTripName(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-[#07101f] px-4 py-3 text-white outline-none focus:border-orange-500"
              placeholder="Enter trip name"
            />

            <label className="mb-2 mt-5 block text-sm text-slate-400">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(event) =>
                setStartDate(event.target.value)
              }
              className="rounded-xl border border-slate-700 bg-[#07101f] px-4 py-3 text-white outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">
              Your Destinations
            </h2>

            <div className="space-y-3">
              {destinations.map((destination, index) => (
                <ItineraryCard
                  key={destination.id}
                  destination={destination}
                  index={index}
                  onRemove={removeDestination}
                />
              ))}
            </div>

            {destinations.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-500">
                No destinations added yet.
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#111b2d] p-5">
            <h2 className="mb-4 font-semibold">
              Add Destination
            </h2>

            <div className="flex gap-3">
              <select
                value={selectedCity}
                onChange={(event) =>
                  setSelectedCity(event.target.value)
                }
                className="flex-1 rounded-xl border border-slate-700 bg-[#07101f] px-4 py-3 text-white outline-none focus:border-orange-500"
              >
                <option value="">
                  Select a city
                </option>

                {availableCities.map((city) => (
                  <option
                    key={city.id}
                    value={city.id}
                  >
                    {city.name}, {city.state}
                  </option>
                ))}
              </select>

              <button
                onClick={addDestination}
                className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 font-semibold text-black transition hover:bg-orange-400"
              >
                <Plus size={18} />
                Add
              </button>
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-slate-800 bg-[#111b2d] p-6">
          <h2 className="text-xl font-semibold">
            Trip Summary
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">
                Destinations
              </span>

              <span className="font-semibold">
                {destinations.length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Total Days
              </span>

              <span className="font-semibold">
                {totalDays}
              </span>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">
                  Estimated Budget
                </span>

                <span className="text-xl font-bold text-orange-400">
                  ₹{estimatedBudget.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={saveItinerary}
            disabled={destinations.length === 0}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Save size={18} />
            Save Itinerary
          </button>
        </aside>
      </div>
    </div>
  );
}