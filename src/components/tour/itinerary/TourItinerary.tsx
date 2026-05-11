import { plans } from "../../../db";
import type { IItineraryItem } from "../../../types";

export default function TourItinerary() {
  const items: IItineraryItem[] =
    plans.find((plan) => plan.plans.ballenas)?.plans.ballenas.itinerary || [];

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="text-4xl font-medium text-primary">Itinerario</h2>
        <h3 className="text-xl font-normal text-primary">
          El Pacífico se vive día a día
        </h3>
      </div>

      <ol className="flex flex-col">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.id} className="flex gap-4 pb-7">
              {/* Dot + line column */}
              <div className="flex flex-col items-center">
                <div
                  className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-white ring-2 ring-primary shrink-0 mt-1 z-10"
                  aria-hidden="true"
                />
                {!isLast && (
                  <div
                    className="w-0.5 flex-1 bg-secondary mt-1"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-1">
                <p className="text-xs font-medium uppercase tracking-widest text-primary mb-1">
                  {item.day ? `Día ${item.day}` : "Salida"}
                </p>
                <h3 className="text-base font-medium text-black mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-black leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
