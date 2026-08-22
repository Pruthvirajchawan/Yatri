import { MapPin, Trash2 } from "lucide-react";

interface Destination {
  id: number;
  name: string;
  state: string;
  days: number;
}

interface ItineraryCardProps {
  destination: Destination;
  index: number;
  onRemove: (id: number) => void;
}

export default function ItineraryCard({
  destination,
  index,
  onRemove,
}: ItineraryCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-[#111b2d] p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 font-bold text-black">
        {index + 1}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <MapPin size={17} className="text-orange-400" />

          <h3 className="text-lg font-semibold text-white">
            {destination.name}
          </h3>
        </div>

        <p className="mt-1 text-sm text-slate-400">
          {destination.state} • {destination.days}{" "}
          {destination.days === 1 ? "day" : "days"}
        </p>
      </div>

      <button
        onClick={() => onRemove(destination.id)}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
        aria-label={`Remove ${destination.name}`}
      >
        <Trash2 size={19} />
      </button>
    </div>
  );
}